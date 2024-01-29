import { Button, Col, Form, Row, Select, Space, Table, Tag } from "antd";
import React from "react";
import setting_slider from "../../../../../../../public/admin/images/settings-sliders.svg";
import right_arrow from "../../../../../../../public/admin/images/right-arrow.svg";
import Image from "next/image";
import "./PatientList.css";
import gray_eye from "../../../../../../../public/admin/images/gray-eye.svg";
import copy from "../../../../../../../public/admin/images/copy.svg";
import bin from "../../../../../../../public/admin/images/bin.svg";

const PatientList = ({t,lng}) => {
  const columns = [
    {
      title: <label>First Name</label>,
      dataIndex: "fname",
      key: "fname",
      render: (text) => <a>{text}</a>,
    },

    {
      title: <label>Last Name</label>,
      dataIndex: "lname",
      key: "lname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <label>Phone Number</label>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <label>Email</label>,
      dataIndex: "email",
      key: "email",
    },
  ];

  const data = [
    {
      key: "1",
      fname: <p className="font-fam fw-500">John</p>,
      lname: <p className="font-fam fw-500">Brown</p>,
      phone: <p className="font-fam fw-500">PA</p>,
      email: <p className="font-fam fw-500">PCP</p>,
    
    },
    {
      key: "2",
      fname: <p className="font-fam fw-500">Jim</p>,
      lname: <p className="font-fam fw-500">Green</p>,
      phone: <p className="font-fam fw-500">PA</p>,
      email: <p className="font-fam fw-500">PA</p>,
   
    },
    {
      key: "3",
      fname: <p className="font-fam fw-500">Joe</p>,
      lname: <p className="font-fam fw-500">Black</p>,
      phone: <p className="font-fam fw-500">PA</p>,
      email: <p className="font-fam fw-500">PA</p>,
     
    },

    {
      key: "4",
      fname: <p className="font-fam fw-500">Joe</p>,
      lname: <p className="font-fam fw-500">Black</p>,
      phone: <p className="font-fam fw-500">PA</p>,
      email: <p className="font-fam fw-500">PA</p>,
     
    },

    {
      key: "5",
      fname: <p className="font-fam fw-500">Joe</p>,
      lname: <p className="font-fam fw-500">Black</p>,
      phone: <p className="font-fam fw-500">PA</p>,
      email: <p className="font-fam fw-500">PA</p>,
     
    },
  ];

  return (
    <>
      <div className="bg-white px-5 py-4 mt-4 doctorlist-container">
        <div className="flex justify-between items-baseline mt-2 mb-8">
          <label className="fw-700">PatientList</label>
          <div className="flex  justify-between mt-4 gap-3">
            <Button href={`/${lng}/admin/patients/viewpatients`}
              className="flex flex-row-reverse gap-4 items-center bg-white slider-button"
              icon={
                <Image
                  src={right_arrow}
                  width={4}
                  height={10}
                  alt="right-arrow"
                ></Image>
              }
            >
              View All
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Table
            className="doctor-table"
            // style={{ height: "30vh", overflowY: "scroll" }}
            bordered={true}
            pagination={false}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
};

export default PatientList;
