/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import { Col } from "antd";
import "../../Home/Combined_Components/HomePage.css";
import Loader from "../../Spinner/Loader";
import LoadingTimer from "../../Loader/LoadingTimer";
import { useTranslation } from "../../../../i18n/index";
import AdminRow from "../../CustomComponents/AdminRow";
import PatientData from "./PatientComp/PatientData";
import PatientSelect from "./PatientComp/PatientSelect";
//  import Patient from "./DashboardComp/DoctorSelect";
import PatientRecord from "../../Dashboard/Combined_Components/DashboardComp/PatientRecord";
import CustomCalendar from "../../Dashboard/Combined_Components/DashboardComp/Calendar";
import PatientList from "../../Patient/Combined_Components/PatientComp/PatientList";
import PatientMix from "../../Dashboard/Combined_Components/DashboardComp/PatientMix";
// import DoctorList from "./DashboardComp/DoctorList";
// import CustomCalendar from "./DashboardComp/Calendar";
// import PatientRecord from "./DashboardComp/PatientRecord";
// import PatientMix from "./DashboardComp/PatientMix";

function PatientPage({ lng }) {
  const [lang, setLang] = useState("");
  const [trans, setTrans] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const load = async (lang) => {
  //   const { t } = await useTranslation(lang === "en" ? "en" : "es", "signup");
  //   return t;
  // };

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const languageCode = url.pathname.split("/")[1];
    setLang(languageCode);
    localStorage.setItem("lng", languageCode);
  }, []);
  useEffect(() => {
    if (lang) {
      load(lang)
        .then(async (f) => {
          setTrans(() => {
            return f;
          });
        })
        .catch((e) => {});
    }
  }, [lang]);

  const load = async () => {
    const { t } = await useTranslation(lng, "dashboard");
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

  const onChange = (key) => {};
  useEffect(() => {
    console.log("This is lang ", lng);
    console.log("This is t ", trans);
  }, []);
  if (!lng || !trans) {
    return;
  }
  return (
    trans && (
      <>
        <LoadingTimer setIsLoading={setIsLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="p-8 boundary mt-4">
            <AdminRow gutter={[32, 16]}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <div className="">
                  <PatientData />
                  <PatientSelect />
                  <PatientList t={trans} lng={lng} />
                </div>
              </Col>

              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <PatientRecord />
                <CustomCalendar />
              </Col>

              <Col className="" xs={24} sm={24} md={24} lg={24} xl={24}>
                {/* <PatientMix /> */}
              </Col>
            </AdminRow>
          </div>
        )}
      </>
    )
  );
}

export default PatientPage;
