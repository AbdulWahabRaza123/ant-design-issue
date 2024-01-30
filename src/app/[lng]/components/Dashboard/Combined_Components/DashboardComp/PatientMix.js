"use client";
import { Button, Col, Divider, Progress, Row } from "antd";
import React, { useState, useEffect } from "react";
import setting_slider from "../../../../../../../public/admin/images/settings-sliders.svg";
import right_arrow from "../../../../../../../public/admin/images/right-arrow.svg";
import impressions_eye from "../../../../../../../public/admin/images/impressions-eye.svg";
import clicks from "../../../../../../../public/admin/images/clicks.svg";
import Image from "next/image";
import "./DoctorList.css";
import { Tabs } from "antd";
import Illnesses from "./Illnesses";
import "./PatientMix.css";
import Insurances from "./Insurances";
import { Rate } from "antd";

const onChange = (key) => {
  // console.log(key);
};
const items = [
  {
    key: "1",
    label: <span className="fw-500 font-fam">Illnesses</span>,
    children: <Illnesses />,
  },
  {
    key: "2",
    label: <span className="fw-500 font-fam">Insurances</span>,
    children: <Insurances />,
  },
];

const Ratings = [
  {
    id: 1,
    disease: "Excellent",
    number: 15,
    // total_patients: "15 Patients",
  },

  {
    id: 2,
    disease: "Outstanding",
    number: 25,
    // total_patients: "25 Patients"
  },

  {
    id: 3,
    disease: "Good",
    number: 50,
    // total_patients: "50 Patients"
  },

  {
    id: 4,
    disease: "Fair",
    number: 75,
    // total_patients: "75 Patients"
  },

  {
    id: 5,
    disease: "Poor",
    number: 90,
    // total_patients: "90 Patients"
  },
];

const PatientMix = () => {
  return (
    <>
      <Row className="justify-between">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          className="bg-white p-4 radius"
        >
          <div className="flex justify-between items-baseline">
            <label className="fw-700">Patient Mix</label>
            <div className="flex  justify-between mt-4 gap-3">
              <Button
                className="flex flex-row-reverse gap-4 items-center bg-white slider-button font-fam"
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={24}
          lg={7}
          xl={7}
          className="bg-white radius p-4"
        >
          <div className="flex justify-between items-baseline">
            <label className="fw-700">Reviews and Ratings</label>
            <div className="flex  justify-between mt-4 gap-3">
              <Button
                className="flex flex-row-reverse gap-4 items-center bg-white slider-button font-fam"
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
          <div className="">
            <div className="flex items-center gap-2">
              <h1 className="fw-700 font-fam">4.7</h1>
              <Rate allowHalf defaultValue={5} />
            </div>
            <div className="md:ml-20">
              <p className="font-fam">Based on 565 Ratings</p>
            </div>
          </div>
          <Divider />
          <div className="">
            {Ratings.map((data, key) => {
              return (
                <div className="flex gap-8 progress-container" id={key}>
                  <p className="data fw-500 font-fam">
                    {data?.disease}
                    <span></span>
                  </p>
                  <Progress
                    className="rating-progress"
                    percent={data?.number}
                  />
                  {/* <p className='data fw-500 font-fam'>{data.total_patients}</p> */}
                </div>
              );
            })}
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={24}
          lg={5}
          xl={5}
          className="bg-white p-8 radius"
        >
          <div className="">
            <label className="fw-700">Views and Clicks</label>
            <p className="fw-500 font-fam">
              How often People did view your profile?
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="">
              <Image
                src={impressions_eye}
                width={42}
                height={38}
                alt="impressions"
              ></Image>
            </div>
            <div className="">
              <h1 className="fw-700 font-fam h-12">
                120<span className="fs-12 text-green fw-700">+20%</span>
              </h1>
              <div>
                <p>Impressions</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="">
              <Image src={clicks} width={42} height={42} alt="clicks"></Image>
            </div>
            <div className="">
              <h1 className="fw-700 font-fam h-12">
                120<span className="fs-12 text-red fw-700">-10%</span>
              </h1>
              <div>
                <p>Clicks</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PatientMix;
