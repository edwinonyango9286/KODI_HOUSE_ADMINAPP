import React from "react";

const CustomInput = (props) => {
  const { type, i_id, className, name, onChange, onBlur, value, placeholder } =
    props;
  return (
    <div className="relative flex items-start gap-1 flex-col ">
      <input
        type={type}
        className={`border border-gray-300 rounded-md px-3 block
             w-full leading-5 transition duration-200 ease-in-out sm:text-sm sm-leading-5 py-2 focus:outline-none focus:border-blue-600 text-gray-800 ${className}`}
        id={i_id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
