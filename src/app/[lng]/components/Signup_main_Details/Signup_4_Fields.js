"use-client";
import { Button, Form, Input, Row, Col, Space, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import "../Account_Details/AccountDetails.css";
import "../Signin_Details/SigninDetails.css";
import location from "../../../../../public/location.svg";
import { PlusOutlined } from "@ant-design/icons";
import "./Signup_1_Details.css";
import Address from "../Address/Address";

import "../../../assets/css/signup.css";
import { useEffect, useState } from "react";
import { validateConfig } from "next/dist/server/config-shared";
import {
  fetchData,
  postData,
  validationAlert,
} from "../../services/methods/api";
import { Option } from "antd/es/mentions";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { setSignup1Current } from "../redux/features/signupStates";

const Signup_4_Fields = ({
  t,
  updateMainStepFromChild,
  mainstep,
  lng,
  //   current,
  //   setCurrent,
}) => {
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const { push } = useRouter();

  const [AddressList, setAddressList] = useState([]);

  const [selectedState, setSelectedState] = useState(""); // State for dropdown value

  const [tempState, SetTempState] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    address_2: "",
    city: "",
    state_id: "",
    zip_code: null,
  });

  // const [dropdownOptions,setDropdownOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  useEffect(() => {
    fetchStates();
  }, []);

  const handleStateChange = (value) => {
    //In this handle state I am getting the dropdown value as I was not able to get the name of select tag so I am getting its values only
    SetTempState(value);
    setSelectedState(value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target; // In this handle change I am getting the values of address 1 address2 city and zip on the basis of its name
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [valid, SetIsValid] = useState("");

  const [address1Error, setaddress1Error] = useState("");
  const [address2Error, setaddress2Error] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipError, setZipError] = useState("");
  // const [valid, SetIsValid] = useState("");

  const handleAddAddress = () => {
    const errors = [];
    // Validate the input fields
    if (!formData.address) {
      errors.push(t("signup_substep4.address1_Required"));
    }

    if (!formData.address_2) {
      errors.push(t("signup_substep4.address2_Required"));
    }
    if (!selectedState) {
      errors.push(t("signup_substep4.state_Required"));
    }

    if (!formData.city) {
      errors.push(t("signup_substep4.city_Required"));
    }

    if (!formData.zip_code) {
      errors.push(t("signup_substep4.zip_Required"));
    }

    // If there are errors, set the error state variables and return
    if (errors.length > 0) {
      setaddress1Error(
        errors.includes(t("signup_substep4.address1_Required"))
          ? t("signup_substep4.address1_Required")
          : ""
      );
      setaddress2Error(
        errors.includes(t("signup_substep4.address2_Required"))
          ? t("signup_substep4.address1_Required")
          : ""
      );
      setStateError(
        errors.includes(t("signup_substep4.state_Required"))
          ? t("signup_substep4.state_Required")
          : ""
      );
      setCityError(
        errors.includes(t("signup_substep4.city_Required"))
          ? t("signup_substep4.city_Required")
          : ""
      );
      setZipError(
        errors.includes(t("signup_substep4.zip_Required"))
          ? t("signup_substep4.zip_Required")
          : ""
      );
      SetIsValid(false);
      return;
    }
    const newAddress = {
      address: formData.address,
      address_2: formData.address_2,
      city: formData.city,
      state_id: selectedState,
      zip_code: formData.zip_code,
    };

    setAddressList([...AddressList, newAddress]); // In this address list array I am storing the values of address1 address2 state city state and zip to send to dynamic form and to map its values
    setSelectedState(""); // After adding address for dynamic form (address component) I am clearing the values of dropdown options from static form

    setFormData({
      address: "",
      address_2: "", // for deleting address from memory
      city: "",
      zip_code: null,
    });
  };

  const onDeleteAddress = (index) => {
    const updatedAddress = [...AddressList];
    updatedAddress.splice(index, 1);
    setAddressList(updatedAddress);
  };

  function fetchStates() {
    fetchData("create-user-licensed-states").then((res) => {
      if (res) setStateOptions(res.data.data.states);
    });
  }

  const next = () => {
    if (AddressList.length > 0) {
      saveAddresses();
    } else {
      validationAlert("Please add at least one address.");
    }
  };

  function saveAddresses() {
    postData(
      "save-doctor-view-addresses",
      AddressList,
      "",
      "",
      true,
      "addresses"
    ).then((res) => {
      updateMainStepFromChild();
    });
  }

  const prev = () => {
    const temp = parseInt(signupStates.signup1Current - 1);
    push(`/${lng}/signup-step?mainstep=${parseInt(mainstep)}&substep=${temp}`);
    dispatch(setSignup1Current(temp));
  };
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchValue = urlParams.get("substep") || 0;
  //   if (searchValue >= 0) {
  //     dispatch(setSignup1Current(searchValue));
  //   } else {
  //     return;
  //   }
  // }, [useSearchParams, signupStates.signup1Current]);
  return (
    <div className="md:mt-28 mt-8">
      <Image
        src={location}
        alt="Dochyve Logo"
        width={96}
        height={96}
        className=" mb-5"
      />
      <div className="about-dochyve  mw-465">
        <h1 className="fw-700 font-fam  mt-3 mb-4 black">
          {t("signup_substep4.title")}
        </h1>
      </div>

      <Form>
        <Form.Item
          className="email_label fw-600 font-fam"
          label={t("signup_substep4.Address#1")}
          rules={[
            {
              required: true,
              message: t("form.label.p_required"),
            },
          ]}
        >
          <Input
            className="input_email"
            type="text"
            placeholder={t("signup_substep4.Address#1_Placeholder")}
            onChange={handleInputChange}
            name="address"
            value={formData.address}
          />
          {address1Error && (
            <div className="error-message">{address1Error}</div>
          )}
        </Form.Item>

        <Form.Item
          className="email_label fw-600 font-fam"
          label={t("signup_substep4.Address#2")}
          rules={[
            {
              required: true,
              message: t("signup_substep4.address_required"),
            },
          ]}
        >
          <Input
            className="input_email"
            type="text"
            placeholder={t("signup_substep4.Address#1_Placeholder")}
            onChange={handleInputChange}
            name="address_2"
            value={formData.address_2}
          />
        </Form.Item>

        <Row gutter={[8, 8]}>
          <Col className="gutter-row " xs={24} md={7} lg={6}>
            <Form.Item
              className="email_label fw-600 font-fam"
              label={t("signup_substep4.city")}
              rules={[
                {
                  required: true,
                  message: t("signup_substep4.city_required"),
                },
              ]}
            >
              <Input
                className="group_inputs"
                name="city"
                type="text"
                placeholder={t("signup_substep4.city_name")}
                onChange={handleInputChange}
                value={formData.city}
              />
              {cityError && <div className="error-message">{cityError}</div>}
            </Form.Item>
          </Col>

          <Col className="gutter-row " xs={24} md={7} lg={7}>
            <Form.Item
              className="email_label fw-600 font-fam"
              label={t("signup_substep4.state")}
              rules={[
                {
                  required: true,
                  message: t("signup_substep4.state_required"),
                },
              ]}
            >
              <Select
                showSearch
                className="input_email  ant-select-selection-item"
                placeholder="hello"
                optionLabelProp="label"
                allowClear={true}
                onChange={handleStateChange}
                value={selectedState}
              >
                {stateOptions.map((optionValue, key) => {
                  return (
                    <Option
                      className="custom_options"
                      key={key}
                      value={optionValue.name}
                      label={optionValue.name}
                    >
                      <Space className="custom_options">
                        {optionValue.name}
                      </Space>
                    </Option>
                  );
                })}
              </Select>
              {stateError && <div className="error-message">{stateError}</div>}
            </Form.Item>
          </Col>

          <Col className="gutter-row " xs={24} md={8} lg={7}>
            <Form.Item
              className="email_label fw-600 font-fam"
              label={t("form.zipcode")}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="group_inputs"
                type="number"
                placeholder={t("form.zipcode_input")}
                value={formData.zip_code}
                onChange={handleInputChange}
                name="zip_code"
              />
              {zipError && <div className="error-message">{zipError}</div>}
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center sm:justify-end items-center md:w-5/6">
          <Button
            className="font-fam text-white btn-primary fw-500 fs-16 flex justify-end items-center group-buttons"
            htmlType="submit"
            icon={<PlusOutlined />}
            onClick={handleAddAddress}
          >
            {t("signup_substep4.add_address")}
          </Button>
        </div>

        <div className="provider-list">
          {AddressList.map((address, index) => {
            return (
              <>
                <Address
                  key={index}
                  addressList={address}
                  t={t}
                  dropdownOptions={stateOptions}
                  selectedState={tempState}
                  setFormData={setFormData}
                  handleStateChange={handleStateChange}
                  onDeleteAddress={() => onDeleteAddress(index)}
                />
              </>
            );
          })}
        </div>

        <div className="flex md:w-5/6 gap-2 mt-16 justify-end">
          <Button
            className="btn-secondary next group-buttons group-buttons  font-fam fs-16 fw-500"
            onClick={() => prev()}
          >
            {t("signup_substep2.back")}
          </Button>
          <Button
            onClick={next}
            className=" fw-500 fs-16 text-white btn-primary h-46 font-fam"
          >
            {t("signup_substep4.save_continue")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup_4_Fields;
