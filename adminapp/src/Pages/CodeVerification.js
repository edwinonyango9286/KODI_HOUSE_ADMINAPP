import React, { useEffect, useRef, useState } from "react";
import signupBgImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  activateUser,
  registerUser,
  resetState,
} from "../Features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const CODE_VERIFICATION_SCHEMA = Yup.object({
  code1: Yup.number().required().integer().min(0),
  code2: Yup.number().required().integer().min(0),
  code3: Yup.number().required().integer().min(0),
  code4: Yup.number().required().integer().min(0),
});

const CodeVerification = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdUser = JSON.parse(localStorage.getItem("createdUser"));
  const activationToken = createdUser?.activationToken;
  const [tokenError, setTokenError] = useState("");

  const isSuccess = useSelector((state) => state.auth.isSuccess.activateUser);
  const activatedUser = useSelector((state) => state.auth.activatedUser);

  const isError = useSelector((state) => state.auth.isError.activateUser);
  const isLoading = useSelector((state) => state.auth.isLoading.activateUser);

  const messageResendEmail = useSelector((state) => state.auth.message);
  const isErrorResendEmail = useSelector(
    (state) => state.auth.isError.registerUser
  );

  const message = useSelector((state) => state.auth.message);

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
    },
    validationSchema: CODE_VERIFICATION_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      if (!activationToken) {
        setTokenError(
          "Invalid activation code. Click resend to request for a new activation code."
        );
        resetForm();
        setTimeout(() => {
          setTokenError("");
        }, 10000);
        return;
      }

      const activationCode = `${values.code1}${values.code2}${values.code3}${values.code4}`;
      const data = {
        activationToken,
        activationCode,
      };
      dispatch(resetState());
      dispatch(activateUser(data));
      resetForm();
    },
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("createdUser"));
    if (storedUser && storedUser.timestamp < new Date().getTime() - 300000) {
      localStorage.removeItem("createdUser");
    }
  }, []);

  useEffect(() => {
    if (isSuccess && activatedUser) {
      dispatch(resetState());
      navigate("/");
    }
    if ((isError && message) || (isErrorResendEmail && messageResendEmail)) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isSuccess, activateUser, isError, message, dispatch]);

  const handleKeyUp = (index, e) => {
    const currentInput = inputRefs[index].current;
    if (currentInput.value) {
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !formik.values[`code${index + 1}`] &&
      index > 0
    ) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleInput = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    e.target.value = value.slice(-1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^\d]/g, "")
      .slice(0, 4);

    [...pastedData].forEach((char, index) => {
      if (index < 4) {
        formik.setFieldValue(`code${index + 1}`, char);
      }
    });

    const nextEmptyIndex = [...Array(4)].findIndex(
      (_, i) => !formik.values[`code${i + 1}`]
    );
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 4) {
      inputRefs[nextEmptyIndex].current.focus();
    } else {
      inputRefs[3].current.focus();
    }
  };

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

  return (
    <>
      <div className="relative w-full min-h-screen bg-cover bg-gray-800 flex justify-center items-center bg-opacity-70 overflow-hidden">
        <img
          src={signupBgImage}
          className="absolute w-full h-full object-cover mix-blend-overlay"
          alt="Backgroundimage"
          loading="lazy"
        />
        <div className="flex justify-center items-center h-full w-full m-4 lg:w-1/2 opacity-95">
          <form
            onSubmit={formik.handleSubmit}
            className=" flex justify-center items-center flex-col w-full md:w-3/4 h-auto flex-shrink-0 bg-white p-4 rounded-md md:p-10 gap-2"
          >
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
              Code verification
            </h2>

            {isErrorResendEmail && messageResendEmail && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-xs font-normal ">
                  {messageResendEmail}
                </p>
              </div>
            )}

            {tokenError && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-xs font-normal ">
                  {tokenError}
                </p>
              </div>
            )}

            {isError && message && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-xs font-normal ">{message}</p>
              </div>
            )}

            <div>
              {createdUser ? (
                <p className="text-default-gray-500 text-xs md:text-sm font-medium leading-5 text-center mb-3">
                  Please enter the 4 digit code sent to{" "}
                  <span className="text-teal-500">
                    {createdUser?.newUser?.email}
                  </span>
                  .
                </p>
              ) : (
                <p className="text-default-gray-500 text-xs md:text-sm font-medium leading-5 text-center mb-3">
                  Please enter the 4 digit code sent to your email.
                </p>
              )}
            </div>

            <div className="flex justify-center items-center flex-shrink gap-8 mb-3">
              {[1, 2, 3, 4].map((num, index) => (
                <input
                  key={num}
                  ref={inputRefs[index]}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  name={`code${num}`}
                  className={`border ${
                    formik.touched[`code${num}`] && formik.errors[`code${num}`]
                      ? "border-red-600 border-1.5"
                      : "border-gray-400 border-1.5"
                  } rounded-lg text-center text-2xl text-gray-800 font-bold focus:outline-none focus:border-blue-600 transition duration-200`}
                  style={{ width: 58, height: 60 }}
                  maxLength={1}
                  value={formik.values[`code${num}`]}
                  onChange={(e) => {
                    handleInput(e);
                    formik.handleChange(e);
                  }}
                  onKeyUp={(e) => handleKeyUp(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onBlur={formik.handleBlur(`code${num}`)}
                />
              ))}
            </div>

            {isLoading ? (
              <button
                type="submit"
                className="border rounded-xl w-full py-2 mt-8 bg-gray-200 relative text-gray-400 text-base font-semibold  flex justify-center items-center"
              >
                <span>Verify</span>
                <div className=" absolute right-2">
                  <CircularProgress size={20} thickness={4} />
                </div>
              </button>
            ) : (
              <button
                type="submit"
                className="border rounded-xl w-full py-2 mt-8 bg-blue-700 hover:bg-blue-600 relative text-white text-base font-semibold"
              >
                Verify
              </button>
            )}

            <div>
              <p className="text-xs text-default-gray-500 md:text-sm font-medium mb-4 ">
                Didn't recieve an code?{" "}
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

export default CodeVerification;
