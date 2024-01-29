import React from "react";
import "./Sub_Steps.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup1Current } from "../redux/features/signupStates";
const SubSteps = ({ steps }) => {
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const items = ["0", "1", "2", "3"];
  return (
    <div className="flex mb-4 mt-24 custom-steps">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`rounded-lg h-2 md:w-1/4 w-100 mx-1 ${
              signupStates.signup1Current >= item ? "active" : "unactive"
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default SubSteps;
