import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";

const ButtonTypes = {
  NORMAL: "normal",
  CART: "cart",
  CONTACT: "contact",
  BACK: "back",
  INVOICE: "invoice",
};

const CustomButton = ({ type, text, width, onClick, to, ...props }) => {
  const getClassNames = () => {
    switch (type) {
      case ButtonTypes.NORMAL:
        return "text-white bg-green-500 rounded-md";
      case ButtonTypes.CART:
        return "text-white bg-green-500 rounded-md flex items-center justify-center";
      case ButtonTypes.CONTACT:
        return "text-white bg-green-500 rounded-md flex items-center justify-center";
      case ButtonTypes.BACK:
        return "text-black bg-transparent flex items-center";
      case ButtonTypes.INVOICE:
        return "text-green-500 bg-white border border-black flex items-center";
      default:
        return "";
    }
  };

  const renderIcon = () => {
    switch (type) {
      case ButtonTypes.CART:
        return (
          <span className="mr-2">
            <IoCart className="h-6 w-6" />
          </span>
        ); // Cart icon
      case ButtonTypes.CONTACT:
        return <span className="ml-2">➡️</span>; // Forward arrow icon
      case ButtonTypes.BACK:
        return <span className="mr-2">⬅️</span>; // Backward arrow icon
      case ButtonTypes.INVOICE:
        return <span className="mr-2">📄</span>; // Download icon
      default:
        return null;
    }
  };

  const buttonContent = (
    <button
      className={`${getClassNames()} ${width ? `w-${width}` : ""} lg:w-auto px-4 py-1 lg:py-2`}
      onClick={onClick}
      {...props}
    >
      {type === ButtonTypes.BACK || type === ButtonTypes.CART
        ? renderIcon()
        : null}
      {text}
      {type === ButtonTypes.CONTACT ? renderIcon() : null}
    </button>
  );

  return to ? (
    <Link to={to} className="inline-block">
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

CustomButton.propTypes = {
  type: PropTypes.oneOf(Object.values(ButtonTypes)).isRequired,
  text: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

CustomButton.defaultProps = {
  text: "",
  width: "",
  onClick: null,
  to: null,
};

export default CustomButton;
