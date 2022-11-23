import React from "react";
import PropTypes from "prop-types";
import inputStyles from "./form-input.module.css";
import Select from "react-select";

const MultiSelectInput = ({ name, label, options, placeholder, onChange }) => {
  console.log({ name, label, options, placeholder, onChange });
  return (
    <div className={inputStyles.field}>
      <label className={inputStyles.label} htmlFor={name}>
        {label}
        <Select
          isMulti
          id={name}
          options={options}
          placeholder={placeholder}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

MultiSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MultiSelectInput;
