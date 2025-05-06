import React from "react";
import Login from "../../src/components/Login";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-cyan-600 to-pink-500 flex items-center">
      <div className="container p-4 md:py-0 py-8 mx-auto ">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          {/* Left side - Branding and text */}
          <div className="md:w-1/2 text-white">
            <h1 className="mb-6  font-bold text-center md:text-left xl:text-5xl lg:text-3xl md:text-2xl text-xl">
              Connecting People, Empowering Teams: Your Ultimate HR Toolkit.
            </h1>
            <div className="justify-center mb-6 md:justify-start md:block hidden">
              <img
                src="/LoginImage.png"
                alt="HR Management"
                className="md:w-full w-[70%] mx-auto h-auto"
              />
            </div>
            {/* <p className="text-lg font-medium text-center md:text-left">
              Unlock organizational success with our Ultimate HR Toolkit:
              recruiting excellence, fostering engagement, and building a
              thriving workplace culture. Connect people, empower teams, and
              drive results.
            </p> */}
         
          </div>

          {/* Right side - Login Form */}
          <div className="md:w-1/2">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
