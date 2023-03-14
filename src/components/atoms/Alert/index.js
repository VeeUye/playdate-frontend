import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Alert = ({ message, success }) => {
  if (!message) return null;
  return (
    <div
      className={`${styles.alert} ${success ? styles.success : styles.error}`}
      data-testid="alert"
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

Alert.defaultProps = {
  success: false,
};

export default Alert;
