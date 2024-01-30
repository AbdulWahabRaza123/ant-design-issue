"use client";

import React, { useEffect, useState } from "react";
import Layout from "./BasicLayout";
import SmallLayout from "./SmallLayout";
import "./layout.css";
import ScreenWidth from "../../[lng]/admin/common/ScreenWidth";
import { useTranslation } from "../../../app/i18n/index";
import { Footer } from "../components/Footer";

export default function MainLayout({ children }) {
  const [lang, setLang] = useState("");
  const [trans, setTrans] = useState(null);
  const width = ScreenWidth();
  const load = async (lang) => {
    const { t } = await useTranslation(lang, "dashboard");
    return t;
  };

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
          console.log("This is f ", f);
          setTrans(() => {
            return f;
          });
        })
        .catch((e) => {});
    }
  }, [lang]);
  if (!trans || !lang) {
    return;
  }
  return (
    <>
      {width > 1400 ? (
        <>
          <Layout lng={lang} t={trans}>
            {children}
          </Layout>
          {/* <Footer/> */}
        </>
      ) : (
        <>
          <SmallLayout lng={lang} t={trans}>
            {children}
          </SmallLayout>
        </>
      )}
    </>
  );
}
