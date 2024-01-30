import React from "react";
import { Column } from "@ant-design/charts";
import _ from "lodash";
import { Button, Col, Form, Row, Select, Space } from "antd";
import Image from "next/image";
import "./PatientSelect.css";
// import DoctorList from "./DoctorList";

const PatientSelect = () => {
  const Doctors = [
    { id: 1, key: "doctor1", name: "Nisha" },
    { id: 2, key: "doctor2", name: "Sophia" },
    { id: 3, key: "doctor3", name: "Elsa" },
  ];
  var data = [
    {
      date: "Jan",
      value: 900,
      type: "Total Patients",
    },
    {
      date: "Feb",
      value: 800,
      type: "Total Patients",
    },
    {
      date: "Mar",
      value: 1400,
      type: "Total Patients",
    },
    {
      date: "Apr",
      value: 900,
      type: "Total Patients",
    },
    {
      date: "May",
      value: 1600,
      type: "Total Patients",
    },
    {
      date: "Jun",
      value: 300,
      type: "Total Patients",
    },
    {
      date: "Jul",
      value: 100,
      type: "Total Patients",
    },
    {
      date: "Aug",
      value: 1900,
      type: "Total Patients",
    },
    {
      date: "Sep",
      value: 600,
      type: "Total Patients",
    },
    {
      date: "Oct",
      value: 1600,
      type: "Total Patients",
    },
    {
      date: "Nov",
      value: 700,
      type: "Total Patients",
    },
    {
      date: "Dec",
      value: 200,
      type: "Total Patients",
    },

    {
      date: "Jan",
      value: 945,
      type: "Old Patients",
    },
    {
      date: "Feb",
      value: 845,
      type: "Old Patients",
    },
    {
      date: "Mar",
      value: 1445,
      type: "Old Patients",
    },
    {
      date: "Apr",
      value: 9453,
      type: "Old Patients",
    },
    {
      date: "May",
      value: 154,
      type: "Old Patients",
    },
    {
      date: "Jun",
      value: 1449,
      type: "Old Patients",
    },
    {
      date: "Jul",
      value: 645,
      type: "Old Patients",
    },
    {
      date: "Aug",
      value: 1645,
      type: "Old Patients",
    },
    {
      date: "Sep",
      value: 7452,
      type: "Old Patients",
    },
    {
      date: "Oct",
      value: 4558,
      type: "Old Patients",
    },

    {
      date: "Nov",
      value: 4558,
      type: "Old Patients",
    },

    {
      date: "Dec",
      value: 4558,
      type: "Old Patients",
    },

    {
      date: "Jan",
      value: 900,
      type: "New Patients",
    },
    {
      date: "Feb",
      value: 945,
      type: "New Patients",
    },
    {
      date: "Mar",
      value: 1400,
      type: "New Patients",
    },
  ];

  var config = {
    data: data,
    // isStack: true,
    // autoFit: true,
    // appendPadding: [5, 0, 0, 0],
    // color: ["#001E8A", "rgb(34, 69, 192)", "rgb(89, 119, 225)"],
    // columnstyle: {
    //   radius: [100, 1000, 100, 20],
    // },

    xField: "date",
    yField: "value",
    seriesField: "type",
    meta: {
      value: { alias: "千元" },
      date: { alias: "" },
    },
    // legend: {
    //   position: "top",
    //   offsetY: 17,
    //   itemName: {
    //     formatter: (text) => {
    //       const oldLabel = text;
    //       const labelLength = oldLabel.length;
    //       let newLabel = "";
    //       if (labelLength > 6) {
    //         const firstStr = oldLabel.substr(0, 6);
    //         const lastStr = oldLabel.substr(6);
    //         newLabel = `${firstStr}${lastStr}`;
    //       } else {
    //         newLabel = oldLabel;
    //       }
    //       return newLabel;

    //     },
    //   },
    // },
    // xAxis: {
    //   title: {
    //     text: "",
    //     position: "end",
    //     offset: 0,
    //     spacing: 8,
    //     style: {
    //       fontSize: 12,
    //       fontWeight: 900,
    //       textAlign: "start",
    //     },
    //   },
    //   line: {
    //     style: {
    //       stroke: "transparent",
    //     },
    //   },
    //   tickLine: {
    //     style: {
    //       stroke: "transparent",
    //     },
    //   },
    //   label: {
    //     style: {
    //       fill: "#6D6D6D",
    //       fontWeight: 700,
    //       fontFamily: "Montserrat"
    //     },
    //   },
    // },
    // yAxis: {
    //   line: {
    //     style: {
    //       lineWidth: 0,
    //     },

    //   },
    //   label: {
    //     offset: 15,
    //     formatter: (text) => {
    //       const label = _.round(_.divide(text, 1000), 2);
    //       return label;
    //     },
    //     style: {
    //       fill: "#6D6D6D",
    //       fontWeight: 700,
    //       fontFamily: "Montserrat"
    //     },
    //   },
    // },
    // tooltip: {
    //   showTitle: false,
    //   formatter: (datum) => {
    //     return {
    //       name: `${datum?.type}`,
    //       value: `${datum?.value?.toLocaleString()}`,
    //     };
    //   },
    // },
  };
  return (
    <>
      <div>
        <Column className="bar-chart mt-4" {...config} />
        Hello
      </div>
    </>
  );
};

export default PatientSelect;
