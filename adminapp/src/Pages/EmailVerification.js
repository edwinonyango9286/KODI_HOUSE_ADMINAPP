import React, { useEffect } from "react";
import signupBgImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../Features/auth/authSlice";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdUser = JSON.parse(localStorage.getItem("createdUser"));
  const message = useSelector((state) => state.auth.message);
  const isError = useSelector((state) => state.auth.isError.registerUser);
  const isSuccess = useSelector((state) => state.auth.isSuccess.registerUser);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("createdUser"));
    if (storedUser && storedUser.timestamp < new Date().getTime() - 300000) {
      localStorage.removeItem("createdUser");
    }
  }, []);

  const handleResendEmail = () => {
    if (createdUser) {
      const resendData = {
        name: createdUser?.newUser?.name,
        email: createdUser?.newUser?.email,
        password: createdUser?.newUser?.password,
      };
      dispatch(resetState());
      dispatch(registerUser(resendData));
    }
  };

  useEffect(() => {
    if (isError && message) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isError, message, dispatch]);

  const handleNavigate = () => {
    if (isSuccess && createdUser) {
      navigate("/code-verification");
    }
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-cover  bg-gray-800 flex justify-center items-center bg-opacity-70 overflow-hidden">
        <img
          src={signupBgImage}
          className="absolute w-full h-full object-cover mix-blend-overlay"
          alt="Backgroundimage"
          loading="lazy"
        />
        <div className="flex justify-center items-center h-full w-full m-4 lg:w-1/2 opacity-95">
          <form className=" flex justify-center items-center flex-col w-full md:w-3/4 h-auto flex-shrink-0 bg-white p-4 rounded-md md:p-10 gap-4">
            <div className="flex items-center justify-center flex-col ">
              <img
                src={IconBlue}
                className="flex-shrink-0"
                alt="Icon"
                loading="lazy"
                style={{
                  width: 34,
                  height: 34,
                }}
              />
            </div>

            <h2 className="text-2xl text-gray-800 leading-9 font-bold text-center">
              Email verification
            </h2>

            {isError && message && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-xs font-normal ">{message} </p>
              </div>
            )}

            <div>
              {createdUser ? (
                <p className="text-default-gray-500 text-xs md:text-sm font-medium leading-5 text-center">
                  We have sent a verification code to{" "}
                  {createdUser?.newUser?.email}. Please check it.
                </p>
              ) : (
                <p className="text-default-gray-500 text-xs md:text-sm font-medium leading-5 text-center">
                  We have sent a verification code to your email. Please check
                  it.
                </p>
              )}
            </div>

            <div className="flex justify-center items-center rounded-full p-4 w-16 h-16 bg-gray-200 flex-shrink">
              <HiOutlineMail
                style={{
                  width: 53,
                  height: 53,
                }}
                className="text-gray-500"
              />
            </div>

            <button
              type="button"
              className="border rounded-xl w-full py-2  bg-blue-700 hover:bg-blue-600 relative text-white text-base font-semibold"
              onClick={handleNavigate}
            >
              Verify email
            </button>

            <div>
              <p className="text-xs text-default-gray-500 md:text-sm font-medium mb-4 ">
                Didn't recieve an email?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={handleResendEmail}
                >
                  Resend
                </span>
              </p>
            </div>
          </form>
        </div>

        <div className=" hidden lg:block lg:w-1/2 overflow-hidden gap-2">
          <div className="flex flex-col  justify-items-center items-center">
            <div className="text-white">
              <img
                src={LogoWhite}
                alt="Logo"
                className="mr-2"
                loading="lazy"
                style={{ width: 191, height: 53 }}
              />
            </div>

            <div>
              <h6 className="text-white text-sm">Sign up or create account</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
