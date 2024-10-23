import React, { useEffect } from "react";
import signupBgImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  activateNewLandlordAccount,
  registerPropertyLandlord,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdUser = JSON.parse(localStorage.getItem("createdUser"));
  const activationToken = createdUser?.activationToken;

  const isSuccess = useSelector(
    (state) => state.auth.isSuccess.activateNewLandlordAccount
  );
  const activatedLandlord = useSelector(
    (state) => state.auth.activatedLandlord
  );

  const isError = useSelector(
    (state) => state.auth.isError.activateNewLandlordAccount
  );
  const isLoading = useSelector(
    (state) => state.auth.isLoading.activateNewLandlordAccount
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
    onSubmit: (values) => {
      const activationCode = `${values.code1}${values.code2}${values.code3}${values.code4}`;
      const data = {
        activationToken,
        activationCode,
      };
      dispatch(resetState());
      dispatch(activateNewLandlordAccount(data));
    },
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("createdUser"));
    if (storedUser && storedUser.timestamp < new Date().getTime() - 300000) {
      localStorage.removeItem("createdUser");
    }
  }, []);

  useEffect(() => {
    if (isSuccess && activatedLandlord) {
      dispatch(resetState());
      navigate("/");
    }
    if (isError && message) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isSuccess, activateNewLandlordAccount, isError, message, dispatch]);

  const handleResendEmail = () => {
    if (createdUser) {
      const resendData = {
        name: createdUser?.newUser?.name,
        email: createdUser?.newUser?.email,
        password: createdUser?.newUser?.password,
      };
      dispatch(resetState());
      dispatch(registerPropertyLandlord(resendData));
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
            className=" flex justify-center items-center flex-col w-full md:w-3/4 h-auto flex-shrink-0 bg-white p-4 rounded-md md:p-10 gap-4"
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

            {isError && message && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-sm font-normal ">{message} </p>
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
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                name="code1"
                className={`border ${
                  formik.touched.code1 && formik.errors.code1
                    ? "border-red-600"
                    : "border-gray-400"
                } rounded-lg text-center text-2xl text-gray-800 font-bold focus:outline-none focus:border-blue-600 transition duration-200`}
                style={{ width: 58, height: 60 }}
                maxLength={1}
                onChange={formik.handleChange("code1")}
                onBlur={formik.handleBlur("code1")}
                value={formik.values.code1}
              />
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                name="code2"
                className={`border ${
                  formik.touched.code2 && formik.errors.code2
                    ? "border-red-600"
                    : "border-gray-400"
                } rounded-lg text-center text-2xl text-gray-800 font-bold focus:outline-none focus:border-blue-600 transition duration-200`}
                style={{ width: 58, height: 60 }}
                maxLength={1}
                onChange={formik.handleChange("code2")}
                onBlur={formik.handleBlur("code2")}
                value={formik.values.code2}
              />
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                name="code3"
                className={`border ${
                  formik.touched.code3 && formik.errors.code3
                    ? "border-red-600"
                    : "border-gray-400"
                } rounded-lg text-center text-2xl text-gray-800 font-bold focus:outline-none focus:border-blue-600 transition duration-200`}
                style={{ width: 58, height: 60 }}
                maxLength={1}
                onChange={formik.handleChange("code3")}
                onBlur={formik.handleBlur("code3")}
                value={formik.values.code3}
              />
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                name="code4"
                className={`border ${
                  formik.touched.code4 && formik.errors.code4
                    ? "border-red-600"
                    : "border-gray-400"
                } rounded-lg text-center text-2xl text-gray-800 font-bold focus:outline-none focus:border-blue-600 transition duration-200`}
                style={{ width: 58, height: 60 }}
                maxLength={1}
                onChange={formik.handleChange("code4")}
                onBlur={formik.handleBlur("code4")}
                value={formik.values.code4}
              />
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
