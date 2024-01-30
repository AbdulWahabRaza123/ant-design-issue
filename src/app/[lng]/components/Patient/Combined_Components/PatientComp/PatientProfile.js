import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Space, Button, Modal } from "antd";

import { Table, Tag } from "antd";
import "../../../../admin/home/page.css";

import { SearchOutlined } from "@ant-design/icons";
import "../../../Home/Combined_Components/HomePage.css";
import Signup_1_Fields from "../../../Signup_main_Details/Signup_1_Fields";
import { DatePicker } from 'antd';
import "./PatientProfile.css"
const { RangePicker } = DatePicker;

// import "./ProviderProfile.css"
const tableHeight = 600;

const paginationConfig = {
    pageSize: 10,
};

const tableScrollConfig = {
    y: tableHeight,
};
const PatientProfile = ({ columns, data, t }) => {
    const { Search } = Input;
    // const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [width, setWidth] = useState(true);

    const handleAddProviderClick = () => {
        // dispatch(addSpecificModal());
        // console.log(dispatch(addSpecificModal()));
        setIsModalOpen(true);  // Set local state to open the modal
    };

    return (
        <>
            <div>
                <div className="flex flex-row align-center justify-between">
                    <div style={{ width: "30%" }}>
                        <Search
                            placeholder="Search for Appointment"
                            className="flex align-center btn-height"
                            // onSearch={onSearch}
                            enterButton={
                                <Button
                                    type="primary"
                                    className="fw-500 fs-16 flex flex-row align-center justify-conter btn-height"
                                    style={{ background: "#23368D" }}
                                >
                                    <SearchOutlined />
                                </Button>
                            }
                        />
                    </div>
                    <RangePicker />
                </div>
                <div className="mt-4">
                    <Table
                        // pagination={true}
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        pagination={paginationConfig}
                        // scroll={tableScrollConfig}
                        style={{ height: "50vh",overflowY:"scroll" }}
                       

                    />
                </div>
            </div>
        </>
    );
};

export default PatientProfile;
