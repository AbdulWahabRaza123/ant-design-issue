/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import { Col } from "antd";
import "../../Home/Combined_Components/HomePage.css";
import Loader from "../../Spinner/Loader";
import LoadingTimer from "../../Loader/LoadingTimer";
import { useTranslation } from "../../../../i18n/index";
import AdminRow from "../../CustomComponents/AdminRow";
import "./DashboardComp/Welcome";
import Welcome from "./DashboardComp/Welcome";
import DoctorSelect from "./DashboardComp/DoctorSelect";
import DoctorList from "./DashboardComp/DoctorList";
import CustomCalendar from "./DashboardComp/Calendar";
import PatientRecord from "./DashboardComp/PatientRecord";
import PatientMix from "./DashboardComp/PatientMix";

function DashboardPage({ lng }) {
  const [lang, setLang] = useState("");
  const [trans, setTrans] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const load = async (lang) => {
  //   const { t } = await useTranslation(lang === "en" ? "en" : "es", "signup");
  //   return t;
  // };

  useEffect(() => {
    setTrans(null);
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const languageCode = url;
    setLang(languageCode);
    localStorage.setItem("lng", languageCode);
  }, []);
  useEffect(() => {
    // setIsLoading(true);
    if (lang) {
      load(lang)
        .then(async (f) => {
          setTrans(() => {
            return f;
          });
        })
        .catch((e) => {});
    }
    // setIsLoading(false);
  }, [lang]);

  const load = async () => {
    const { t } = await useTranslation(lng, "dashboard");
    return t;
  };
  // useEffect(() => {
  //   load()
  //     .then(async (f) => {
  //       setTrans(() => {
  //         return f;
  //       });
  //     })
  //     .catch((e) => {

  //     });
  // }, []);
  const onChange = (key) => {};

  return (
    trans && (
      <>
        <LoadingTimer setIsLoading={setIsLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="p-3 md:p-8 boundary mt-4">
              <AdminRow gutter={[32, 16]}>
                <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                  <div className="">
                    <Welcome />
                    <DoctorSelect />
                    <DoctorList />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                  <PatientRecord />
                  <CustomCalendar />
                </Col>

                <Col className="" xs={24} sm={24} md={24} lg={24} xl={24}>
                  <PatientMix />
                </Col>
              </AdminRow>
            </div>
          </>
        )}
      </>
    )
  );
}

export default DashboardPage;
