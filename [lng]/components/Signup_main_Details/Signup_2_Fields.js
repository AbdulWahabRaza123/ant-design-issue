import Image from "next/image";
import React, { useEffect, useState } from "react";
import license from "../../../../../public/license.svg";
import { Button, Form, Select, Space } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../assets/css/signup.css";
import "../../../assets/css/signup-variables.css";
import { fetchData, postData, useFormState } from "../../services/methods/api";
import axiosInstance from "../../services/interceptors/axiosInstance";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { setSignup1Current } from "../redux/features/signupStates";
const { Option } = Select;

const Signup_2_Fields = ({
  t,
  lng,
  mainstep,
  // current, setCurrent,
  updatNexttStepFromChild,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const [form] = Form.useForm();
  const [stateOptions, setStateOptions] = useState([]);

  //useEffect
  useEffect(() => {
    fetchStates();
  }, []);

  const [formValue, setFormValue] = useState([]);

  // Initial form data
  const initialFormData = {
    states: [],
  };

  // Use the useFormState hook to manage form state
  const { formData, handleChange } = useFormState(initialFormData);

  const prev = () => {
    const temp = parseInt(signupStates.signup1Current - 1);
    console.log("This is temp ", temp);
    dispatch(setSignup1Current(signupStates.signup1Current - 1));
    push(`/${lng}/signup-step?mainstep=${parseInt(mainstep)}&substep=${temp}`);
  };

  const next = () => {
    saveProviders();
    // form.validateFields().then(values => {

    //     // updatNexttStepFromChild(current);
    // }).catch(errorInfo => {

    // });
  };

  function fetchStates() {
    fetchData("create-user-licensed-states").then((res) => {
      if (res) setStateOptions(res.data.data.states);
    });
  }

  function saveProviders() {
    postData("save-user-licensed-states", formData).then((res) => {
      updatNexttStepFromChild(signupStates.signup1Current + 1);
    });
  }
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
    <>
      <div className="h-100 md:p-8 md:mt-32">
        <Image
          src={license}
          alt="Dochyve Logo"
          width={68}
          height={96}
          className=""
        />
        <h1 className="fw-700 font-fam  mt-3 black">
          {t("signup_substep2.title")}
        </h1>
        <p className="fs-16 fw-600 font-fam mb-4 mt-2">
          {t("signup_substep2.description")}
        </p>
        <Form form={form}>
          <label className="fs-14 fw-600 font-fam ">
            {t("signup_substep2.state")}
          </label>

          <div className=" md:w-5/6">
            <Form.Item
              name="specialties"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="font-fam fw-500">
                      {t("signup_substep2.enter_state_validation")}
                    </span>
                  ),
                },
              ]}
            >
              <Select
                mode="multiple"
                className="input_email multiple_select  md:w-5/6  ant-select-selection-item"
                placeholder={t("signup_substep2.enter_state")}
                optionLabelProp="label"
                allowClear={true}
                maxTagCount={4}
                maxTagTextLength={12}
                name="states"
                onChange={(e) =>
                  handleChange({ target: { name: "states", value: e } })
                }
              >
                {stateOptions.map((optionValue, key) => {
                  return (
                    <Option
                      className="custom_options"
                      key={key}
                      value={optionValue.id}
                      label={optionValue.name}
                    >
                      <Space className="custom_options">
                        {optionValue.name}
                      </Space>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div>
            <label className="fs-16 fw-600 font-fam mb-4">
              {t("signup_substep2.multiple_state")}
            </label>
          </div>
        </Form>

        <div className="flex gap-2 justify-end md:mb-7 mt-8  md:w-5/6 md:mt-52">
          {signupStates.signup1Current > 0 && (
            <Button
              className="btn-secondary next group-buttons group-buttons  font-fam fs-16 fw-500"
              onClick={() => prev()}
            >
              {t("signup_substep2.back")}
            </Button>
          )}
          <Button
            className="font-fam text-white next btn-primary fw-500 fs-16  items-center group-buttons"
            onClick={next}
            htmlType="submit"
          >
            {t("signup_substep2.next")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup_2_Fields;
