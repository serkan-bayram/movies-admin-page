import React from "react";

const InputSection = (props) => {
  const { name, label, value, onInputChange } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <div className="grid grid-rows-2 w-1/2 mx-auto mb-4 ">
      <label className="text-center text-white" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        onChange={handleChange}
        className="w-full"
        type="text"
        value={value}
      />
    </div>
  );
};

export default InputSection;
