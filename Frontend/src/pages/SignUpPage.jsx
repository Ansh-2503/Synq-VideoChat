import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { error, isPending, signupMutation } = useSignup();

  const handleSignup = (event) => {
    event.preventDefault();
    signupMutation(signupData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-100">
      <div className="border border-base-content/10 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-transparent lg:bg-base-100 rounded-[2rem] shadow-none lg:shadow-xl overflow-hidden">
        {/* SignUp Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* App Logo */}
          <div className="mb-4 flex items-center justify-start gap-3">
            <img
              src="/Synq_logo.png"
              alt="Synq Logo"
              className="size-[80px] object-contain"
            />
            <div className="flex flex-col justify-center">
              <span className="text-3xl font-black font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-none tracking-tight">
                Synq
              </span>
              <span className="text-[12px] font-semibold text-base-content/40 tracking-[0.2em] mt-1 whitespace-nowrap leading-none pl-0.5">
                VIDEO CHAT
              </span>
            </div>
          </div>

          {/* Error Message Handling */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* Form - Start */}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text=sm opacity-70">
                    Join Synq and start you learning with fun
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FullName - field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John doe"
                      className="input bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Email - Field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Johndoe12@c.com"
                      className="input bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Password - Field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="*******"
                        className="input bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors pr-12"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="size-5" />
                        ) : (
                          <EyeIcon className="size-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                  {/* CheckBox - Field */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full rounded-2xl mt-4"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading....
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account ?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          {/* Form - Ends */}
        </div>
        {/* SignUp Form - ENDS */}
        {/* SignUp Form - Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration ( signup-img ) */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="./signup-banner.png"
                alt="Signup img"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make firends, and imporve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
