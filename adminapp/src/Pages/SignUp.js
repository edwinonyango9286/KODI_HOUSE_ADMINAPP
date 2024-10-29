import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../Assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import IconBlue from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg";
import { BsApple } from "react-icons/bs";
import { GrTwitter } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LogoWhite from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { registerUser, resetState } from "../Features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const SIGN_UP_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Please enter your name."),
  email: Yup.string().email().required("Please enter your email."),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required("Please enter your password."),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const createdUser = useSelector((state) => state.auth.createdUser);

  const isSuccess = useSelector((state) => state.auth.isSuccess.registerUser);
  const isLoading = useSelector((state) => state.auth.isLoading.registerUser);
  const message = useSelector((state) => state.auth.message);
  const isError = useSelector((state) => state.auth.isError.registerUser);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SIGN_UP_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(registerUser(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess && createdUser) {
      navigate("/email-verification");
    }
    if (isError && message) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isSuccess, createdUser, isError, message, dispatch]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("createdUser"));
    if (storedUser && storedUser.timestamp < new Date().getTime() - 300000) {
      localStorage.removeItem("createdUser");
    }
  }, []);

  return (
    <>
      <div className="relative z-10 w-full  min-h-screen bg-cover bg-gray-800 flex justify-center items-center bg-opacity-70">
        <img
          src={backgroundImage}
          className="absolute w-full h-full object-cover mix-blend-overlay"
          alt="BackgroundImage"
          loading="lazy"
        />
        <div className="flex justify-center items-center h-full w-full opacity-95 lg:w-1/2 lg:my-4">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white  m-4 p-4 md:p-10 md:py-8 w-full h-full md:w-3/4 rounded-md md:h-auto gap-2"
          >
            <div className="flex items-center justify-center mb-2">
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

            <h2 className="text-2xl text-gray-800 leading-9 font-bold text-center ">
              Create an account
            </h2>

            {isError && message && (
              <div className="flex items-center justify-center">
                <p className="text-red-600 text-xs font-normal ">{message}</p>
              </div>
            )}

            <div className="mt-2 mb-4 flex justify-center items-center">
              <p className="text-default-gray-500 text-sm md:text-base font-normal leading-5 ">
                Create account with socials
              </p>
            </div>

            <div className="flex  justify-center itesm-center gap-10  py-4">
              <FcGoogle
                className="mr-2 icon border rounded-md  border-blue-500"
                style={{
                  fontSize: "2.5rem",
                  padding: "0.5rem",
                }}
              />
              <FaFacebookF
                className="mr-2 icon border rounded-md border-blue-500"
                style={{
                  fontSize: "2.5rem",
                  color: "blue",
                  padding: "0.5rem",
                }}
              />
              <BsApple
                className="mr-2 icon border rounded-md border-black"
                style={{
                  fontSize: "2.5rem",
                  padding: "0.5rem",
                }}
              />
              <GrTwitter
                className="mr-2 icon border rounded-md border-blue-500"
                style={{
                  fontSize: "2.5rem",
                  color: "blue",
                  padding: "0.5rem",
                }}
              />
            </div>
            <div className="mt-4 mb-4 flex justify-center items-center">
              <div className="border-b-2 mr-4 border-gray-400 flex-grow"></div>
              <p className="text-default-gray-500 text-sm md:text-base font-semibold leading-5 ">
                Or, sign up with your email
              </p>
              <div className="border-b-2 ml-4 border-gray-400 flex-grow"></div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-base text-gray-800">
                Name
              </label>
              <CustomInput
                type="text"
                placeholder="name"
                name="name"
                id="name"
                className={`border ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-600"
                    : "border-gray-300"
                } rounded-lg`}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
              />
              <div className="relative z-20 flex flex-col mb-2 gap-2 md:mb-4">
                {formik.touched.name && formik.errors.name && (
                  <span className="absolute right-0 flex items-center p-3 mt-[-46px] ">
                    <BsFillExclamationCircleFill className="text-red-600 flex-shrink-0 " />
                  </span>
                )}

                <div>
                  <p className="text-xs font-normal text-red-600">
                    {formik.touched.name && formik.errors.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-gray-800">Email</label>
              <CustomInput
                type="email"
                name="email"
                placeholder="name@example.com"
                className={`border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-600"
                    : "border-gray-300"
                } rounded-lg`}
                id="pass"
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
                  <p className="text-xs font-normal text-red-600">
                    {formik.touched.email && formik.errors.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex z-10 flex-col gap-1">
              <label className="font-medium text-sm text-gray-800">
                Password
              </label>

              <CustomInput
                type={showPassword ? "text" : "password"}
                name="password"
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

              <div className="relative z-20 flex flex-col mb-2 md:mb-4 gap-2">
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-0 flex items-center p-3 mt-[-46px]"
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

            <div className="flex items-center justify-between mt-4">
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
                <span>Create an account</span>
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
                Create an account
              </button>
            )}

            <div className="flex items-center flex-row mt-6 mb-2">
              <h5 className="text-grya-800 text-sm leading-5 font-medium">
                Already have an accout ?
              </h5>
              <Link
                to="/"
                className="text-blue-600 text-sm leading-5 font-medium ml-2"
              >
                Login here
              </Link>
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
export default SignUp;
