"use client";
import React, { useState, useEffect } from "react";
import { Col } from "antd";
import AboutDochyve from "../Dochyve/AboutDochyve";
import AccountDetails from "../Account_Details/AccountDetails";
import CustomRow from "../CustomComponents/CustomRow";
import "./SigninPage.css";
import Loader from "../Spinner/Loader";
import LoadingTimer from "../Loader/LoadingTimer";
import { useTranslation } from "../../../i18n";
function SignupRegister({ lng }) {
  const [isLoading, setIsLoading] = useState(true);
  const [trans, setTrans] = useState(null);

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
      .catch((e) => {
      });
  }, []);

  return (
    trans && (
      <>
        <LoadingTimer setIsLoading={setIsLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <CustomRow gutter={[32, 32]}>
            <Col className="gutter-row  pt-4" xs={24} md={12} lg={12}>
              <AboutDochyve t={trans} />
            </Col>
            <Col xs={24} md={12} lg={12}>
              <AccountDetails t={trans} lng={lng} />
            </Col>
          </CustomRow>
        )}
      </>
    )
  );
}

export default SignupRegister;
