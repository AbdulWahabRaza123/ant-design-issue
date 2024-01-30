"use client";
import React, { useState, useEffect } from "react";
import { Button, Col, Dropdown, Menu } from "antd";
import StepsComponent from "../Main_Steps/Steps";
import Signup_1_Details from "../Signup_main_Details/Signup_1_Details";
import Signup_2_Details from "../Signup_main_Details/Signup_2_Details";
import Signup_3_Details from "../Signup_main_Details/Signup_3_Details";
import Signup_4_Details from "../Signup_main_Details/Signup_4_Details";
import StepsRow from "../CustomComponents/Steps_Row";
import "./SigninPage.css";
import Loader from "../Spinner/Loader";
import LoadingTimer from "../Loader/LoadingTimer";
import { useTranslation } from "../../../i18n";
import dochyve_yellow from "../../../../../public/dochyve_yellow.svg";
import "./Signup_1_Page.css";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSignup1Current,
  setSignup2Current,
  setSignup3Current,
  setSignup4Current,
} from "../redux/features/signupStates";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchData } from "../../services/methods/api";

function Signup_1_Page({ lng }) {
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const [isLoading, setIsLoading] = useState(true);
  const [trans, setTrans] = useState(null);
  const [mainstep, setMainStep] = useState(0);

  const { push } = useRouter();

  const load = async () => {
    const { t } = await useTranslation(lng, "signup");
    return t;
  };

  useEffect(() => {
    load()
      .then(async (f) => {
        setTrans(() => {
          return f;
        });
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepValue = urlParams.get("mainstep");
    const substep = urlParams.get("substep");
    if (stepValue) {
      setMainStep(stepValue);
      if (stepValue == 1) {
        dispatch(setSignup1Current(substep));
      } else if (stepValue == 2) {
        dispatch(setSignup2Current(0));
      } else if (stepValue == 3) {
        dispatch(setSignup3Current(substep));
      } else if (stepValue == 4) {
        dispatch(setSignup4Current(substep));
      }
    }
  }, []);

  const updateMainStepFromChild = () => {
    const temp = parseInt(mainstep) + 1;
    push(`/${lng}/signup-step?mainstep=${temp}&substep=${0}`);
    setMainStep(temp);
  };

  const updateMainPreviousFromChild = (substep) => {
    const temp = parseInt(mainstep) - 1;
    setMainStep(temp);

    // push(`/${lng}/signup-step?mainstep=${temp}&substep=${substep}`);
  };

  const steps = [
    {
      content: <>Page not found</>,
    },
    {
      content: (
        <Signup_1_Details
          mainstep={mainstep}
          setMainStep={setMainStep}
          // current={signup1Current}
          // setCurrent={setSignup1Current}
          lng={lng}
          t={trans}
          updateMainStepFromChild={updateMainStepFromChild}
        />
      ),
    },

    {
      content: (
        <Signup_2_Details
          mainstep={mainstep}
          setMainStep={setMainStep}
          // current={signup2Current}
          // setCurrent={setSignup2Current}
          lng={lng}
          t={trans}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
        />
      ),
    },

    {
      content: (
        <Signup_3_Details
          mainstep={mainstep}
          setMainStep={setMainStep}
          // current={signup3Current}
          // setCurrent={setSignup3Current}
          lng={lng}
          t={trans}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
        />
      ),
    },

    {
      content: (
        <Signup_4_Details
          mainstep={mainstep}
          setMainStep={setMainStep}
          // current={setSignup4Current}
          // setCurrent={setSignup4Current}
          lng={lng}
          t={trans}
          updateMainStepFromChild={updateMainStepFromChild}
          updateMainPreviousFromChild={updateMainPreviousFromChild}
        />
      ),
    },
  ];

  return (
    trans && (
      <>
        <LoadingTimer setIsLoading={setIsLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <StepsRow className="step1_row items-stretch" gutter={[32, 32]}>
            <Col
              className="gutter-row  bg-primary bg-small-screen radius md:mt-4 lg:ml-4 md:p-8"
              xs={24}
              md={24}
              lg={5}
            >
              <div className="steps_internal lg:fixed">
                <Image className="mt-8 mb-4" src={dochyve_yellow} alt="doc" />
                <StepsComponent t={trans} lng={lng} mainstep={mainstep} />
              </div>
            </Col>

            <Col xs={24} md={24} lg={12}>
              <div>{steps[mainstep]?.content}</div>
            </Col>
          </StepsRow>
        )}
      </>
    )
  );
}

export default Signup_1_Page;
