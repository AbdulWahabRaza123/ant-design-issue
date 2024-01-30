import React, { useEffect, useState } from "react";

import "./Signup_2_Details.css";
import { fetchData, postData, useFormState } from "../../services/methods/api";
import Signup4Step0 from "./Signup4Step0";
import Signup4Step1 from "./Signup4Step1";
import SubSteps_4 from "../Sub_Steps/SubSteps_4";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup4Current } from "../redux/features/signupStates";
import { useRouter } from "next/navigation";
const Signup_4_Details = ({
  t,
  lng,
  updateMainStepFromChild,
  mainstep,
  setMainStep,
  updateMainPreviousFromChild,
}) => {
  const { push } = useRouter();
  // const [current, setCurrent] = useState(0);
  const [format, setFormat] = useState("");
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const main = urlParams.get("mainstep");
    const substep = urlParams.get("substep");
    if (!substep) {
      push(`/${lng}/signup-step?mainstep=${main}&substep=${0}`);
      dispatch(setSignup4Current(0));
    }
  }, []);
  const updatNexttStepFromChild = (value, format) => {
    dispatch(setSignup4Current(parseInt(signupStates.signup4Current) + 1));
    setFormat(format);
  };

  const updatPrevStepFromChild = (value) => {
    dispatch(setSignup4Current(parseInt(signupStates.signup4Current) - 1));
  };

  const steps = [
    {
      content: (
        <Signup4Step0
          lng={lng}
          mainstep={mainstep}
          setMainStep={setMainStep}
          updatPrevStepFromChild={updatPrevStepFromChild}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
          updatNexttStepFromChild={updatNexttStepFromChild}
          t={t}
        />
      ),
    },
    {
      content: (
        <Signup4Step1
          lng={lng}
          format={format}
          mainstep={mainstep}
          setMainStep={setMainStep}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
          updatNexttStepFromChild={updatNexttStepFromChild}
          updatPrevStepFromChild={updatPrevStepFromChild}
          t={t}
        />
      ),
    },
  ];

  return (
    <div className="h-100">
      <div>
        {steps[signupStates.signup4Current]?.content}
        <SubSteps_4 steps={3} />
      </div>
    </div>
  );
};

export default Signup_4_Details;
