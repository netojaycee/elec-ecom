import { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // You can use any icon library

const CustomInput = ({
  label = "",
  placeholder = "",
  name,
  value,
  onChange,
  type = "text",
  width = "",
  textarea = false,
  options = [],
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={`${width ? `w-${width}` : "w-full"}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {textarea ? (
          <textarea
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="block w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...props}
          />
        ) : type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="block w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...props}
          >
            {options &&
              options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="block w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...props}
          />
        )}
        {type === "password" && !textarea && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {inputType === "password" ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  width: PropTypes.string,
  textarea: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default CustomInput;
