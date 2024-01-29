import React, { useState, useEffect } from "react";
import "../Signup_Details/SignupDetails.css";

import "@/app/assets/css/signup.css"
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Space,
} from "antd";
import Image from "next/image";
import up from "../../../../../public/up.svg"
import down from "../../../../../public/down.svg"
import location2 from "../../../../../public/location2.svg"
const { Option } = Select;



const Address = ({
    key,
    addressList,
    t,
    setFormData,
    dropdownOptions,
    selectedState,
    onDeleteAddress   // the state which has been currently selected from parent component

}) => {
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipcode, setZipCode] = useState(null);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [StateSelected, setStateSelected] = useState("");

    const [isDeleted, setIsDeleted] = useState(false);

    const [clicked, setClicked] = useState(false);
    const [edit, setEdit] = useState(false); // use state for edit functionality

    const [history, setHistory] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: null
    });

    const revertData = () => {
        setAddress1(history.address1);
        setAddress2(history.address2);
        setCity(history.city);
        setState(history.state);
        setZipCode(history.zipcode);
        setEdit(false);
    };


    const handleStateChange = (selectedState) => {
        setStateSelected(selectedState);
    };


    useEffect(() => {
        const temp = {
            add1: addressList?.address,
            add2: addressList?.address_2,
            city: addressList?.city,
            state: dropdownOptions,
            StateSelected: selectedState || null,   // Left one is our state in child component and the right one selectedState is coming from parent
            zipcode: addressList?.zip_code
        };
        setHistory(temp);
        setAddress1(addressList?.address);
        setAddress2(addressList?.address_2);
        setCity(addressList?.city);
        setState(dropdownOptions);
        setZipCode(addressList?.zip_code);



        if (selectedState) {
            setStateSelected(selectedState);
        }

        setFormData({
            address1: "",
            address2: "",
            city: "",
            zipcode: null,
        });
    }, [addressList, dropdownOptions]);


    const handleCardClick = () => {
        setClicked(!clicked);
    };





    // const handleDelete = () => {
    //     // Step 2: Call onDeleteProvider when "Delete" button is clicked
    //     onDeleteAddress(key);
    //     setIsDeleted(true);
    // };


    return (
        <div className="mt-12 flex">
            <Card className="selected-provider-card w-full md:w-5/6">
                <div
                    onClick={handleCardClick}
                    style={{ color: "black", cursor: "pointer" }}
                    className="provider-info"
                >
                    <div className="text-right flex justify-end">
                        <Image
                            src={clicked ? down : up}
                            alt="Dochyve Logo"
                            width={20}
                            height={10}
                            className=""
                        />
                    </div>

                    <div className="fw-60 flex items-center font-fam fs-16 text-gray">
                        <div>
                            <Image
                                src={location2}
                                alt="Dochyve Logo"
                                width={59}
                                height={59}
                                className="mr-2"
                            />
                        </div>
                        <div className="fw-600 font-fam fs-16">
                            {address1} {address2} {city} {StateSelected}
                            <div>
                                <p className="font-fam fs-16 fw-600">Zip/Post Code:<label className="email_label fw-600 font-fam fs-16"> {zipcode}</label></p>
                            </div>
                        </div>

                    </div>

                </div>
                {/* Display input fields and specialties if the card is selected */}
                {clicked ? (
                    <>
                        <div className="">
                            <Divider className=" font-fam"></Divider>
                        </div>
                        <Form.Item className="email_label fw-600 font-fam"
                            label={t('signup_substep4.Address#1')}
                            rules={[
                                {
                                    required: true,
                                    message: t('form.label.f_required'),
                                },
                            ]}

                        >
                            <Input
                                className="group_inputs"
                                name="address_1"
                                type="text"
                                placeholder="First Name"
                                value={address1}
                                disabled={!edit ? true : false}
                                onChange={(e) => {
                                    if (edit) {
                                        setAddress1(e.target.value);
                                    }
                                }}

                            />
                        </Form.Item>

                        <Form.Item
                            className="email_label fw-600 font-fam"
                            label={t('signup_substep4.Address#2')}
                            rules={[
                                {
                                    required: true,
                                    message: t('form.label.l_required'),
                                },
                            ]}

                        >
                            <Input
                                className="group_inputs"
                                name="address_2"
                                type="text"
                                placeholder="Last Name"
                                disabled={!edit ? true : false}
                                value={address2}
                                onChange={(e) => {
                                    if (edit) {
                                        setAddress2(e.target.value);
                                    }
                                }}
                            />
                        </Form.Item>

                        <Row gutter={[8, 8]}>
                            <Col className="gutter-row " xs={24} md={8} lg={8}>
                                <Form.Item
                                    className="email_label fw-600 font-fam"
                                    label={t('signup_substep4.city')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('signup_substep4.city_required'),
                                        },
                                    ]}

                                >
                                    <Input
                                        className="group_inputs"
                                        name="city"
                                        type="text"
                                        placeholder={t('signup_substep4.city_name')}
                                        value={city}
                                        disabled={!edit ? true : false}
                                        onChange={(e) => {
                                            if (edit) {
                                                setCity(e.target.value);
                                            }
                                        }}

                                    />
                                </Form.Item>
                            </Col>

                            <Col className="gutter-row " xs={24} md={8} lg={8}>
                                <Form.Item
                                    className="email_label fw-600 font-fam"
                                    label={t('signup_substep4.state')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('signup_substep4.state_required'),
                                        },
                                    ]}

                                >

                                    <Select
                                        className="input_email  mb-4 ant-select-selection-item w-100"
                                        placeholder="Select Specialties"
                                        optionLabelProp="label"
                                        disabled={!edit ? true : false}
                                        value={StateSelected}
                                        onChange={edit && handleStateChange}
                                    >
                                        {state?.map((optionValue) => (
                                            <Option
                                                className="custom_options"
                                                key={optionValue.id}
                                                value={optionValue.name}
                                                label={optionValue.name}
                                            >
                                                <Space className="custom_options">
                                                    {optionValue.name}
                                                </Space>
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col className="gutter-row " xs={24} md={8} lg={8}>
                                <Form.Item
                                    className="email_label fw-600 font-fam"
                                    label={t('form.zipcode')}
                                    rules={[
                                        {
                                            required: true,

                                        },
                                    ]}
                                >
                                    <Input
                                        className="group_inputs"
                                        type="number"
                                        placeholder={t('form.zipcode_input')}
                                        name="zipcode"
                                        disabled={!edit ? true : false}
                                        value={zipcode}
                                        onChange={(e) => {
                                            if (edit) {
                                                setZipCode(e.target.value);
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {edit ? (
                            <>
                                <div className="flex gap-2 justify-end">
                                    <Button className="btn-secondary btn-cancel text-gray btn-transparent-border  font-fam fw-600 group-buttons"
                                        onClick={() => {
                                            revertData();
                                        }}
                                    >
                                        {t("signup_step1.cancel")}
                                    </Button>
                                    <Button className="btn-primary btn-save font-fam fw-600 group-buttons"
                                        onClick={() => {
                                            setEdit(false);
                                        }}
                                    >
                                        {t("signup_step1.save")}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2 justify-end">
                                    <Button onClick={onDeleteAddress} className="fw-600 font-fam bg-red delete text-white group-buttons" >{t("signup_step1.delete")}</Button>
                                    <Button
                                        className="fw-600 btn-primary font-fam edit text-white group-buttons"
                                        onClick={() => {
                                            setEdit(true);
                                        }}
                                    >
                                        {t("signup_step1.edit")}
                                    </Button>
                                </div>

                            </>
                        )}
                    </>
                ) : null}
            </Card>
        </div>
    );
};

export default Address;