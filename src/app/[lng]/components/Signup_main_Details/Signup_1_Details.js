"use client";
import "./Signup_1_Details.css";
import SubSteps from "../Sub_Steps/Sub_Steps";
import Signup_1_Fields from "./Signup_1_Fields";
import Signup_2_Fields from "./Signup_2_Fields";
import { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Select } from "antd";

import { useSearchParams } from "next/navigation";
import Signup_3_Fields from "./Signup_3_Fields";
import Signup_4_Fields from "./Signup_4_Fields";
import { useRouter } from "next/navigation";
import Image from "next/image";
import usa from "../../../../../public/usa.svg";
import spain from "../../../../../public/spain.svg";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup1Current } from "../redux/features/signupStates";
const Signup_1_Details = ({ t, lng, updateMainStepFromChild, mainstep }) => {
  const { push } = useRouter();

  const [showImageAndText, setShowImageAndText] = useState(true);
  const searchParams = useSearchParams();

  // const [search, setSearch] = useState(0);
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const [mySubStep, setMySubStep] = useState(0);

  useEffect(() => {
    setMySubStep(signupStates.signup1Current);
  }, [signupStates.signup1Current]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const main = urlParams.get("mainstep");
    const substep = urlParams.get("substep");
    if (!substep) {
      push(`/${lng}/signup-step?mainstep=${main}&substep=${0}`);
      dispatch(setSignup1Current(0));
    }
  }, []);

  const updatNexttStepFromChild = (value) => {
    const temp = parseInt(mySubStep) + 1;
    push(`/${lng}/signup-step?mainstep=${mainstep}&substep=${temp}`);
    dispatch(setSignup1Current(temp));
  };

  const steps = [
    {
      content: (
        <Signup_1_Fields
          showImageAndText={showImageAndText}
          //   current={current}
          //   setCurrent={setCurrent}
          lng={lng}
          updatNexttStepFromChild={updatNexttStepFromChild}
          t={t}
          mainstep={mainstep}
        />
      ),
    },

    {
      content: (
        <Signup_2_Fields
          //   current={current}
          //   setCurrent={setCurrent}
          lng={lng}
          updatNexttStepFromChild={updatNexttStepFromChild}
          t={t}
          mainstep={mainstep}
        />
      ),
    },

    {
      content: (
        <Signup_3_Fields
          //   current={current}
          //   setCurrent={setCurrent}
          lng={lng}
          updatNexttStepFromChild={updatNexttStepFromChild}
          t={t}
          mainstep={mainstep}
        />
      ),
    },

    {
      content: (
        <Signup_4_Fields
          //   current={current}
          //   setCurrent={setCurrent}
          lng={lng}
          updateMainStepFromChild={updateMainStepFromChild}
          updatNexttStepFromChild={updatNexttStepFromChild}
          t={t}
          mainstep={mainstep}
        />
      ),
    },
  ];

  const handleLanguageChange = (lng) => {
    push(
      `/${lng}/signup-step?mainstep=${parseInt(mainstep)}&substep=${parseInt(
        mySubStep
      )}`
    );
  };

  const options = [
    {
      value: "en",
      label: (
        <div className="flex select-icons gap-2">
          <Image alt="english" src={usa} width={20} height={20}></Image>
          {t("switch_lanuage.en")}
        </div>
      ),
    },
    {
      value: "es",
      label: (
        <div className="flex select-icons gap-2">
          <Image alt="spanish" src={spain} width={20} height={20}></Image>{" "}
          {t("switch_lanuage.es")}
        </div>
      ),
    },
  ];

  return (
    <div className="h-100">
      <div className="flex  justify-end items-center">
        <Select
          className="language-select md:w-56"
          value={lng}
          options={options}
          onChange={handleLanguageChange}
        ></Select>
      </div>
      <div>
        {steps[mySubStep]?.content}
        <SubSteps
          //  current={signupStates.signup1Current}
          steps={3}
        />
      </div>
    </div>
  );
};

export default Signup_1_Details;
