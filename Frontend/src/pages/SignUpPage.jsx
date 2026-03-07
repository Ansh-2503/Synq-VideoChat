/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignup = (event) => {
    event.preventDefault();
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SignUp - Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* App Logo */}
          <div className="mb-4 flex items-center justify-start gap-2"></div>
        </div>
        {/* SignUp - logo */}
      </div>
    </div>
  );
};

export default SignUpPage;
