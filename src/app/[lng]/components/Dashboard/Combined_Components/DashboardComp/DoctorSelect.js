"use client";
import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import _ from "lodash";
import "./DoctorSelect.css";
import { Button, Col, Form, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import setting_slider from "../../../../../../../public/admin/images/settings-sliders.svg";
import Image from "next/image";
const { Option } = Select;
import "./DoctorSelect.css";
import DoctorList from "./DoctorList";
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

// var config = {
//   data: data,
//   isStack: true,
//   autoFit: true,
//   appendPadding: [5, 0, 0, 0],
//   color: ["#001E8A", "rgb(34, 69, 192)", "rgb(89, 119, 225)"],
//   columnStyle: {
//     radius: [100, 1000, 100, 20],
//   },

//   xField: "date",
//   yField: "value",
//   seriesField: "type",
//   meta: {
//     value: { alias: "千元" },
//     date: { alias: "" },
//   },
//   legend: {
//     position: "top",
//     offsetY: 17,
//     itemName: {
//       formatter: (text) => {
//         const oldLabel = text;
//         const labelLength = oldLabel?.length || 0;
//         let newLabel = "";
//         if (labelLength > 6) {
//           const firstStr = oldLabel?.substr(0, 6) || "";
//           const lastStr = oldLabel?.substr(6) || "";
//           newLabel = `${firstStr}${lastStr}`;
//         } else {
//           newLabel = oldLabel;
//         }
//         return newLabel;
//       },
//     },
//   },
//   xAxis: {
//     title: {
//       text: "",
//       position: "end",
//       offset: 0,
//       spacing: 8,
//       style: {
//         fontSize: 12,
//         fontWeight: 900,
//         textAlign: "start",
//       },
//     },
//     line: {
//       style: {
//         stroke: "transparent",
//       },
//     },
//     tickLine: {
//       style: {
//         stroke: "transparent",
//       },
//     },
//     label: {
//       style: {
//         fill: "#6D6D6D",
//         fontWeight: 700,
//         fontFamily: "Montserrat",
//       },
//     },
//   },
//   yAxis: {
//     line: {
//       style: {
//         lineWidth: 0,
//       },
//     },
//     label: {
//       offset: 15,
//       formatter: (text) => {
//         const label = _?.round(_?.divide(text, 1000), 2) || "";
//         return label;
//       },
//       style: {
//         fill: "#6D6D6D",
//         fontWeight: 700,
//         fontFamily: "Montserrat",
//       },
//     },
//   },
//   tooltip: {
//     showTitle: false,
//     formatter: (datum) => {
//       return {
//         name: `${datum?.type}`,
//         value: `${datum?.value?.toLocaleString()}`,
//       };
//     },
//   },
// };

// const config = {
//   data: [
//     {
//       label: "Mon",
//       value: 26,
//     },
//     {
//       label: "Tue",
//       value: 24,
//     },
//     {
//       label: "Wed",
//       value: 17,
//     },
//     {
//       label: "Thu",
//       value: 14,
//     },
//     {
//       label: "Fri",
//       value: 9,
//     },
//     {
//       label: "Sat",
//       value: 6,
//     },
//     {
//       label: "Sun",
//       value: 4,
//     },
//   ],
//   xField: "label",
//   yField: "value",
//   label: {
//     position: "middle",
//     style: {
//       fill: "#FFFFFF",
//       opacity: 0.6,
//     },
//   },
//   xAxis: {
//     label: {
//       autoHide: true,
//       autoRotate: false,
//     },
//   },
//   autoFit: true,
//   style: {
//     overflow: "hidden",
//   },
// };
const DoctorSelect = () => {
  const [config, setConfig] = useState({
    data: [
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
    ],
    // isStack: false,
    // autoFit: false,
    // appendPadding: [5, 0, 0, 0],
    // color: ["#001E8A", "rgb(34, 69, 192)", "rgb(89, 119, 225)"],
    // columnStyle: {
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
    //       const labelLength = text?.length || 0;
    //       let newLabel =
    //         labelLength > 6
    //           ? `${text?.substr(0, 6) || ""}${text?.substr(6) || ""}`
    //           : text;
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
    //       fontFamily: "Montserrat",
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
    //       const label = Math.round(text / 1000, 2) || "";
    //       return label;
    //     },
    //     style: {
    //       fill: "#6D6D6D",
    //       fontWeight: 700,
    //       fontFamily: "Montserrat",
    //     },
    //   },
    // },

    tooltip: {
      showTitle: false,
      formatter: (datum) => {
        return (
          datum && {
            name: `${datum?.type}`,
            value: `${datum?.value?.toLocaleString()}`,
          }
        );
      },
    },
  });
  // var config = {
  //   data: [
  //     {
  //       date: "Jan",
  //       value: 900,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Feb",
  //       value: 800,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Mar",
  //       value: 1400,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Apr",
  //       value: 900,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "May",
  //       value: 1600,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Jun",
  //       value: 300,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Jul",
  //       value: 100,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Aug",
  //       value: 1900,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Sep",
  //       value: 600,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Oct",
  //       value: 1600,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Nov",
  //       value: 700,
  //       type: "Total Patients",
  //     },
  //     {
  //       date: "Dec",
  //       value: 200,
  //       type: "Total Patients",
  //     },

  //     {
  //       date: "Jan",
  //       value: 945,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Feb",
  //       value: 845,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Mar",
  //       value: 1445,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Apr",
  //       value: 9453,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "May",
  //       value: 154,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Jun",
  //       value: 1449,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Jul",
  //       value: 645,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Aug",
  //       value: 1645,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Sep",
  //       value: 7452,
  //       type: "Old Patients",
  //     },
  //     {
  //       date: "Oct",
  //       value: 4558,
  //       type: "Old Patients",
  //     },

  //     {
  //       date: "Nov",
  //       value: 4558,
  //       type: "Old Patients",
  //     },

  //     {
  //       date: "Dec",
  //       value: 4558,
  //       type: "Old Patients",
  //     },

  //     {
  //       date: "Jan",
  //       value: 900,
  //       type: "New Patients",
  //     },
  //     {
  //       date: "Feb",
  //       value: 945,
  //       type: "New Patients",
  //     },
  //     {
  //       date: "Mar",
  //       value: 1400,
  //       type: "New Patients",
  //     },
  //   ],
  //   isStack: true,
  //   autoFit: true,
  //   appendPadding: [5, 0, 0, 0],
  //   color: ["#001E8A", "rgb(34, 69, 192)", "rgb(89, 119, 225)"],
  //   columnStyle: {
  //     radius: [100, 1000, 100, 20],
  //   },

  //   xField: "date",
  //   yField: "value",
  //   seriesField: "type",
  //   meta: {
  //     value: { alias: "千元" },
  //     date: { alias: "" },
  //     type: { alias: "" },
  //   },
  //   legend: {
  //     position: "top",
  //     offsetY: 17,
  //     itemName: {
  //       formatter: (text) => {
  //         const labelLength = text?.length || 0;
  //         let newLabel =
  //           labelLength > 6
  //             ? `${text?.substr(0, 6) || ""}${text?.substr(6) || ""}`
  //             : text;
  //         return newLabel;
  //       },
  //     },
  //   },
  //   xAxis: {
  //     title: {
  //       text: "",
  //       position: "end",
  //       offset: 0,
  //       spacing: 8,
  //       style: {
  //         fontSize: 12,
  //         fontWeight: 900,
  //         textAlign: "start",
  //       },
  //     },
  //     line: {
  //       style: {
  //         stroke: "transparent",
  //       },
  //     },
  //     tickLine: {
  //       style: {
  //         stroke: "transparent",
  //       },
  //     },
  //     label: {
  //       style: {
  //         fill: "#6D6D6D",
  //         fontWeight: 700,
  //         fontFamily: "Montserrat",
  //       },
  //     },
  //   },
  //   yAxis: {
  //     line: {
  //       style: {
  //         lineWidth: 0,
  //       },
  //     },
  //     label: {
  //       offset: 15,
  //       formatter: (text) => {
  //         const label = Math.round(text / 1000, 2) || "";
  //         return label;
  //       },
  //       style: {
  //         fill: "#6D6D6D",
  //         fontWeight: 700,
  //         fontFamily: "Montserrat",
  //       },
  //     },
  //   },

  //   tooltip: {
  //     showTitle: false,
  //     formatter: (datum) => {
  //       return (
  //         datum && {
  //           name: `${datum?.type}`,
  //           value: `${datum?.value?.toLocaleString()}`,
  //         }
  //       );
  //     },
  //   },
  // };

  return (
    <>
      <div className="flex justify-between mt-4 gap-3">
        <Form.Item
          className="mb-0 w-1/4 select-doctor"
          rules={[
            {
              required: true,
              message: (
                <span className="font-fam fw-500">
                  {"Enter State Validation"}
                </span>
              ),
            },
          ]}
        >
          <Select
            className="input_email   software-select ant-select-selection-item"
            optionLabelProp="label"
            placeholder="Select Doctor"
          >
            {Doctors?.map((optionValue) => (
              <Option
                className="custom_options"
                key={optionValue?.key}
                value={optionValue?.id || ""}
                label={optionValue?.name || ""}
              >
                <Space className="custom_options">
                  {optionValue?.name || ""}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>
        {setting_slider && (
          <Button
            className="w-39 h-39 bg-white slider-button"
            icon={<Image src={setting_slider}></Image>}
          />
        )}
      </div>
      {<div>{config && <Column className="bar-chart mt-4" {...config} />}</div>}
    </>
  );
};

export default DoctorSelect;
