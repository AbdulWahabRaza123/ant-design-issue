import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import "./Steps.css";
import user_step1 from "../../../../../public/user_step1.svg";
import user_step1_gold from "../../../../../public/user-step1_gold.svg";
import user_mobile from "../../../../../public/user_mobile.svg";
import user_gray from "../../../../../public/user_mobile_gray.svg";
import practice_billing from "../../../../../public/practice_billing.svg";
import practice_billing_gold from "../../../../../public/practice_billing_gold.svg";
import billing_gray from "../../../../../public/billing_gray.svg";
import billing_mobile from "../../../../../public/billing_mobile.svg";
import payment_info from "../../../../../public/payment_info.svg";
import payment_gold from "../../../../../public/payment_gold.svg";
import payment_mobile from "../../../../../public/payment_mobile.svg";
import payment_gray from "../../../../../public/payment_gray.svg";
import schedule from "../../../../../public/schedule_demo.svg";
import schedule_gray from "../../../../../public/schedule_gray.svg";
import schedule_mobile from "../../../../../public/schedule_mobile.svg";
import Image from "next/image";
const StepsComponent = ({ t, mainstep }) => {
  let step_1_icon;
  let step_1_title = "font-fam fs-14 fw-700 text-white";
  let step_2_icon;
  let step_2_title = "font-fam fs-14 fw-700 text-white";
  let step_3_icon;
  let step_3_title = "font-fam fs-14 fw-700 text-white";
  let step_4_icon;
  let step_4_title = "font-fam fs-14 fw-700 text-white";

  if (mainstep == 1) {
    step_1_icon = user_step1;
    step_2_icon = practice_billing;
    step_3_icon = payment_info;
    step_4_icon = schedule;
  }

  if (mainstep == 2) {
    step_1_icon = user_step1_gold;
    step_1_title = "font-fam fs-14 fw-700 text-golden";
    step_2_icon = practice_billing;
    step_3_icon = payment_info;
    step_4_icon = schedule;
  }

  if (mainstep == 3) {
    step_1_icon = user_step1_gold;
    step_1_title = "font-fam fs-14 fw-700 text-golden";
    step_2_icon = practice_billing_gold;
    step_2_title = "font-fam fs-14 fw-700 text-golden";
    step_3_icon = payment_info;
    step_4_icon = schedule;
  }

  if (mainstep == 4) {
    step_1_icon = user_step1_gold;
    step_1_title = "font-fam fs-14 fw-700 text-golden";
    step_2_icon = practice_billing_gold;
    step_2_title = "font-fam fs-14 fw-700 text-golden";
    step_3_icon = payment_gold;
    step_3_title = "font-fam fs-14 fw-700 text-golden";
    step_4_icon = schedule;
  }

  const stepsData = [
    {
      title: (
        <span className={step_1_title}>{t("signup_step1.title_one")}</span>
      ),
      description: (
        <span className="font-fam fw-400 text-white fs-16">
          {" "}
          {t("signup_step1.description_one")}
        </span>
      ),
      icon: <Image src={step_1_icon} alt="doc" />,
    },
    {
      title: (
        <span className={step_2_title}>{t("signup_step1.title_two")}</span>
      ),
      description: (
        <span className="font-fam fw-400 text-white fs-16">
          {t("signup_step1.description_two")}
        </span>
      ),
      icon: <Image src={step_2_icon} alt="doc" />,
    },
    {
      title: (
        <span className={step_3_title}>{t("signup_step1.title_four")}</span>
      ),
      description: (
        <span className="font-fam fw-400 text-white fs-16">
          {t("signup_step1.description_four")}
        </span>
      ),
      icon: <Image src={step_3_icon} alt="doc" />,
    },
    {
      title: (
        <span className="font-fam fs-14 fw-700 text-white">
          {t("signup_step1.title_five")}
        </span>
      ),
      icon: <Image src={step_4_icon} alt="doc" />,
    },
  ];

  let responsive_1_icon;
  let responsive_1_title = "font-fam fs-14 fw-700 black";
  let responsive_2_icon;
  let responsive_2_title = "font-fam fs-14 fw-700 ";
  let responsive_3_icon;
  let responsive_3_title = "font-fam fs-14 fw-700";
  let responsive_4_icon;
  let responsive_4_title = "font-fam fs-14 fw-700";

  if (mainstep == 1) {
    responsive_1_icon = user_gray;
    responsive_2_icon = billing_gray;
    responsive_3_icon = payment_gray;
    responsive_4_icon = schedule_gray;
  }

  if (mainstep == 2) {
    responsive_1_icon = user_mobile;
    step_1_title = "font-fam fs-14 fw-700 text-golden";
    responsive_2_icon = billing_gray;
    responsive_3_icon = payment_gray;
    responsive_4_icon = schedule_gray;
  }

  if (mainstep == 3) {
    responsive_1_icon = user_mobile;
    step_1_title = "font-fam fs-14 fw-700 text-golden";
    responsive_2_icon = billing_mobile;
    step_2_title = "font-fam fs-14 fw-700 text-golden";
    responsive_3_icon = payment_gray;
    responsive_4_icon = schedule_gray;
  }

  if (mainstep == 4) {
    responsive_1_icon = user_mobile;
    step_1_title = "font-fam fs-14 fw-700 text-golden";
    responsive_2_icon = billing_mobile;
    step_2_title = "font-fam fs-14 fw-700 text-golden";
    responsive_3_icon = payment_mobile;
    step_3_title = "font-fam fs-14 fw-700 text-golden";
    responsive_4_icon = schedule_gray;
  }

  const horizontalstepsData = [
    {
      icon: (
        <div>
          <Image src={responsive_1_icon} />
        </div>
      ),
      title: (
        <div className="font-fam responsive-title fs-14 fw-700 ">
          {t("signup_step1.title_one")}
        </div>
      ),
    },
    {
      icon: (
        <div>
          <Image src={responsive_2_icon} alt="doc" />
        </div>
      ),
      title: (
        <div className="font-fam responsive-title fs-14 fw-700 ">
          {t("signup_step1.title_two")}
        </div>
      ),
    },
    {
      icon: (
        <div>
          <Image src={responsive_3_icon} alt="doc" />
        </div>
      ),
      title: (
        <div className="font-fam responsive-title fs-14 fw-700">
          {" "}
          {t("signup_step1.title_four")}
        </div>
      ),
    },
    {
      icon: (
        <div>
          <Image src={responsive_4_icon} alt="doc" />
        </div>
      ),
      title: (
        <div className="font-fam responsive-title fs-14 fw-700">
          {t("signup_step1.title_five")}
        </div>
      ),
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 576 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576);
    };

    // Check if window is defined before adding event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      // Check if window is defined before removing event listener
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="background-div">
      {isSmallScreen && (
        <Steps
          direction="horizontal"
          className="horizontal-steps"
          responsive={false}
          items={horizontalstepsData}
          current={parseInt(mainstep)}
          initial={1}
          status="process"
        />
      )}
      {!isSmallScreen && (
        <Steps
          direction="vertical"
          // mainstep={mainstep}
          items={stepsData}
          current={parseInt(mainstep)}
          initial={1}
          status="process"
        />
      )}
    </div>
  );
};

export default StepsComponent;
