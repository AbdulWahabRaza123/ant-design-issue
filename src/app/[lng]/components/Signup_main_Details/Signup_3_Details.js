import { useEffect, useState } from "react";
import SubSteps_3 from "../Sub_Steps/SubSteps_3";
import Signup3Step0 from "./Signup_3_Step0";
import Signup3Step1 from "./Signup_3_Step1";
import Signup_3_Step2 from "./Signup_3_Step2";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup3Current } from "../redux/features/signupStates";
import { useRouter } from "next/navigation";

const Signup_3_Details = ({
  t,
  lng,
  mainstep,
  setMainStep,
  updateMainStepFromChild,
  updateMainPreviousFromChild,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const [myState3, setMyState3] = useState(0);
  console.log(signupStates);
  // const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchValue = urlParams.get("substep");
  //   if (searchValue) {
  //     dispatch(setSignup3Current(searchValue));
  //   }
  // }, []);
  useEffect(() => {
    setMyState3(signupStates.signup3Current);
  }, [signupStates.signup3Current]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const main = urlParams.get("mainstep");
    const substep = urlParams.get("substep");
    if (!substep) {
      push(`/${lng}/signup-step?mainstep=${main}&substep=${0}`);
      dispatch(setSignup3Current(0));
    }
  }, []);

  const updatNexttStepFromChild = (value) => {
    dispatch(setSignup3Current(parseInt(myState3) + 1));
    push(`/${lng}/signup-step?mainstep=${3}&substep=${parseInt(myState3) + 1}`);
  };

  const updatPrevStepFromChild = (value) => {
    if (myState3 == 0) {
      const temp = mainstep - 1;
      updateMainPreviousFromChild(temp);
      push(
        `/${lng}/signup-step?mainstep=${temp}&substep=${signupStates.signup2Current}`
      );
    } else {
      dispatch(setSignup3Current(parseInt(myState3) - 1));
      push(
        `/${lng}/signup-step?mainstep=${3}&substep=${parseInt(myState3) - 1}`
      );
    }
  };

  //   useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const searchValue = urlParams.get("substep");
  //     if (searchValue) {
  //       dispatch(setSignup3Current(searchValue));
  //     }
  //   }, []);

  const steps = [
    {
      content: (
        <Signup3Step0
          mainstep={mainstep}
          setMainStep={setMainStep}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
          updatNexttStepFromChild={updatNexttStepFromChild}
          lng={lng}
          t={t}
        />
      ),
    },
    {
      content: (
        <Signup3Step1
          mainstep={mainstep}
          setMainStep={setMainStep}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
          updatNexttStepFromChild={updatNexttStepFromChild}
          updatPrevStepFromChild={updatPrevStepFromChild}
          lng={lng}
          t={t}
        />
      ),
    },
    {
      content: (
        <Signup_3_Step2
          mainstep={mainstep}
          setMainStep={setMainStep}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
          updatNexttStepFromChild={updatNexttStepFromChild}
          lng={lng}
          updatPrevStepFromChild={updatPrevStepFromChild}
          t={t}
        />
      ),
    },
  ];

  return (
    <div className="h-100">
      <div>{steps[parseInt(myState3)]?.content}</div>
      <SubSteps_3 steps={3} />
    </div>
  );
};

export default Signup_3_Details;
