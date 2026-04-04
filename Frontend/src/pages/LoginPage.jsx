import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // used custom hook for login (useLogin.js)
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-100">
      <div className="border border-base-content/10 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-transparent lg:bg-base-100 rounded-[2rem] shadow-none lg:shadow-xl overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
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
          {/* Error msg */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcom Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>
                {/* Email - field */}
                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="user@gmail.com"
                      className="input bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Password - field */}
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="*******"
                        className="input bg-base-200/50 rounded-2xl w-full border-none focus:bg-base-200 transition-colors pr-12"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
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
                  </div>
                  {/* Sign in - button */}
                  <button
                    className="btn btn-primary w-full rounded-2xl mt-4"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in....
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Login Image - left  */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Image / Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="./signup-banner.png" alt="Login image" />
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

export default LoginPage;
