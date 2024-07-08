import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaEye, FaEyeSlash } from 'react-icons/fa'; // You can use any icon library

const CustomInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  type,
  width,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={` ${width ? `w-${width}` : 'w-full'}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {type === 'search' && (
          <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          // className={`block w-full pl-${type === 'search' ? '10' : '4'} pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          className='p-3'
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {inputType === 'password' ? <FaEye /> : <FaEyeSlash />}
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
};

CustomInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  width: '',
};

export default CustomInput;
