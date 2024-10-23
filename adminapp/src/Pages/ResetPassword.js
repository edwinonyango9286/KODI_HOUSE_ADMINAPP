import React, { useState } from "react";
import signupBgImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import { Link } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

const RESET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string().required("Please enter your password"),
  reEnterPassword: Yup.string().required("Please enter re-enter password your"),
});

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleToggle2 = () => {
    setShowPassword2(!showPassword2);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      reEnterPassword: "",
    },
    validationSchema: RESET_PASSWORD_SCHEMA,
    onSubmit: (values) => {},
  });

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
                    ? "border-red-600"
                    : "border-gray-300"
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
                  <p className="text-sm font-normal text-red-600">
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
                name="reEnterPassword"
                label="Re-enter password"
                placeholder="**********************"
                id="reEnterPassword"
                className={`border ${
                  formik.touched.reEnterPassword &&
                  formik.errors.reEnterPassword
                    ? "border-red-600"
                    : "border-gray-300"
                } rounded-lg`}
                onChange={formik.handleChange("reEnterPassword")}
                onBlur={formik.handleBlur("reEnterPassword")}
                value={formik.values.reEnterPassword}
              />
              <div>
                <button
                  type="button"
                  onClick={handleToggle2}
                  className="absolute right-0 flex items-center p-3 mt-[-46px] "
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-500 flex-shrink-0"
                  />
                </button>
                <div>
                  <p className="text-sm font-normal text-red-600 ">
                    {formik.touched.reEnterPassword &&
                      formik.errors.reEnterPassword}
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

            <button
              type="submit"
              className="border rounded-xl w-full py-2 mt-8  bg-blue-700 hover:bg-blue-600 relative text-white"
            >
              Reset password
            </button>
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
