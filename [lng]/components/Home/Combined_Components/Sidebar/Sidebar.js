import React, { useEffect, useState } from "react";
// import sidebarlogo from "../svgs/sidebar-logo.svg";
import Home from "../../../../../../../public/admin/images/home.svg";
import Dashboard from "../../../../../../../public/admin/images/dashboard.svg";
import Appointments from "../../../../../../../public/admin/images/appointments.svg";
import Patients from "../../../../../../../public/admin/images/patients.svg";
import Reports from "../../../../../../../public/admin/images/reports.svg";
import Providers from "../../../../../../../public/admin/images/providers.svg";
import Manage_Doctors from "../../../../../../../public/admin/images/manage-doctors.svg";
import Authentication from "../../../../../../../public/admin/images/authentication.svg";
import Medical_Billing from "../../../../../../../public/admin/images/medical-billing.svg";
import Credentialing from "../../../../../../../public/admin/images/credentialing.svg";
import Insurance from "../../../../../../../public/admin/images/insurance.svg";
import Tickets from "../../../../../../../public/admin/images/tickets.svg";
import Help_Desk from "../../../../../../../public/admin/images/Help Desk.svg";
import Logout from "../../../../../../../public/admin/images/Logout.svg";
import blue_arrowup from "../../../../../../../public/admin/images/blue-arrowup.svg";
import blue_arrowdown from "../../../../../../../public/admin/images/blue-arrowdown.svg";
import dochyve from "../../../../../../../public/admin/images/home_logo.svg";
import "./Sidebar.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sidebar({ t }) {
  const { push } = useRouter();
  const [published, setPublished] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);

  const [lng, setLng] = useState("en");

  const handleCardClick = () => {
    setClicked(!clicked);
  };
  const handleCardClick2 = () => {
    setClicked2(!clicked2);
  };
  const handleCardClick3 = () => {
    setClicked3(!clicked3);
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const languageCode = url.pathname.split("/")[1];
    console.log("This is lang in sidebar ", languageCode);
    setLng(languageCode);
    localStorage.setItem("lng", languageCode);
  }, []);

  return (
    <div className="sidebar-main-div p-3">
      <div className="mb-16 mt-8">
        <Link href="">
          <Image src={dochyve} width={185} height={31} alt="Logo" />
        </Link>
      </div>
      <div>
        <ul className="p-0 text-sm">
          <Link href={`/${lng}/admin/home`}>
            <li className="flex items-center rounded-md  mb-8 ">
              <Image
                className="mr-3"
                src={Home}
                width={24}
                height={24}
                alt="Home"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.home")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href={`/${lng}/admin/dashboard`}>
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Dashboard}
                width={24}
                height={24}
                alt="Dashboard"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.dashboard")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href={`/${lng}/admin/notifications/appointment`}>
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Appointments}
                width={24}
                height={24}
                alt="Appointments"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.appointments")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href={`/${lng}/admin/patients`}>
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Patients}
                width={24}
                height={24}
                alt="Patients"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.patients")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm mb-8">
          <Link href="">
            <li
              className="flex items-center rounded-md mb-2"
              onClick={handleCardClick}
            >
              <Image
                className="mr-3"
                src={Reports}
                width={24}
                height={24}
                alt="Reports"
              />
              <div className="flex justify-between">
                <span className="sidebar-text fw-500 fs-16 font-fam text-primary mr-12">
                  {t("sidebar.reports")}
                </span>
                <Image
                  src={clicked ? blue_arrowdown : blue_arrowup}
                  width={15}
                  height={15}
                  className=""
                  alt="img"
                />
              </div>
            </li>
            {clicked && (
              <div className="">
                <li className="sidebar-text fw-500 fs-16 font-fam text-primary ml-9">
                  {t("sidebar.all_reports")}
                </li>
                <li className="sidebar-text fw-500 fs-16 font-fam text-primary ml-9">
                  {t("sidebar.patient_reports")}
                </li>
              </div>
            )}
          </Link>
        </ul>

        <ul className="p-0 text-sm mb-8">
          <Link href="">
            <li
              className="flex items-center  rounded-md mb-2"
              onClick={handleCardClick2}
            >
              <Image
                className="mr-3"
                src={Providers}
                width={24}
                height={24}
                alt="Providers"
              />
              <div className="flex justify-between">
                <span className="sidebar-text fw-500 fs-16 font-fam text-primary mr-9">
                  {t("sidebar.providers")}
                </span>
                <Image
                  src={clicked2 ? blue_arrowdown : blue_arrowup}
                  width={15}
                  height={15}
                  className=""
                  alt="img"
                />
              </div>
            </li>
            {clicked2 && (
              <div className="">
                <li className="sidebar-text fw-500 fs-16 font-fam text-primary ml-9">
                  {t("sidebar.manage_doctors")}
                </li>
                <li className="sidebar-text fw-500 fs-16 font-fam text-primary ml-9">
                  {t("sidebar.manage_scheduling")}
                </li>
              </div>
            )}
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href="">
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Authentication}
                width={24}
                height={24}
                alt="Authentication"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.authentication")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm mb-8">
          <Link href="">
            <li
              className="flex items-center rounded-md mb-2"
              onClick={handleCardClick3}
            >
              <Image
                className="mr-3"
                src={Medical_Billing}
                width={24}
                height={24}
                alt="Medical_Billing"
              />
              <div className="flex justify-between">
                <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                  {t("sidebar.medical_billing")}
                </span>
                <Image
                  src={clicked3 ? blue_arrowdown : blue_arrowup}
                  width={15}
                  height={15}
                  className=""
                  style={{ marginLeft: "10px" }}
                  alt="img"
                />
              </div>
            </li>
            {clicked3 && (
              <div className="">
                <li className="sidebar-text fw-500 fs-16 font-fam text-primary ml-9">
                  {t("sidebar.daily_charges")}
                </li>
                <li className="sidebar-text fw-500 fs-16 font-fam text-primary ml-9">
                  {t("sidebar.pending_claims")}
                </li>
              </div>
            )}
          </Link>
        </ul>

        {/* <ul className="p-0 text-sm">
          <Link href="">
            <li className="flex items-center rounded-md mb-8">
              <Image className="mr-3" src={Medical_Billing} width={24} height={24} alt="Medical_Billing" />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">{t('sidebar.medical_billing')}</span>
            </li>
          </Link>
        </ul> */}

        <ul className="p-0 text-sm">
          <Link href="">
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Credentialing}
                width={24}
                height={24}
                alt="Credentialing"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.credentialing")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href="">
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Insurance}
                width={24}
                height={24}
                alt="Insurance"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.insurance")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href="">
            <li className="flex items-center rounded-md mb-32 ">
              <Image
                className="mr-3"
                src={Tickets}
                width={24}
                height={24}
                alt="Tickets"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.tickets")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0  mt-16">
          <Link href="">
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Help_Desk}
                width={24}
                height={24}
                alt="Help Desk"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.help_desk")}
              </span>
            </li>
          </Link>
        </ul>

        <ul className="p-0 text-sm">
          <Link href="">
            <li className="flex items-center rounded-md mb-8 ">
              <Image
                className="mr-3"
                src={Logout}
                width={24}
                height={24}
                alt="Help Desk"
              />
              <span className="sidebar-text fw-500 fs-16 font-fam text-primary">
                {t("sidebar.logout")}
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
