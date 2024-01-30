"use-client"
import { Button, Divider, Form, Input, Select, Spin } from "antd";
import "./SigninDetails.css";
import Image from 'next/image';
import google from "../../../assets/images/google.svg";
import facebook from "../../../assets/images/facebook.svg";
import Link from "next/link";
import usa from "../../../../../public/usa.svg"
import spain from "../../../../../public/spain.svg"
import { useRouter } from 'next/navigation';
import { postData, useFormState } from "../../services/methods/api";
import { useEffect, useState } from "react";

const SigninDetails = ({ t, lng }) => {
  const { push } = useRouter();

  const initialFormData = {
    email: "",
    password: ""
  };

  // Use the useFormState hook to manage form state
  const { formData, handleChange } = useFormState(initialFormData);

  const [main, setMain] = useState(0);
  const [sub, setSub] = useState(0);
  const [onBoarding, setOnBoarding] = useState(0);


  const Login = () => {
    postData('/login', formData)
      .then((res) => {
        setMain(res.data.data.users_details.main_step)
        setSub(res.data.data.users_details.sub_step)
        setOnBoarding(res.data.data.is_on_boarding_complete)
        if (main == 0 && sub ==0) {
          push(`/${lng}/signup-register`);
        }

        if(onBoarding!=0){
          push(`/${lng}/Dashboard`)
        }
        else{
          push(`/${lng}/signup-step?mainstep=${(res.data.data.users_details.main_step)}&substep=${res.data.data.users_details.sub_step}`);
        }
       
        
      })
      .catch(error => {
      });
  };

  const handleLanguageChange = (lng) => {
    push(`/${lng}/signin`);
  };
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


  return (
    <>
      <div className="md:mt-32 mt-16">

        <div className='about-dochyve'>
          <div className="flex  justify-end items-center">
            <Select className="language-select md:w-56" value={lng} options={options} onChange={handleLanguageChange}></Select>
          </div>
          <h2 className='fw-700 font-fam lh-26 black'>{t('welcome_dochyve.welcome')} <span className='fw-700 font-fam text-primary lh-26'>{t('welcome_dochyve.dochyve.part1')}</span></h2>

          <h1 className='fw-700 font-fam  mt-3 black'>{t('welcome_dochyve.dochyve.part2')}</h1>
          <p className="mt-4 fs-16 black font-fam fw-600">
            {t('welcome_dochyve.no_account')}  <Link className="text-primary font-fam fs-16 fw-600" href={`/${lng}/signup`}>{t("welcome_dochyve.create_account")}</Link>
          </p>
          <p className="fs-16 fw-600 font-fam">
            {t('welcome_dochyve.less_than_a_minute')}
          </p>
        </div>


        <Form>
          <Form.Item
            className="email_label fw-600 font-fam mt-8"
            label={t('form.label.address')}
            rules={[
              {
                required: true,
                message: t('form.label.address_required'),
              },
              {
                type: 'text',
                message: t('form.label.address_invalid'),
              },
            ]}
          >
            <Input className="input_email" type="email" name="email" placeholder={t('form.label.address_input')} onChange={(e) => { handleChange(e) }} />
          </Form.Item>
          <Form.Item className="email_label fw-600 font-fam"
            label={t('form.label.password')}
            rules={[
              {
                required: true,
                message: t('form.label.password_required'),
              },
            ]}
          >
            <Input className="input_email" name="password" placeholder={t('form.label.password_input')} onChange={(e) => { handleChange(e) }} />
          </Form.Item>
          <div className="text-right email_label md:w-4/5">
            <a className="text-primary  font-fam fs-16 fw-600">{t('form.forgot-password')}</a>
          </div>

          <Form.Item>
            <Button onClick={Login} className="w-4/5 text-white btn-primary input_email font-fam" >
              {t('form.sign_in')}
            </Button>
          </Form.Item>

          <div className="md:w-4/5">
            <Divider className="w-4/5 font-fam"> {t('form.login_with')}</Divider>
          </div>
        </Form>

        <div className="mt-4">
          <button className="w-4/5 text-white btn-secondary fw-700 font-fam  btn-transparent-border  font-medium rounded text-sm px-5 py-2.5 justify-center text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 w-4/5 input_email" type="button">
            <Image className="mr-3" src={google} alt="Dochyve" />
            {t('form.google')}
          </button>
        </div>

        <div className="mt-4">
          <button className="w-4/5 text-white btn-secondary fw-700 font-fam  btn-transparent-border  font-medium rounded text-sm px-5 py-2.5 justify-center text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 w-4/5 input_email" type="button">
            <Image className="mr-3" src={facebook} alt="Dochyve" />
            {t('form.fb')}
          </button>
        </div>

        <div className="text-right md:mt-52 md:ml-12 md:w-5/6">
          <p className="font-fam md:ml-10">{t('form.copy_rights')}  <a href="#" className="font-fam ml-4">{t('form.license')}</a> <a href="#" className="font-fam md:ml-4">{t('form.terms')}</a></p>
        </div>
      </div>
    </>
  );
}

export default SigninDetails;
