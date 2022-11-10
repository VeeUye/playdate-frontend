import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import LoadSpinnerStyles from "./load-spinner.module.css";

const LoadSpinner = () => {
  return (
    <div className={LoadSpinnerStyles.loadSpinner} data-testid="spinner">
      <PuffLoader
        color="#835932"
        className={LoadSpinnerStyles.moonLoader}
        size={150}
      />
    </div>
  );
};

export default LoadSpinner;
