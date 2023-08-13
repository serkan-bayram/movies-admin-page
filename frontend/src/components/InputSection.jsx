import React from "react";

const InputSection = (props) => {
  const { name, label, value, onInputChange } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <div className="grid grid-rows-2 w-1/2 mx-auto mb-4 ">
      <label
        className="flex items-center justify-center font-medium text-gray-900 dark:text-white text-center"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        value={value}
      />
    </div>
  );
};

export default InputSection;
