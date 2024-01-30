"use-client"
import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import "./SignupDetails.css";
import "../Account_Details/AccountDetails.css"
import Image from 'next/image';
import google from "../../../assets/images/google.svg";
import usa from "../../../../../public/usa.svg"
import spain from "../../../../../public/spain.svg"
import facebook from "../../../assets/images/facebook.svg";
import Link from "next/link";
import { useState } from "react";
import { postData, validationAlert } from "../../services/methods/api";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';



const SignupDetails = ({ t, lng }) => {
    const { push } = useRouter();

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone_number: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleFormSubmit = (e) => {
        postData('/doctor/register', formData)
            .then((res) => {
                if(res.errors)
                {
                    setValidationErrors(res.errors);
                }

                else{
                    const token = res.data.data.authorization.token;
                    // Store the token in a cookie
                    Cookies.set('token', token, { expires: 7 });
                    push(`/${lng}/signup-register`);
                }
            })
            .catch(error => {
                if (error.response) 
                {
                }
                else {

                }
            });
    }
    const options = [
        {
            value: "en",
            label: (
                <div className="flex select-icons gap-2">
                    <Image alt="english" src={usa} width={20} height={20}></Image> {t('switch_lanuage.en')}

                </div>
            )
        },
        {
            value: "es",
            label: (
                <div className="flex select-icons gap-2">
                    <Image alt="spanish" src={spain} width={20} height={20}></Image> {t('switch_lanuage.es')}
                </div>
            )
        },

    ];

    const handleLanguageChange = (lng) => {
        push(`/${lng}/signup`);
    };


    return (
        <>
            <div className="md:mt-32 mt-16">
            <Select className="language-select md:w-56" value={lng} options={options} onChange={handleLanguageChange}></Select>
                <div className='about-dochyve'>
                    <h1 className='fw-700 font-fam  mt-3 black'>{t('welcome_dochyve.create_account')}</h1>
                    <p className="fs-16 fw-600 font-fam mb-2 mt-2">
                        {t('account.started')}
                    </p>
                </div>
         
                <Form>
                    <Row gutter={[8, 8]} >
                        <Col className="gutter-row " xs={24} md={12} lg={10}>
                            <Form.Item className="email_label fw-600 font-fam"
                                label={t('form.label.f_name')}
                                name="firstname"
                                rules={[
                                    {
                                        required: true,
                                        message: t('form.label.f_required'),
                                    },
                                ]}
                                                               
                            >
                                <Input className="group_inputs" name="firstname" type="text" placeholder={t('form.label.f_input')} onChange={(e) => handleInputChange(e)} />
                            </Form.Item>

                        </Col>



                        <Col className="gutter-row " xs={24} md={12} lg={10}>
                            <Form.Item
                                className="email_label fw-600 font-fam"
                                label={t('form.label.l_name')}
                                name="lastname"
                                rules={[
                                    {
                                        required: true,
                                        message: t('form.label.l_required'),
                                    },
                                ]}
                                validateStatus={validationErrors?.lastname ? 'error' : ''}
                                help={validationErrors?.lastname || ''}
                                
                            >
                                <Input className="group_inputs" name="lastname" type="text" placeholder={t('form.label.l_input')} onChange={handleInputChange} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item className="email_label fw-600 font-fam"
                        label={t('form.ph')}
                        name="ph"

                        rules={[
                            {
                                required: true,
                                message: t('form.label.ph_required'),
                            },
                        ]}
                        validateStatus={validationErrors?.phone_number ? 'error' : ''}
                        help={validationErrors?.phone_number || ''}
                      
                       
                    >
                        <Input className="input_email" type="number" name="phone_number" placeholder={t('form.ph_input')} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        className="email_label fw-600 font-fam mt-8"
                        label={t('form.label.address')}

                        rules={[
                            {
                                required: true,
                                message: t('form.label.address_required'),
                            },
                            {
                                type: 'email',
                                message: t('form.label.address_invalid'),
                            },
                        ]}
                        validateStatus={validationErrors?.email ? 'error' : ''}
                        help={validationErrors?.email || ''}
                       
                    >
                        <Input className="input_email" type="email" name="email" placeholder={t('form.label.address_input')} onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item className="email_label fw-600 font-fam"
                        label={t('form.label.password')}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t('form.label.password_required'),
                            },
                        ]}
                        validateStatus={ validationErrors?.password ? 'error' : '' } 
                        help={Array.isArray(validationErrors?.password)  ? validationErrors?.password[0] :validationErrors?.password}
                       
                    >
                        <Input.Password className="input_email" name="password" placeholder={t('form.label.password_input')} onChange={handleInputChange} />
                    </Form.Item>


                    <Form.Item className="email_label fw-600 font-fam"
                        label={t('form.label.c_password')}

                        rules={[
                            {
                                required: true,
                                message: t('form.label.password_required'),
                            },
                        ]}
                        
                    >
                        <Input.Password className="input_email" name="password_confirmation" placeholder={t('form.label.create_password_input')} onChange={handleInputChange} />
                    </Form.Item>


                    <Form.Item>
                        <Button className="w-4/5 text-white btn-primary input_email font-fam" htmlType="submit" onClick={handleFormSubmit} >
                            {t('form.sign_up')}
                        </Button>
                    </Form.Item>

                    <div className="md:w-4/5">
                        <Divider className="w-4/5 font-fam"> {t('form.sign_with')}</Divider>
                    </div>
                </Form>

                <div className="mt-4">
                    <button className="w-4/5 text-white btn-secondary fw-700 font-fam  btn-transparent-border  font-medium rounded text-sm px-5 py-2.5 justify-center text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 w-4/5 input_email" type="button">
                        <Image className="mr-3" src={google} alt="Dochyve" />
                        {t('form.s_google')}
                    </button>
                </div>

                <div className="mt-4">
                    <button className="w-4/5 text-white btn-secondary fw-700 font-fam  btn-transparent-border  font-medium rounded text-sm px-5 py-2.5 justify-center text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 w-4/5 input_email" type="button">
                        <Image className="mr-3" src={facebook} alt="Dochyve" />
                        {t('form.s_facebook')}
                    </button>
                </div>

                <div className="md:w-4/5">
                    <Divider className="w-4/5 font-fam"> {t('form.already_account')}<Link className="text-primary font-fam fs-16 fw-600 ml-1" href={`/${lng}/signin`}>{t("form.log_in")}</Link></Divider>
                </div>

               

                <div className="text-right md:mt-52 md:ml-12 md:w-5/6">
                    <p className="font-fam md:ml-10">{t('form.copy_rights')}  <a className="font-fam ml-4">{t('form.license')}</a> <a  className="font-fam md:ml-4">{t('form.terms')}</a></p>
                </div>

            </div>
        </>
    );
}

export default SignupDetails;
