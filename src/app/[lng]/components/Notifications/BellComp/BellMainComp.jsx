"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../../../../i18n/index";
import AdminRow from "../../CustomComponents/AdminRow";
import LoadingTimer from "../../Loader/LoadingTimer";
import Loader from "../../Spinner/Loader";
import "../../Home/Combined_Components/HomePage.css";
const MyNotifyComp = ({ t, notify }) => {
  useEffect(() => {
    // console.log("Translation Function:", t);
    // console.log("Translation Key:", "signup_substep2.enter_state");
    // console.log("Translated Text:", t("signup_substep2.enter_state"));
  }, [t]);
  return (
    <div
      style={{ borderBottom: "1px solid #D2D2D2" }}
      className="flex flex-row align-items-center gap-2 p-8"
    >
      <Image
        style={{ borderRadius: "50%" }}
        src={notify.profile}
        alt={"profile"}
        width={70}
        height={100}
      />

      <div className="flex flex-col align-items-start">
        {/* <p className="leading-5">{t("signup_substep2.enter_state")}</p> */}
        <label className="lh-24 fw-500">{notify.desc}</label>
        <label className="lh-24 fw-500">{notify.time}</label>
      </div>
    </div>
  );
};

const BellMainComp = () => {
  const [lng, setLng] = useState("");
  const [trans, setTrans] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const load = async (lang) => {
    const { t } = await useTranslation(lang === "en" ? "en" : "es", "signup");
    return t;
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const languageCode = url.pathname.split("/")[1];
    setLng(languageCode);
    localStorage.setItem("lng", languageCode);
  }, []);
  useEffect(() => {
    if (lng) {
      load(lng)
        .then(async (f) => {
          setTrans(() => {
            return f;
          });
        })
        .catch((e) => {});
    }
  }, [lng]);
  const myData = [
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
    {
      profile: "/admin/images/doctor1.svg",
      desc: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
      time: "2 sec ago",
    },
  ];

  return (

    trans && (
      <>
        <LoadingTimer setIsLoading={setIsLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <AdminRow gutter={[16, 16]}>
            <div
              style={{
                background: "#fff",
                width:"100%"
              }}
            >
              <div
                style={{
                  height: "90vh",
                  width: "100%",
                  overflowY: "auto",
                }}
                className="p-8 boundary mt-4"
              >
                <div>
                  <h2 className="fs-28 font-fam fw-700">Notifications</h2>
                </div>
                <div className="flex flex-col" style={{
                  background: "#fff",
                  borderRadius:"8px"
                }}>
                  {trans &&
                    myData.map((notify, index) => (
                      <MyNotifyComp key={index} t={trans} notify={notify} />
                    ))}
                </div>
              </div>
            </div>
          </AdminRow>
        )}
      </>
    )
  );
};

export default BellMainComp;
