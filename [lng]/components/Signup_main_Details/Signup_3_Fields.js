import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import bookmark from "../../../../../public/bookmark.svg";
import { Button, Checkbox, Form, Radio, Select, Space } from "antd";
import { fetchData, postData, useFormState } from "../../services/methods/api";
const { Option } = Select;
import "./Signup_3_Fields.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { setSignup1Current } from "../redux/features/signupStates";
const Signup_3_Fields = ({
  t,
  lng,
  mainstep,
  //   current,
  //   setCurrent,
  updatNexttStepFromChild,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const [value, setValue] = useState(1);
  const [BookingTypes, setBookingTypes] = useState([]);
  const [softwareTypes, setSoftwareTypes] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [softwareId, setSoftwareId] = useState();
  const [removeSelected, setRemoveSelected] = useState(false);

  const initialFormData = {
    booking_type: [],
    scheduling_software_id: [],
    is_user_have_practice_scheduling_software: 0,
  };

  const { formData, handleChange } = useFormState(initialFormData);

  const prev = () => {
    const temp = parseInt(signupStates.signup1Current - 1);
    dispatch(setSignup1Current(temp));
    push(`/${lng}/signup-step?mainstep=${parseInt(mainstep)}&substep=${temp}`);
  };

  // const next = () => {
  //     updatNexttStepFromChild(current)
  // };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    fetchSoftwares();
  }, []);
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchValue = urlParams.get("substep") || 0;
  //   if (searchValue >= 0) {
  //     dispatch(setSignup1Current(searchValue));
  //   } else {
  //     return;
  //   }
  // }, [useSearchParams, signupStates.signup1Current]);
  function fetchSoftwares() {
    fetchData("create-user-booking-types").then((res) => {
      if (res) {
        setBookingTypes(res.data.data.booking_types);
        setSoftwareTypes(res.data.data.scheduling_softwares);
      }
    });
  }

  // const handleCheckbox = (e) => {
  //     setRemoveSelected(e.target.checked);
  //     if (e.target.checked) {
  //         formData.scheduling_software_id = []
  //         formData.is_user_have_practice_scheduling_software = 1;

  //     }
  // };

  const handleSelect = (selectedValues) => {
    console.log(selectedValues);
    setSelectedOptions(selectedValues);
  };

  function saveProviders() {
    postData("save-user-booking-types", formData).then((res) => {
      updatNexttStepFromChild(signupStates.signup1Current + 1);
    });
  }

  return (
    <>
      <div className="h-100 md:p-8 md:mt-32">
        <Image
          src={bookmark}
          alt="Dochyve Logo"
          width={68}
          height={96}
          className=""
        />
        <h1 className="fw-700 font-fam  mt-3 black">
          {t("signup_substep3.title")}
        </h1>
        <p className="fs-16 fw-600 font-fam mb-4 mt-2">
          {t("signup_substep3.description")}
        </p>

        <Form.Item
          label=""
          rules={[
            {
              required: true,
              message: t("form.label.p_required"),
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => {
              handleChange({
                target: {
                  name: "booking_type",
                  value: e.target.value,
                  type: "radio",
                },
              });
            }}
          >
            <Space direction="vertical">
              {BookingTypes.map((item) => (
                <Radio className="font-fam" key={item.key} value={item.id}>
                  {item.title}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Space className="w-full md:mb-4" direction="vertical">
          <label className="fs-14 fw-600 font-fam ">
            {t("signup_substep3.software_type")}
          </label>
          <Form.Item
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
              className="input_email  w-100 software-select ant-select-selection-item"
              placeholder={t("signup_substep3.software_select")}
              optionLabelProp="label"
              allowClear={true}
              maxTagCount={4}
              maxTagTextLength={12}
              onChange={(e) =>
                handleChange({
                  target: { name: "scheduling_software_id", value: e },
                })
              }
            >
              {softwareTypes.map((optionValue, key) => {
                return (
                  <Option
                    className="custom_options"
                    key={optionValue.key}
                    value={optionValue.id}
                    label={optionValue.name}
                  >
                    <Space className="custom_options">{optionValue.name}</Space>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Space>
        <div>
          <Checkbox
            value={formData.is_user_have_practice_scheduling_software}
            htmlType="checkbox"
            onChange={(e) =>
              handleChange({
                target: {
                  name: "is_user_have_practice_scheduling_software",
                  value: e.target.checked,
                },
              })
            }
            // onClick={handleCheckbox}
          >
            {t("signup_substep3.my_practice_not_use_software")}
          </Checkbox>
        </div>

        <div className="flex gap-2 justify-end md:mb-7  md:w-5/6 md:mt-52">
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
            onClick={saveProviders}
            htmlType="submit"
          >
            {t("signup_substep2.next")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup_3_Fields;
