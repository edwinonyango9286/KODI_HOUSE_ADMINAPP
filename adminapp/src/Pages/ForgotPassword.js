import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import signupBgImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import { Link } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import { BsFillExclamationCircleFill } from "react-icons/bs";


const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required("Please enter your email"),
});

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: FORGOT_PASSWORD_SCHEMA,

    onSubmit: (values) => {},
  });

  return (
    <>
      <div className="relative w-full min-h-screen bg-cover bg-gray-800 flex justify-center items-center bg-opacity-70 overflow-hidden">
        <img
          src={signupBgImage}
          className="absolute w-full h-full object-cover mix-blend-overlay"
          loading="lazy"
          alt="Backgroundimage"
        />

        <div className="flex justify-center items-center h-full w-full opacity-95 m-4 lg:w-1/2 lg:my-4">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full md:w-3/4  h-auto  bg-white p-4 md:p-10 rounded-md"
          >
            <div className="flex items-center justify-center mb-2 ">
              <img
                src={IconBlue}
                className="flex-shrink-0"
                loading="lazy"
                alt="Icon"
                style={{
                  width: 34,
                  height: 34,
                }}
              />
            </div>
            <h2 className="text-2xl text-gray-800 leading-9 font-bold text-center ">
              Forgot your password?
            </h2>
            <div className="my-6  ">
              <p className="text-default-gray-500 text-sm md:text-base font-medium leading-5 ">
                Don't fret! Just type your email and we will send you a code to
                reset your password.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-gray-800">Email</label>
              <CustomInput
                type="email"
                placeholder="name@example.com"
                name="email"
                id="email"
                className={`border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-600"
                    : "border-gray-300"
                } rounded-lg`}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />

              <div className=" relative z-20 flex flex-col mb-2 gap-2 md:mb-4">
                {formik.touched.email && formik.errors.email && (
                  <span className="absolute right-0 flex items-center p-3 mt-[-46px] ">
                    <BsFillExclamationCircleFill className="text-red-600 flex-shrink-0 " />
                  </span>
                )}

                <div>
                  <p className="text-sm font-normal text-red-600">
                    {formik.touched.email && formik.errors.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-gray-500 text-xs font-medium leading-6">
                <input className="mr-1" type="checkbox" />I accept the{" "}
                <Link to="" className="text-blue-600">
                  terms and conditions
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="border rounded-xl w-full py-2 mt-8 bg-blue-700 hover:bg-blue-600 relative text-base font-semibold text-white"
            >
              Recover password
            </button>

            <div className="flex items-center justify-between mt-4">
              <div className="text-gray-500 text-xs font-medium leading-6">
                <input className="mr-1" type="checkbox" />
                Remember it ?{" "}
                <Link to="/" className="text-blue-600">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:block lg:w-1/2 overflow-hidden gap-2">
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

export default ForgotPassword;
