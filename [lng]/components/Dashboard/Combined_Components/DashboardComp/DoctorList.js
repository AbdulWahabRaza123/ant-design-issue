"use client";
import { Button, Col, Form, Row, Select, Space, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import setting_slider from "../../../../../../../public/admin/images/settings-sliders.svg";
import right_arrow from "../../../../../../../public/admin/images/right-arrow.svg";
import Image from "next/image";
import "./DoctorList.css";
import gray_eye from "../../../../../../../public/admin/images/gray-eye.svg";
import copy from "../../../../../../../public/admin/images/copy.svg";
import bin from "../../../../../../../public/admin/images/bin.svg";

const DoctorList = () => {
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
      title: <label>Role</label>,
      dataIndex: "role",
      key: "role",
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
            let color;
            let bg;

            if (tag === "Active") {
              (color = "#12B76A"), (bg = "#ECFDF3");
            }
            if (tag === "In Active") {
              (color = "#9EA7AD"), (bg = "#F0F0F0");
            }

            if (tag === "Non Verified") {
              color = "#A90000";
              bg = "#FFF1F3";
            }
            return (
              <Tag
                color={color}
                key={tag}
                className='className="p-3 rounded-2xl fw-600 border-0 font-fam flex flex-row align-center justify-center m-0 text-center"'
                style={{
                  color: color,
                  // width: "110px",
                  height: "30px",
                  padding: "18px",
                  background: bg,
                }}
              >
                {tag}
              </Tag>
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
            src={gray_eye}
            width={18}
            height={18}
            alt="action"
          />
          <Image className="me-3" src={copy} width={16} height={16} alt="add" />

          <Image className="me-3" src={bin} width={16} height={16} alt="add" />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      fname: <p className="font-fam fw-500">John</p>,
      lname: <p className="font-fam fw-500">Brown</p>,
      role: <p className="font-fam fw-500">PA</p>,
      speciality: <p className="font-fam fw-500">PCP</p>,
      tags: ["Active"],
    },
    {
      key: "2",
      fname: <p className="font-fam fw-500">Jim</p>,
      lname: <p className="font-fam fw-500">Green</p>,
      role: <p className="font-fam fw-500">PA</p>,
      speciality: <p className="font-fam fw-500">PA</p>,
      tags: ["In Active"],
    },
    {
      key: "3",
      fname: <p className="font-fam fw-500">Joe</p>,
      lname: <p className="font-fam fw-500">Black</p>,
      role: <p className="font-fam fw-500">PA</p>,
      speciality: <p className="font-fam fw-500">PA</p>,
      tags: ["Non Verified"],
    },
  ];

  return (
    <>
      <div className="bg-white px-5 py-4 mt-4 doctorlist-container">
        <div className="flex justify-between items-baseline  mb-8">
          <label className="fw-700">DoctorList</label>
          <div className="flex  justify-between mt-4 gap-3">
            <Button
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
        <div className="mt-4" style={{ overflowX: "auto" }}>
          <Table
            className="doctor-table"
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

export default DoctorList;
