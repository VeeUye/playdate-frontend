import React from "react";
import PropTypes from "prop-types";
import inputStyles from "./form-input.module.css";
import Select from "react-select";

const MultiSelectInput = ({
  name,
  label,
  options,
  inputId,
  placeholder,
  onChange,
}) => {
  console.log(options);
  return (
    <div
      id={name}
      className={inputStyles.field}
      aria-labelledby={label}
      data-testid="form"
    >
      <label id={label} className={inputStyles.label} htmlFor={name}>
        {label}
        <Select
          isMulti
          id={name}
          options={options}
          inputId={inputId}
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
  inputId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MultiSelectInput;
