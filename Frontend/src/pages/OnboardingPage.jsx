import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  UploadIcon,
  TrashIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { mutate: onboardMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success(
        authUser?.isOnboarded
          ? "Profile updated successfully"
          : "Profile onboarded successfully",
      );

      // Update cache immediately to prevent redirection race condition
      queryClient.setQueryData(["authUser"], (oldData) => {
        if (!oldData || !oldData.user) return oldData;
        return {
          ...oldData,
          user: {
            ...oldData.user,
            ...formState,
            isOnboarded: true,
          },
        };
      });

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // Redirect to home page
      navigate("/");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardMutation(formState);
  };

  const handleProfilePic = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormState({ ...formState, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      profilePic:
        "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg",
    });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card border border-base-content/10 bg-transparent lg:bg-base-100 w-full max-w-3xl shadow-none lg:shadow-xl rounded-[2rem]">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            {authUser?.isOnboarded ? "Update Profile" : "Complete Your Profile"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Pic Container */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Image Preview */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  onClick={handleProfilePic}
                  className="btn btn-accent rounded-full"
                >
                  <UploadIcon className="size-4 mr-2" />
                  Upload Image
                </button>
                {formState.profilePic !==
                  "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-error rounded-full"
                  >
                    <TrashIcon className="size-4 mr-2" />
                    Delete Image
                  </button>
                )}
              </div>
            </div>
            {/* Full Name - field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => {
                  setFormState({ ...formState, fullName: e.target.value });
                }}
                className="input bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors"
                placeholder="Your full name"
              />
            </div>
            {/* BIO - field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea bg-base-200/50 rounded-2xl border-none focus:bg-base-200 transition-colors h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>
            {/* Languages - field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    });
                  }}
                  className="select bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learning Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    });
                  }}
                  className="select bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors"
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Location - Fields */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => {
                    setFormState({ ...formState, location: e.target.value });
                  }}
                  className="input bg-base-200/50 rounded-2xl w-full pl-10 border-none focus:bg-base-200 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>
            {/* Submit - Button */}
            <button
              className="btn btn-primary w-full rounded-2xl mt-4"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  {authUser?.isOnboarded
                    ? "Update Profile"
                    : "Complete Onboarding"}
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  {authUser?.isOnboarded ? "Updating..." : "Onboarding...."}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
