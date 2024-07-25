import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

const ButtonTypes = {
  NORMAL: "normal",
  CART: "cart",
  CONTACT: "contact",
  BACK: "back",
  INVOICE: "invoice",
};

const CustomButton = ({ type, text, width, onClick, Icon, to, ...props }) => {
  const getClassNames = () => {
    switch (type) {
      case ButtonTypes.NORMAL:
        return "text-white bg-primary rounded-md";
      case ButtonTypes.CART:
        return "text-white bg-primary rounded-md flex items-center justify-center";
      case ButtonTypes.CONTACT:
        return "text-white bg-primary rounded-md flex items-center justify-center";
      case ButtonTypes.BACK:
        return "text-black bg-transparent flex items-center";
      case ButtonTypes.INVOICE:
        return "text-xs md:text-sm text-primary bg-white border border-black flex items-center";
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
        return (
          <span className="ml-2">
            <Icon className="h-4 w-4" />
          </span>
        ); // Forward arrow icon
      case ButtonTypes.BACK:
        return (
          <span className="mr-2">
            <BsArrowLeft className="h-6 w-6" />
          </span>
        ); // Backward arrow icon
      case ButtonTypes.INVOICE:
        return (
          <span className="mr-2">
            <FiDownload className="h-4 w-4" />
          </span>
        ); // Download icon
      default:
        return null;
    }
  };

  const buttonContent = (
    <button
      className={`${getClassNames()} ${
        width ? `w-${width} lg:w-auto` : ""
      }  px-4 py-1 lg:py-2`}
      onClick={onClick}
      {...props}
    >
      {type === ButtonTypes.BACK || type === ButtonTypes.CART || type ===ButtonTypes.INVOICE
        ? renderIcon()
        : null}
      {text}
      {type === ButtonTypes.CONTACT  ? renderIcon() : null}
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
