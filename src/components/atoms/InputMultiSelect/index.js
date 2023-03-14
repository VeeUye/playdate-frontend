import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import styles from "../Input/styles.module.css";

const InputMultiSelect = ({
  name,
  label,
  className,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
        <Select
          className={className}
          id={name}
          options={options}
          placeholder={placeholder}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

InputMultiSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputMultiSelect;
