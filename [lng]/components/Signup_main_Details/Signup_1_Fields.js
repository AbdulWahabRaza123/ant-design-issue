"use-client";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import "../Signup_Details/SignupDetails.css";
import "../Account_Details/AccountDetails.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchData,
  postData,
  validationAlert,
} from "../../services/methods/api";
import Provider from "../Provider/Provider";
import "./Signup_1_Details.css";
import user_group from "../../../../../public/user_group.svg";
import "../Provider/Provider.css";
import SubSteps from "../Sub_Steps/Sub_Steps";
import SignupDetails from "../Signup_Details/SignupDetails";
import "./Signup_1_Fields.css";
import avatar from "../../../../../public/admin/images/defaultavatar.svg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { setSignup1Current } from "../redux/features/signupStates";
const { Option } = Select;
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { message } from "antd";

const Signup_1_Fields = ({
  t,
  lng,
  mainstep,
  // current,
  // setCurrent,
  updatNexttStepFromChild,
  showImageAndText,
}) => {
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    practice_role: "",
  });

  const [selectedRole, setSelectedRole] = useState(null);

  const [providerList, setProviderList] = useState([]); //With the help of provider list array  I am storing the first name last name and role

  const [selectedProviderIndex, setSelectedProviderIndex] = useState(0); // Index value for clicking on the card

  const [selectedProviderSpecialties, setSelectedProviderSpecialties] =
    useState(null); // this line changed

  const [tempSpec, setTempSpec] = useState([]);

  const [error, setError] = useState("");

  // Define error state variables for validation
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [specialtiesError, setSpecialtiesError] = useState("");
  const [valid, SetIsValid] = useState("");
  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  //Methods
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const next = () => {
    if (providerList.length > 0) {
      saveProviders();
    } else {
      validationAlert("Please add at least one provider.");
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleAddProvider = () => {
    const errors = [];

    if (!formData.firstname) {
      errors.push(t("form.label.f_required"));
    }

    if (!formData.lastname) {
      errors.push(t("form.label.l_required"));
    }
    if (
      !selectedProviderSpecialties ||
      selectedProviderSpecialties.length === 0
    ) {
      errors.push(t("signup_step1.speciality_required"));
    }

    if (!selectedRole) {
      errors.push(t("signup_step1.select_role"));
    }

    // If there are errors, set the error state variables and return
    if (errors.length > 0) {
      setFirstnameError(
        errors.includes(t("form.label.f_required"))
          ? t("form.label.f_required")
          : ""
      );
      setLastnameError(
        errors.includes(t("form.label.l_required"))
          ? t("form.label.l_required")
          : ""
      );
      setSpecialtiesError(
        errors.includes(t("signup_step1.speciality_required"))
          ? t("signup_step1.speciality_required")
          : ""
      );
      setRoleError(
        errors.includes(t("signup_step1.select_role"))
          ? t("signup_step1.select_role")
          : ""
      );
      SetIsValid(false);
      return;
    }

    // If there are no errors, add the provider
    const newProvider = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      practice_role: getTranslatedRole(selectedRole),
      specialities: selectedProviderSpecialties,
    };

    setProviderList([...providerList, newProvider]);
    SetIsValid(true);
    setSelectedProviderSpecialties([]);
    setFormData({
      firstname: "",
      lastname: "",
      practice_role: "",
    });

    // Clear the error messages
    setFirstnameError("");
    setLastnameError("");
    setRoleError("");
    setSpecialtiesError("");
  };

  const getTranslatedRole = (role) => {
    switch (role) {
      case 1:
        return t("signup_step1.practitioner");
      case 2:
        return t("signup_step1.physician");
      case 3:
        return t("signup_step1.dentist");
      case 4:
        return t("signup_step1.therapist");
      case 5:
        return t("signup_step1.nurse_practitioner");
      case 6:
        return t("signup_step1.other");
      default:
        return "";
    }
  };

  const handleSpecialtyChange = (selectedSpecialties) => {
    setTempSpec(selectedSpecialties);
    setSelectedProviderSpecialties(selectedSpecialties);
    if (selectedProviderIndex !== 0) {
      const updatedProviders = [...providerList];
      updatedProviders[selectedProviderIndex].specialities =
        selectedSpecialties;
      setProviderList(updatedProviders);
    }
  };

  const onDeleteProvider = (index) => {
    const updatedProviders = [...providerList];
    updatedProviders.splice(index, 1);
    setProviderList(updatedProviders);
  };

  function saveProviders() {
    postData(
      "save-doctors-providers",
      providerList,
      "",
      "",
      true,
      "providers"
    ).then((res) => {
      updatNexttStepFromChild(signupStates.signup1Current);
    });
  }

  function fetchProviders() {
    fetchData("create-doctors-providers").then((res) => {
      if (res) {
        setSpecialtyOptions(res.data.data.specialities);
      }
    });
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const defaultAvatarUrl =
    "../../../../../public/admin/images/defaultavatar.svg";
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchValue = urlParams.get("substep") || 0;
  //   if (searchValue >= 0) {
  //     dispatch(setSignup1Current(searchValue));
  //   } else {
  //     return;
  //   }
  // }, [useSearchParams]);
  return (
    <>
      <div className=" md:mt-16">
        {!showImageAndText ? (
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showRemoveIcon={true}
            showUploadList={false}
            maxCount={1}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="avatar"
                width={90}
                height={93}
                style={{
                  borderRadius: "50%",
                  width: "90px",
                  height: "93px",
                }}
              />
            ) : (
              <Image src={avatar} width={50} height={50} alt="default-avatar" />
            )}
          </Upload>
        ) : (
          <></>
        )}

        {showImageAndText && (
          <div className="about-dochyve">
            <Image
              src={user_group}
              alt="Dochyve Logo"
              width={138}
              height={96}
              className=""
            />
            <h1 className="fw-700 font-fam  mt-3 black">
              {t("signup_step1.title")}
            </h1>
            <p className="fs-16 fw-600 font-fam mb-2 mt-2">
              {t("signup_step1.description")}
            </p>
          </div>
        )}
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col
              className="gutter-row "
              xs={showImageAndText ? 24 : 24}
              md={showImageAndText ? 10 : 12}
              lg={showImageAndText ? 10 : 12}
            >
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("form.label.f_name")}
                rules={[
                  {
                    required: true,
                    message: t("form.label.f_required"),
                  },
                ]}
              >
                <Input
                  className="group_inputs"
                  name="firstname"
                  type="text"
                  placeholder={t("form.label.f_input")}
                  value={formData.firstname}
                  onChange={(e) => handleInputChange(e)}
                />
                {firstnameError && (
                  <div className="error-message">{firstnameError}</div>
                )}
              </Form.Item>
            </Col>

            <Col
              className="gutter-row "
              xs={showImageAndText ? 24 : 24}
              md={showImageAndText ? 10 : 12}
              lg={showImageAndText ? 10 : 12}
            >
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("form.label.l_name")}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  className="group_inputs"
                  name="lastname"
                  value={formData.lastname}
                  type="text"
                  placeholder={t("form.label.l_input")}
                  onChange={handleInputChange}
                />
                {lastnameError && (
                  <div className="error-message">{lastnameError}</div>
                )}
              </Form.Item>
            </Col>
            <Space className="w-full" direction="vertical">
              <label className="fs-14 fw-600 font-fam ">{t("form.spec")}</label>
              <label className=" font-fam ">{t("form.apply")}</label>

              <Select
                mode="multiple"
                className={`${
                  showImageAndText
                    ? "input_email multiple_select md:w-5/6 mb-4 ant-select-selection-item"
                    : "w-full"
                }`}
                placeholder={t("form.select_p")}
                optionLabelProp="label"
                allowClear={true}
                maxTagCount={4}
                maxTagTextLength={12}
                onChange={handleSpecialtyChange}
                value={selectedProviderSpecialties || []}
              >
                {specialtyOptions.map((optionValue, key) => {
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
              {specialtiesError && (
                <div className="error-message fw-600">{specialtiesError}</div>
              )}
            </Space>

            <div className="mb-4">
              <div>
                <label className="fs-14 fw-600 font-fam">
                  {t("form.role")}
                </label>
              </div>
              <div>
                <Radio.Group
                  onChange={(e) => setSelectedRole(e.target.value)}
                  value={selectedRole}
                >
                  <Space direction="vertical">
                    <Radio className="font-fam" value={1}>
                      {t("signup_step1.practitioner")}
                    </Radio>
                    <Radio value={2}>{t("signup_step1.physician")}</Radio>
                    <Radio value={3}>{t("signup_step1.dentist")}</Radio>
                    <Radio value={4}>{t("signup_step1.therapist")}</Radio>
                    <Radio value={5}>
                      {t("signup_step1.nurse_practitioner")}
                    </Radio>
                    <Radio value={6}>{t("signup_step1.other")}</Radio>
                  </Space>
                </Radio.Group>
                {roleError && (
                  <div className="error-message fw-600">{roleError}</div>
                )}
              </div>
            </div>
          </Row>

          {showImageAndText && (
            <div className="flex justify-center sm:justify-end items-center md:w-5/6">
              <Button
                className="font-fam text-white btn-primary fw-500 fs-16 flex justify-end items-center group-buttons"
                onClick={handleAddProvider}
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                {t("signup_step1.add")}
              </Button>
            </div>
          )}
          {!showImageAndText && (
            <div className="flex gap-2 justify-end md:mb-7">
              <Button className="btn-secondary  group-buttons group-buttons w-100  font-fam fs-16 fw-500">
                Clear All
              </Button>

              <Button
                className="font-fam text-white  btn-primary fw-500 fs-16 w-100  items-center group-buttons"
                onClick={next}
                htmlType="submit"
              >
                Add Provider
              </Button>
            </div>
          )}
        </Form>
        {showImageAndText && (
          <div className="provider-list">
            {providerList.map((provider, index) => {
              return (
                <>
                  <Provider
                    key={index}
                    providerList={provider}
                    specialtyOptions={specialtyOptions}
                    selectedSpecialities={tempSpec}
                    t={t}
                    selectedRoleNo={selectedRole}
                    setSelectedRoleNo={setSelectedRole}
                    setFormData={setFormData}
                    setSpecialtiesEmpty={handleSpecialtyChange}
                    onDeleteProvider={() => onDeleteProvider(index)}
                  />
                </>
              );
            })}
          </div>
        )}
      </div>

      {showImageAndText && (
        <div className="flex mb-4 justify-end md:w-5/6 mt-8">
          <Button
            className="font-fam text-white next btn-primary  fw-500 fs-16 items-center group-buttons"
            onClick={next}
            htmlType="submit"
          >
            {t("signup_substep2.next")}
          </Button>
        </div>
      )}
    </>
  );
};

export default Signup_1_Fields;
