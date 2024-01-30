/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import { Col, Modal } from "antd";
import { Space } from "antd";
import { Tag } from "antd";
import { UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import Image from "next/image";
// import "./HomePage.css";
import Loader from "../../Spinner/Loader";
import LoadingTimer from "../../Loader/LoadingTimer";
import { useTranslation } from "../../../../i18n/index";
import Layout from "../../../layout";
import { Tabs } from "antd";
import PatientProfile from "../../Patient/Combined_Components/PatientComp/PatientProfile";
import AdminRow from "../../CustomComponents/AdminRow";
import more_actions from "../../../../../../public/admin/images/more-actions.svg"
import add_provider from "../../../../../../public/admin/images/add-provider.svg"
import Signup_1_Fields from "../../Signup_main_Details/Signup_1_Fields";
import { specificModal, removeSpecificModal, addSpecificModal } from "../../redux/features/modalUiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSpecificComponentInModal } from "../../redux/features/modalUiSlice";
const myAllData = [
  {
    key: "1",
    name: <span className="font-fam fw-500">Ethan Johnson ,Male, 32y</span>,
    phone: <span className="font-fam fw-500">John</span>,
    appointment: <span className="font-fam fw-500">Brown</span>,
    center: <span className="font-fam fw-500">PA</span>,
    speciality: <span className="font-fam fw-500">CA</span>,
    tags: ["In Process"],
  },
  {
    key: "2",
    name: <span className="font-fam fw-500">Ethan Johnson ,Male, 32y</span>,
    phone: <span className="font-fam fw-500">Michael</span>,
    appointment: <span className="font-fam fw-500">Davis</span>,
    center: <span className="font-fam fw-500">DMD</span>,
    speciality: <span className="font-fam fw-500">ENT</span>,
    tags: ["Verified"],
  },
  {
    key: "3",
    name: <span className="font-fam fw-500">Ethan Johnson ,Male, 32y</span>,
    phone: <span className="font-fam fw-500">Jessica</span>,
    appointment: <span className="font-fam fw-500">Wilson</span>,
    center: <span className="font-fam fw-500">PT</span>,
    speciality: <span className="font-fam fw-500">OB/GYN</span>,
    tags: ["Update Profile"],
  },

  {
    key: "4",
    name: <span className="font-fam fw-500">Ethan Johnson ,Male, 32y</span>,
    phone: <span className="font-fam fw-500">John</span>,
    appointment: <span className="font-fam fw-500">Brown</span>,
    center: <span className="font-fam fw-500">PA</span>,
    speciality: <span className="font-fam fw-500">CA</span>,
    tags: ["Need Attention"],
  },
  {
    key: "5",
    name: <span className="font-fam fw-500">Ethan Johnson ,Male, 32y</span>,
    phone: <span className="font-fam fw-500">John</span>,
    appointment: <span className="font-fam fw-500">Brown</span>,
    center: <span className="font-fam fw-500">PA</span>,
    speciality: <span className="font-fam fw-500">CA</span>,
    tags: ["In Process"],
  },
  {
    key: "6",
    name: <span className="font-fam fw-500">Ethan Johnson ,Male, 32y</span>,
    phone: <span className="font-fam fw-500">John</span>,
    appointment: <span className="font-fam fw-500">Brown</span>,
    center: <span className="font-fam fw-500">PA</span>,
    speciality: <span className="font-fam fw-500">CA</span>,
    tags: ["Verified"],
  },

];
function filterDataByTag(data, tagToFilter) {
  return data.filter((item) => item.tags.includes(tagToFilter));
}
function HomePage({ lng }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allProviders, setAllProviders] = useState([]);
  const [activeProviders, setActiveProviders] = useState([]);
  const [inActiveProviders, setInActiveProviders] = useState([]);
  const [pendingProviders, setPendingProviders] = useState([]);
  const [lang, setLang] = useState("");
  const [trans, setTrans] = useState(null);

  const dispatch = useAppDispatch();
  const modalUi = useAppSelector((states) => states.modalStates);

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
        .catch((e) => { });
    }
  }, [lang]);

  const load = async () => {
    const { t } = await useTranslation(lng, "signup");
    return t;
  };
  useEffect(() => {
    load()
      .then( async (f) => {
        setTrans(() => {
          return f;
        });
      })
      .catch((e) => {
       
      }); 
  }, []);

 
  useEffect(() => {
    const myInProgressData = filterDataByTag(myAllData, "In Process");
    setPendingProviders(myInProgressData);
    const myActiveData = filterDataByTag(myAllData, "Verified");
    setActiveProviders(myActiveData);
    const myInActiveData = filterDataByTag(myAllData, "Need Attention");
    setInActiveProviders(myInActiveData);
  }, []);
  const onChange = (key) => {
    // console.log(key);
  };
  const myTags = ["In Process", "Verified", "Update Profile", "Need Attention"];
  const columns = [
    {
      title: <label>Name</label>,
      dataIndex: "name",
      key: "name",
     
    },
    {
      title: <label>Phone Number</label>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <label>Appointment Time</label>,
      dataIndex: "appointment",
      key: "appointment",
    },

    {
      title: <label>Health Center</label>,
      dataIndex: "center",
      key: "center",
    },
    {
      title: <label>Speciality</label>,
      dataIndex: "speciality",
      key: "speciality",
    },

    {
      title: <label>Status</label>,
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            var color = "";
            var bg = "";
            if (tag === "In Process") {
              color = "#2E448C";
              bg = "#EFF0F5";
            } else if (tag === "Verified") {
              bg = "#ECFDF3";
              color = "#39C481";
            } else if (tag === "Update Profile") {
              bg = "#FEF7E6";
              color = "#FEBF35";
            } else {
              bg = "#FFF0F3";
              color = "#A90000";
            }
            return (
              <>
                <Tag
                  key={tag}
                  style={{
                    background: bg,
                    color: color,
                    // width: "110px",
                    height: "30px",
                    padding: "18px"
                  }}
                  className="p-3 rounded-2xl fw-600 border-0 font-fam flex flex-row align-center justify-center m-0 text-center"
                >
                  {tag}
                </Tag>
              </>
            );
          })}
        </>
      ),
    },

    {
      title: <label>Actions</label>,
      key: "action",
      render: (_, record) => (
        <Space size="">
          <Image
            className="me-3"
            src={more_actions}
            width={18}
            height={18}
            alt="action"

          />
          <Image
            className="me-3"
            src={add_provider}
            width={18}
            height={18}
            alt="add"

          />
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <div className="flex flex-row gap-1 align-items-center">
          <p className="mb-0 text-primary fs-16 font-fam ">All Patients </p>
          <p className="mb-0 fs-16 my-active-style my-non-active-style">
            {myAllData.length}
          </p>
        </div>
      ),
      children: <PatientProfile t={trans} lng={lng} columns={columns} data={myAllData} />,
    },
    {
      key: "2",
      label: (
        <div className="flex flex-row gap-1 align-items-center">
          <p className="mb-0 text-primary fs-16 font-fam">Pending Patients</p>
          <p className="mb-0 fs-16 my-active-style my-non-active-style">
            {activeProviders.length}
          </p>
        </div>
      ),
      children: <PatientProfile t={trans} lng={lng} columns={columns} data={activeProviders} />,
    },
    {
      key: "3",
      label: (
        <div className="flex flex-row gap-1 align-items-center">
          <p className="mb-0 text-primary fs-16 font-fam">Completed Patients</p>
          <p className="mb-0 fs-16 my-active-style my-non-active-style">
            {inActiveProviders.length}
          </p>
        </div>
      ),
      children: <PatientProfile  t={trans} lng={lng} columns={columns} data={inActiveProviders} />,
    },
    {
      key: "4",
      label: (
        <div className="flex flex-row gap-1 align-items-center">
          <p className="mb-0 text-primary fs-16 font-fam">Cancelled Patients</p>
          <p className="mb-0 fs-16 my-active-style my-non-active-style">
            {pendingProviders.length}
          </p>
        </div>
      ),
      children: <PatientProfile  t={trans} lng={lng} columns={columns} data={pendingProviders} />,
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
            <Col span={24}>
              <div className="p-8 boundary mt-4">
                <div>
                  <h2 className="fs-28 font-fam fw-700">Patients</h2>
                </div>
                <div
                  className="mt-3 rounded-md p-5"
                  style={{ background: "white", height: "90vh" }}
                // width:"80vw"  
                >
                  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
              </div>
            </Col>
          </AdminRow>
        )}
      </>
    )
  );
}

export default HomePage;
