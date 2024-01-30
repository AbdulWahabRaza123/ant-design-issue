"use client";
import React, { useState, useEffect } from "react";
import Bell from "./Bell";
import Appointment from "./Appointment";
import Profile from "./Profile";
import Wallet from "./Wallet";
import Image from "next/image";
import usa from "../../../../../../../public/usa.svg";
import spain from "../../../../../../../public/spain.svg";
import { Col, Row, Select } from "antd";
import Feature from "./Feature";
import SearchFilter from "../HomeComp/SearchFilter";
import "./SelectionBar.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function SelectionBar({
  t,
  lng,
  sidebarVisible,
  filterVisible,
}) {
  const [firstBellVisible, setFirstBellVisible] = useState(true);
  const [secondBellVisible, setSecondBellVisible] = useState(true);
  const [openNotifyBell, setOpenNotifyBell] = useState(false);
  const [openNotifyAppoint, setOpenNotifyAppoint] = useState(false);
  const { push } = useRouter();
  const router = useRouter();
  const currentUrl = router;
  const pathname = usePathname();
  let path = pathname;
  // let pathArray = path.split('/').slice(1);
  let modifiedPath = pathname;

  const toggleFirstBell = () => {
    setFirstBellVisible(!firstBellVisible);
    setSecondBellVisible(true);
  };

  const toggleSecondBell = () => {
    setSecondBellVisible(!secondBellVisible);
    setFirstBellVisible(true);
  };
  // if (!lng || !t || !usa) {
  //   return;
  // }
  const options = [
    {
      key: "en-opt",
      value: "en",
      label: (
        <div className="flex select-icons gap-2">
          <Image src={usa} alt="english" width={20} height={20} />
          {t("switch_lanuage.en")}
        </div>
      ),
      // label: t("switch_lanuage.en"),
    },
    {
      key: "es-opt",
      value: "es",
      label: (
        <div className="flex select-icons gap-2">
          <Image src={spain} alt="spanish" width={20} height={20} />
          {t("switch_lanuage.es")}
        </div>
      ),
      // label: t("switch_lanuage.es"),
    },
  ];
  function toggleLanguage(path) {
    const langToReplace = path.includes("/en/") ? "en" : "es";
    const targetLang = langToReplace === "en" ? "es" : "en";

    // Replace the first occurrence of the current language with the target language
    const updatedPath = path.replace(`/${langToReplace}/`, `/${targetLang}/`);

    return updatedPath;
  }
  const handleLanguageChange = (lng) => {
    let previousLang = localStorage.getItem("i18nextLng");
    console.log("this is prev lang ", previousLang, " new lang ", lng);
    console.log("This is modified path ", modifiedPath);
    // let abc = modifiedPath.replace(`/${previousLang}` + `/${lng}`);
    const abc = toggleLanguage(modifiedPath);
    console.log("This is modified path after modification ", abc);

    localStorage.setItem("i18nextLng", lng);
    return push(`${abc}`);
  };
  useEffect(() => {
    console.log("This is lng in nav", lng);
  }, [lng]);

  return (
    <Row className="mt-4 ">
      <Col className="" xs={12} md={12} lg={12}>
        <div className="header-container flex justify-between">
          <div className="flex">
            {filterVisible && (
              <div className="flex">
                <SearchFilter />
              </div>
            )}
          </div>
        </div>
      </Col>
      <Col
        className="tablet-selectionbar"
        xs={24}
        md={12}
        lg={12}
        style={{ zIndex: 999, display: "flex", justifyContent: "end" }}
      >
        <div className="flex  mt-2">
          {lng && (
            <Select
              key={lng}
              defaultValue={"en"}
              value={lng}
              className="language-select md:w-56"
              options={options}
              onChange={handleLanguageChange}
            ></Select>
          )}

          <div>
            <Feature />
          </div>

          <div
            className="mt-4"
            // style={{
            //   height: "40px",
            //   width: "67px",
            // }}
          >
            <Wallet t={t} lng={lng} />
          </div>

          <div
            className="mt-1"
            // style={{
            //   height: "40px",
            //   width: "67px",
            // }}
          >
            <Appointment
              onToggle={toggleSecondBell}
              showDropdown={openNotifyAppoint}
              setShowDropdown={setOpenNotifyAppoint}
              showDropdown2={openNotifyBell}
              setShowDropdown2={setOpenNotifyBell}
            />
          </div>

          <div className="mt-1">
            <Bell
              t={t}
              lng={lng}
              showDropdown={openNotifyBell}
              setShowDropdown={setOpenNotifyBell}
              showDropdown2={openNotifyAppoint}
              setShowDropdown2={setOpenNotifyAppoint}
            />
          </div>

          <div
            className="mt-4"
            // style={{
            //   height: "40px",
            //   width: "67px",
            // }}
          >
            <Profile t={t} lng={lng} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
