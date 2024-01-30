import React, { useEffect, useState } from "react";
import Image from "next/image";
import demo from "../../../../../public/demo.svg";
import {
  Alert,
  Button,
  Calendar,
  DatePicker,
  Divider,
  Form,
  Select,
  Space,
  theme,
} from "antd";
import moment from "moment";
import "./Signup4Step0.css";
import { postData, useFormState } from "../../services/methods/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup4Current } from "../redux/features/signupStates";
import { Input } from "antd/es";
import { useRouter } from "next/navigation";
import { setSignup3Current } from "../redux/features/signupStates";
const { Option } = Select;

const Signup4Step0 = ({
  t,
  lng,
  updateMainStepFromChild,
  mainstep,
  setMainStep,
  updateMainPreviousFromChild,
  updatNexttStepFromChild,
  updatPrevStepFromChild,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);

  const [disabledDates, setDisabledDates] = useState([]);
  const [timezones, setTimeZones] = useState([]);
  const [timeslots, setTimeSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  // Initial form data
  const initialFormData = {
    date: "",
    timezone_id: "",
    slot_id: null,
  };

  // Use the useFormState hook to manage form state
  const { formData, handleChange } = useFormState(initialFormData);

  const [selectedFormat, setSelectedFormat] = useState([
    moment().format("DD-MM-YYYY"),
    moment().format(" dddd "),
    // moment().format('HH:mm'),
  ]);

  const prev = () => {
    if (signupStates.signup4Current == 0) {
      const temp = mainstep - 1;
      push(
        `/${lng}/signup-step?mainstep=${temp}&substep=${parseInt(
          signupStates.signup3Current
        )}`
      );
      updateMainPreviousFromChild(temp);
    } else {
      dispatch(setSignup3Current(parseInt(signupStates.signup4Current) - 1));
      push(
        `/${lng}/signup-step?mainstep=${mainstep}&substep=${
          parseInt(signupStates.signup4Current) - 1
        }`
      );
    }
  };

  // const handleSelect = (value) => {
  //     setSelectedFormat({
  //         date: value.format('DD-MM-YYYY'),
  //         time: value.format('HH:mm'),
  //         day: value.format('dddd'),
  //     });
  // };

  let selected_value;
  const handleDropdown = (value) => {
    selected_value = value;
    formData.timezone_id = selected_value;
  };

  const onPanelChange = (value, mode) => {
    const day = value.format("dddd");
    const date = value.format("DD");
    const month = value.format("MMMM");
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    borderRadius: token.borderRadiusLG,
  };
  useEffect(() => {}, [selectedFormat]);

  useEffect(() => {
    fetchTimeZones();
  }, []);

  function fetchTimeZones() {
    postData(
      "create-registration-main-step4substep1",
      formData,
      null,
      "",
      null,
      null,
      false
    ).then((res) => {
      setTimeZones(res.data.data.timezones);
    });
  }

  const selectcalender = (value) => {
    setSelectedFormat([
      value.format("YYYY-MM-DD"),
      value.format(" dddd "),
      // value.format('HH:mm'),
    ]);

    formData.date = value.format("YYYY-MM-DD");

    postData("create-registration-main-step4substep1", formData).then((res) => {
      setTimeSlots(res.data.data.slots);
    });
  };

  const disabledDate = (current) => {
    // Get current date
    const currentDate = moment();

    // Calculate 4 days from the current date
    const fourDaysLater = currentDate.clone().add(4, "days");

    // Disable dates within the next 4 days from today
    return (
      current &&
      (current < currentDate.startOf("day") ||
        (current >= currentDate.startOf("day") &&
          current <= fourDaysLater.endOf("day")))
    );
  };

  const CurrentDisable = () => {
    // Get current date
    const currentDate = moment();
    // Calculate 4 days from the current date
    const fourDaysLater = currentDate.clone().add(4, "days");
  };

  const chooseSlot = (slotId) => {
    setSelectedSlotId(slotId);
    formData.slot_id = slotId;
    setIsSelected(true);
  };

  const next = () => {
    postData("store-registration-main-step4SubStep1", formData).then((res) => {
      if (res.errors) {
        setValidationErrors(res.errors);
      } else {
        updatNexttStepFromChild(
          signupStates.signup4Current + 1,
          selectedFormat
        );
        push(
          `/${lng}/signup-step?mainstep=${mainstep}&substep=${
            parseInt(signupStates.signup4Current) + 1
          }`
        );
      }
    });
  };

  return (
    <div className="md:mt-28 mt-2">
      <Image src={demo} alt="Dochyve Logo" width={72} height={96} />
      <div className="about-dochyve mt-4  mw-465">
        <h1 className="fw-700 font-fam  mt-3  black">{t("signup_4.title")}</h1>
        <p className="fw-600 fs-16 font-fam mt-8   mb-4 ">
          {t("signup_4.description")}
        </p>
        <div></div>
      </div>
      <Form>
        <Select
          className="md:w-1/3 mt-8"
          onChange={handleDropdown}
          placeholder={t("signup_4.select_timezones")}
        >
          {timezones.map((optionValue) => {
            return (
              <Option
                className="custom_options"
                key={optionValue.id}
                value={optionValue.id}
                label={optionValue.name}
              >
                <Space className="custom_options">{optionValue.name}</Space>
              </Option>
            );
          })}
        </Select>
      </Form>
      <div className="calendar_time mt-8 md:grid grid-cols-3 md:w-3/4">
        <div className="col-span-2 mt-4" style={wrapperStyle}>
          <div className="">
            <div className="p-3">
              <label className="mt-4">{t("signup_4.select_date")}</label>
              <Divider className="mt-2 mb-1 font-fam"></Divider>
            </div>
          </div>
          <Calendar
            defaultValue={CurrentDisable}
            disabledDate={disabledDate}
            className="custom-calendar"
            fullscreen={false}
            onSelect={selectcalender}
            onPanelChange={onPanelChange}
          />
        </div>

        <div className="p-3 mt-4 ">
          <label className="mt-4">{t("signup_4.select_time")}</label>
          <Divider className="mt-2 mb-1 font-fam"></Divider>
          <div className="font-fam fw-600">{selectedFormat}</div>
          {timeslots.map((value, key) => {
            return (
              <Form.Item
                className="email_label fw-600 font-fam"
                name="slot_id"
                rules={[
                  {
                    required: true,
                  },
                ]}
                validateStatus={
                  validationErrors?.slot_id && value.id === selectedSlotId
                    ? "error"
                    : ""
                }
                help={
                  validationErrors?.slot_id && value.id === selectedSlotId
                    ? validationErrors?.slot_id
                    : ""
                }
              >
                <Input
                  className={`fw-500 ${
                    value.is_slot_taken
                      ? "btn-transparent-border"
                      : "blue-border blue-placeholder"
                  } ${
                    isSelected && value.id === selectedSlotId
                      ? "selected-slot"
                      : ""
                  }`}
                  name="slot_id"
                  disabled={value.is_slot_taken}
                  type="text"
                  placeholder={value.start_time + " to " + value.end_time}
                  onClick={() => chooseSlot(value.id)}
                />
              </Form.Item>
            );
            // }
          })}
        </div>
      </div>

      <div className="flex gap-2 justify-end md:mb-7 md:w-3/4  md:mt-52">
        <Button
          className="btn-secondary next group-buttons group-buttons  font-fam fs-16 fw-500"
          onClick={() => prev()}
        >
          {t("signup_substep2.back")}
        </Button>

        <Button
          className="font-fam text-white next btn-primary fw-500 fs-16  items-center group-buttons"
          onClick={next}
          htmlType="submit"
        >
          {t("signup_substep2.next")}
        </Button>
      </div>
    </div>
  );
};

export default Signup4Step0;
