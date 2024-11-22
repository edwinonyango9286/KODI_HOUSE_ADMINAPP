import React, { useEffect, useState } from "react";
import signupBgImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetState } from "../Features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const RESET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required("Please enter your password."),
  reenterPassword: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .oneOf(
      [Yup.ref("password")],
      "Password and re-enter password values do not match."
    )
    .required("Please re-enter your password."),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = location.pathname.split("/")[2];
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleToggle2 = () => {
    setShowPassword2(!showPassword2);
  };

  const isSuccess = useSelector((state) => state.auth.isSuccess.resetPassword);
  const isLoading = useSelector((state) => state.auth.isLoading.resetPassword);
  const isError = useSelector((state) => state.auth.isError.resetPassword);
  const message = useSelector((state) => state.auth.message);

  const formik = useFormik({
    initialValues: {
      password: "",
      reenterPassword: "",
    },
    validationSchema: RESET_PASSWORD_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(
        resetPassword({
          token: token,
          password: values.password,
          reenterPassword: values.reenterPassword,
        })
      );
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError && message) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isSuccess, isError, message]);

  return (
    <>
      <div className="relative 10 w-full min-h-screen bg-cover bg-gray-800 flex justify-center items-center bg-opacity-70 overflow-hidden">
        <img
          src={signupBgImage}
          className="absolute w-full h-full object-cover mix-blend-overlay"
          alt="Backgroundimage"
          loading="lazy"
        />

        <div className="flex justify-center  items-center w-full lg:w-1/2 opacity-95 mx-4 md:my-2">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex-shrink-0 bg-white p-8 rounded-md md:w-3/4"
          >
            <div className="flex items-center justify-center ">
              <img
                src={IconBlue}
                className="flex-shrink-0"
                loading="lazy"
                style={{
                  width: 34,
                  height: 34,
                }}
              />
            </div>
            <h2 className="text-2xl text-gray-800 leading-9 font-bold text-center mb-6 md:mt-2">
              Reset password
            </h2>

            {isError && message && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-xs font-normal ">{message}</p>
              </div>
            )}

            <div className=" relative z-10 flex flex-col mb-2 gap-2">
              <label className="font-medium text-sm text-gray-800">
                Enter new password
              </label>
              <CustomInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="Enter new password"
                placeholder="**********************"
                id="password"
                className={`border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-600 border-1.5"
                    : "border-gray-300 border-1.5"
                } rounded-lg`}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                value={formik.values.password}
              />
              <div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-0 flex items-center p-3 mt-[-46px] "
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-500 flex-shrink-0"
                  />
                </button>
                <div>
                  <p className="text-xs font-normal text-red-600">
                    {formik.touched.password && formik.errors.password}
                  </p>
                </div>
              </div>
            </div>
            <div className=" relative z-20 flex flex-col mb-2  gap-2">
              <label className="font-medium text-sm text-gray-800">
                Re-enter password
              </label>
              <CustomInput
                type={showPassword2 ? "text" : "password"}
                name="reenterPassword"
                label="Re-enter password"
                placeholder="**********************"
                id="reenterPassword"
                className={`border ${
                  formik.touched.reenterPassword &&
                  formik.errors.reenterPassword
                    ? "border-red-600 border-1.5"
                    : "border-gray-300 border-1.5"
                } rounded-lg`}
                onChange={formik.handleChange("reenterPassword")}
                onBlur={formik.handleBlur("reenterPassword")}
                value={formik.values.reenterPassword}
              />
              <div>
                <button
                  type="button"
                  onClick={handleToggle2}
                  className="absolute right-0 flex items-center p-3 mt-[-46px] "
                >
                  <FontAwesomeIcon
                    icon={showPassword2 ? faEye : faEyeSlash}
                    className="text-gray-500 flex-shrink-0"
                  />
                </button>
                <div>
                  <p className="text-xs font-normal text-red-600 ">
                    {formik.touched.reenterPassword &&
                      formik.errors.reenterPassword}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 md:mt-6">
              <div className="text-gray-500 text-xs font-medium leading-6">
                <input className="mr-1" type="checkbox" />I accept the{" "}
                <Link to="" className="text-blue-600">
                  terms and conditions
                </Link>
              </div>
            </div>

            {isLoading ? (
              <button
                type="submit"
                className="border rounded-xl w-full py-2 mt-8 bg-gray-200 relative text-gray-400 text-base font-semibold  flex justify-center items-center"
              >
                <span>Reset password</span>
                <div className=" absolute right-2">
                  <CircularProgress size={20} thickness={4} />
                </div>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="border rounded-xl w-full py-2 mt-8 bg-blue-700 hover:bg-blue-600 relative text-white text-base font-semibold"
              >
                Reset password
              </button>
            )}
          </form>
        </div>

        <div className=" hidden lg:block lg:w-1/2 overflow-hidden gap-2">
          <div className="flex flex-col  justify-items-center items-center gap-2">
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

export default ResetPassword;
