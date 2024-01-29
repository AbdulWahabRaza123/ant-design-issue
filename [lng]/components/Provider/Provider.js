import React, { useState, useEffect } from "react";
import "../Signup_Details/SignupDetails.css";
import "./Provider.css"
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
import man from "../../../../../public/man.svg"
const { Option } = Select;

const roles = [
    "signup_step1.practitioner",
    "signup_step1.physician",
    "signup_step1.dentist",
    "signup_step1.therapist",
    "signup_step1.nurse_practitioner",
    "signup_step1.other",
];

const Provider = ({
    key,
    providerList,
    specialtyOptions,
    t,
    selectedSpecialities,
    selectedRoleNo,
    setSelectedRoleNo,
    setFormData,
    setSpecialtiesEmpty,
    onDeleteProvider,
}) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [speciality, setSpeciality] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [selectedRoleNum, setSelectedRoleNum] = useState(1);
    const [selectedProviderSpecialties, setSelectedProviderSpecialties] = useState([]);
    const [edit, setEdit] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const [history, setHistory] = useState({
        fName: "",
        lName: "",
        role: "",
        speciality: "",
        selectedRoleNum: null,
        selectedProviderSpecialties: null,
    });

    const handleSpecialtyChange = (selectedSpecialties) => {
        setSelectedProviderSpecialties(selectedSpecialties);
    };

    const revertData = () => {
        setFirstName(history.fName);
        setLastName(history.lName);
        setRole(history.role);
        setSpeciality(history.speciality);
        setSelectedRoleNum(history.selectedRoleNum);
        setSelectedProviderSpecialties(history.selectedProviderSpecialties);

        setEdit(false);
    };

    useEffect(() => {
        const temp = {
            fName: providerList?.firstname,
            lName: providerList?.lastname,
            role: providerList?.practice_role,
            speciality: specialtyOptions,
            selectedRoleNum: selectedRoleNo,
            selectedProviderSpecialties: selectedSpecialities || null,
        };
        setHistory(temp);
        setFirstName(providerList?.firstname);
        setLastName(providerList?.lastname);
        setRole(providerList?.practice_role);
        setSpeciality(specialtyOptions);
        setSelectedRoleNum(selectedRoleNo);

        if (selectedSpecialities) {
            setSelectedProviderSpecialties(selectedSpecialities);
        }

        setSpecialtiesEmpty(null);
        setSelectedRoleNo("");

        setFormData({
            firstname: "",
            lastname: "",
            roleText: "",
        });

    }, [providerList, specialtyOptions]);

    const handleCardClick = () => {
        setClicked(!clicked);
    };

    // const handleDelete = () => {
    //     // Step 2: Call onDeleteProvider when "Delete" button is clicked
    //     onDeleteProvider(key);
    //     setIsDeleted(true);
    // };

    if (isDeleted) {
        // If provider is deleted, don't render the card
        return null;
    }

   
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
                            src={clicked ? down : up} // Change 'down' to the image source when the card is not clicked
                            alt="Dochyve Logo"
                            width={20}
                            height={10}
                            className=""
                        />
                    </div>

                    <div className="fw-60 flex items-center font-fam fs-16 text-gray">
                        <div>
                            <Image
                                src={man}
                                alt="Dochyve Logo"
                                width={59}
                                height={59}
                                className="mr-2"
                            />
                        </div>
                        <div className="fw-600 font-fam fs-16">
                            {firstname} {lastname}
                            <div>
                                <span className="fs-16 mr-1  font-fam fw-600">Role:</span>
                                <span className="text-primary fs-16 font-fam fw-600">{role}</span>
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
                        <Row gutter={[8, 8]} >

                            <Col className="gutter-row " xs={24} md={12} lg={12}>
                                <Form.Item className="email_label fw-600 font-fam"
                                    label={t('form.label.f_name')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('form.label.f_required'),
                                        },
                                    ]}


                                >
                                    <Input
                                        className="group_inputs"
                                        name="firstname"
                                        type="text"
                                        placeholder="First Name"
                                        value={firstname}
                                        disabled={!edit ? true : false}
                                        onChange={(e) => {
                                            if (edit) {
                                                setFirstName(e.target.value);
                                                
                                            }
                                        }}
                                    />
                                </Form.Item>

                            </Col>

                            <Col className="gutter-row " xs={24} md={12} lg={12}>
                                <Form.Item
                                    className="email_label fw-600 font-fam"
                                    label={t('form.label.l_name')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('form.label.l_required'),
                                        },
                                    ]}


                                >
                                    <Input
                                        className="group_inputs"
                                        name="lastname"
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastname}
                                        disabled={!edit ? true : false}
                                        onChange={(e) => {
                                            if (edit) {
                                                setLastName(e.target.value);
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div>
                            <label className="fs-14 fw-600 font-fam ">{t("form.spec")}</label>
                        </div>
                        <div>
                            <label className=" font-fam ">{t("form.apply")}</label>
                        </div>

                        <Select
                            mode="multiple"
                            className="input_email multiple_select mb-4 ant-select-selection-item w-100"
                            placeholder="Select Specialties"
                            optionLabelProp="label"
                            maxTagCount={4}
                            maxTagTextLength={12}
                            disabled={!edit ? true : false}
                            value={selectedProviderSpecialties}
                            onChange={edit && handleSpecialtyChange}
                        >
                            {speciality.length > 0 &&
                            
                                speciality?.map((optionValue) => {
                                    
                                    const { id, name } = optionValue; // Destructure id and name from the optionValue object as we cannot map it directly
                                   
                                    return (
                                        <Option
                                            className="custom_options"
                                            key={id} 
                                            value={id} 
                                            label={t(`${name}`)} 
                                        >
                                            <Space className="custom_options">
                                                {t(`${name}`)}
                                            </Space>
                                        </Option>
                                    );
                                })}

                        </Select>

                        {edit ? (
                            <div>
                                <div>
                                    <label className="fs-14 fw-600 font-fam">{t('form.role')}</label>
                                </div>
                                <Radio.Group
                                    onChange={(e) => {
                                        setSelectedRoleNum(e.target.value);
                                        setRole(t(roles[e.target.value - 1]));
                                    }}
                                    value={selectedRoleNum}
                                >
                                    <Space direction="vertical">
                                        <Radio className="font-fam" value={1}>
                                            {t("signup_step1.practitioner")}
                                        </Radio>
                                        <Radio value={2}>
                                            {t("signup_step1.physician")}
                                        </Radio>
                                        <Radio value={3}>
                                            {t("signup_step1.dentist")}
                                        </Radio>
                                        <Radio value={4}>
                                            {t("signup_step1.therapist")}
                                        </Radio>
                                        <Radio value={5}>
                                            {t("signup_step1.nurse_practitioner")}
                                        </Radio>
                                        <Radio value={6}>
                                            {t("signup_step1.other")}
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <div>
                                        <label className="fs-14 fw-600 font-fam">{t('signup_step1.your_role')}</label>
                                    </div>

                                    <Radio.Group value={1}>
                                        <Radio className="font-fam" value={1}>
                                            {role}

                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </>
                        )}
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
                                    <Button onClick={onDeleteProvider} className="fw-600 font-fam bg-red delete text-white group-buttons" >{t("signup_step1.delete")}</Button>
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

export default Provider;
