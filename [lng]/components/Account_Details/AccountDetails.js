"use-client"
import { Button, Form, Input, Space, Select, Radio, Row, Col, Spin } from "antd";
import Image from 'next/image';
import Link from "next/link";
import "./AccountDetails.css";
import "../../../assets/css/signup.css";
import "../Signin_Details/SigninDetails.css";
import plane from "../../../../../public/plane.svg"
import Cookies from 'js-cookie';
import { fetchData, postData } from "../../services/methods/api";
import { useFormState } from "../../services/methods/api";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
const { Option } = Select;
import usa from "../../../../../public/usa.svg"
import spain from "../../../../../public/spain.svg"

const AccountDetails = ({ t, lng }) => {

  const [form] = Form.useForm();
  const { push } = useRouter();
  // UseState
  const [value, setValue] = useState(1);
  const [showSpecialtyOptions, setShowSpecialtyOptions] = useState(false);
  const [specialtyOptions, setSpecialtyOptions] = useState();
  const [Roles, setRoles] = useState();
  const [practiceSizes, setPracticeSizes] = useState([]);
  const [practiceRoles, setPracticeRoles] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isResponseReceived, setIsResponseReceived] = useState(true);
  const [loading, setLoading] = useState(false);

  
  // Initial form data
  const initialFormData = {
    is_medical_billing_include: true,
  };

  // Use the useFormState hook to manage form state
  const { formData, handleChange } = useFormState(initialFormData);

  // useEffect
  useEffect(() => {
    fetchPracticeCategories();
  }, []);

  // Method
  const fetchPracticeCategories = () => {
    fetchData("/createSignupStep1").then((res) => {
      setPracticeSizes(res.data.data.services.practice_size.data);
      setPracticeRoles(res.data.data.services.practice_role.data);
      setSpecialtyOptions(res.data.data.specialities);
    });
  }

  const onFinish = (e) => {
    setLoading(true);

    postData('/create-main-signup-step1', formData)
      .then((res) => {
        setLoading(false);
        setIsResponseReceived(true);
        if (res.errors) {
          setValidationErrors(res.errors);
        } else {
          push(`/${lng}/signup-step?mainstep=${1}&substep=${0}`);

        }
      })
      .catch(error => {
        setLoading(false);
        setIsResponseReceived(true);
        if (error.response) {

        } else {
        }
      });
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

  const handleLanguageChange = (lng) => {
    push(`/${lng}/signup-register`);
  };

  return (

    <div className="md:mt-28 mt-8">
      <div className="flex  justify-end items-center">
        <Select className="language-select md:w-56" value={lng} options={options} onChange={handleLanguageChange}></Select>
      </div>
      <Image
        src={plane}
        alt="Plane"
        width={96}
        height={96}
        className=' mb-5'
      />

      <div className='about-dochyve  mw-465'>
        <h1 className='fw-700 font-fam  mt-3 mb-4 black'>{t('account.started')}</h1>
      </div>



      <Form>
        <Form.Item className="email_label fw-600 font-fam" label={t('form.label.p_name')}
          name="practice_name"
          rules={[
            {
              required: true,
            },
          ]}
          validateStatus={validationErrors?.practice_name ? 'error' : ''}
          help={validationErrors?.practice_name || ''}

        >
          <Input className="input_email" type="text" name="practice_name" placeholder={t('form.label.p_input')} onChange={(e) => { handleChange(e) }} />
        </Form.Item>

        <Space className="w-full" direction="vertical">

          <Form.Item className="email_label md:w-5/6 fw-600 font-fam" label={t('form.spec')}
            name="specialities"
            rules={[
              {
                required: true,
                message: t('form.label.p_required'),
              },
            ]}
            validateStatus={validationErrors?.specialities ? 'error' : ''}
            help={validationErrors?.specialities || ''}

          >
            <label className=" font-fam ">{t('form.apply')}</label>
            <Select
              mode="multiple"
              className="input_email multiple_select  ant-select-selection-item"
              placeholder={t('form.select_p')}
              optionLabelProp="label"
              maxTagCount={4}
              maxTagTextLength={12}
              name="specialities"
              onChange={(e) => { handleChange({ target: { name: "specialities", value: e, type: 'select-multiple', options: value } }) }}

            >
              {specialtyOptions?.map((optionValue) => (
                <Option className="custom_options" key={optionValue.id} value={optionValue.id} label={optionValue.name}>
                  <Space className="custom_options">{optionValue.name}</Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        <div>
          <label className="fs-14 fw-600 font-fam ">{t('form.hospital_system')}</label>
        </div>
        <Space direction="vertical" className="mb-4">
          <Form.Item
            rules={[
              {
                required: true,
                message: t('form.label.p_required'),
              },
            ]}
            validateStatus={validationErrors?.practice_role ? 'error' : ''}
            help={validationErrors?.practice_role || ''}
          >
            <Radio.Group
              onChange={(e) => {
                handleChange({ target: { name: "hospital_system", value: e.target.value, type: 'radio' } });
              }}
              name="hospital_system" >
              <Radio className="font-fam" value={1}>{t('form.y')} </Radio>
              <Radio className="font-fam fs-14 fw-400" value={0}>{t('form.n')}</Radio>
            </Radio.Group>

          </Form.Item>
        </Space>

        <div className="mb-4">
          <div>
            <label className="fs-14 fw-600 font-fam">{t('form.practice_size')}</label>
          </div>
          <div>
            <Form.Item
              label=""

              rules={[
                {
                  required: true,
                  message: t('form.label.p_required'),
                },
              ]}
              validateStatus={validationErrors?.practice_size ? 'error' : ''}
              help={validationErrors?.practice_size || ''}
            >
              <Radio.Group onChange={(e) => {
                handleChange({ target: { name: "practice_size", value: e.target.value, type: 'radio' } });
              }}>
                <Space direction="vertical">
                  {practiceSizes.map((item) => (
                    <Radio className="font-fam" value={item.id}>{item.title}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>

          </div>

        </div>

        <div className="mb-4">
          <div>
            <label className="fs-14 fw-600 font-fam">{t('form.role')}</label>
          </div>
          <div>
            <Form.Item
              label=""

              rules={[
                {
                  required: true,
                  message: t('form.label.p_required'),
                },
              ]}
              validateStatus={validationErrors?.practice_role ? 'error' : ''}
              help={validationErrors?.practice_role || ''}
            >
              <Radio.Group onChange={(e) => {
                handleChange({ target: { name: "practice_role", value: e.target.value, type: 'radio' } });
              }}>
                <Space direction="vertical">
                  {practiceRoles.map((item) => (
                    <Radio className="font-fam" value={item.id}>{item.title}</Radio>
                  ))}
                </Space>

              </Radio.Group>
            </Form.Item>
          </div>

        </div>

        <Form.Item className="email_label fw-600 font-fam"
          label={t('form.zipcode')}
          name="zip_code"
          rules={[
            {
              required: true,
              message: t('form.label.zipcode_required'),
            },
          ]}
          validateStatus={validationErrors?.zip_code ? 'error' : ''}
          help={validationErrors?.zip_code || ''}
        >
          <Input
            className="input_email"
            type="number" required
            name="zip_code"
            placeholder={t('form.zipcode_input')}
            onChange={(e) => { handleChange(e) }} />
        </Form.Item>

        <Form.Item label="">
          <Button
            type="primary"
            onClick={onFinish}
            className="w-4/5 fw-600 text-white btn-primary input_email font-fam"
            disabled={!isResponseReceived}
            htmlType="submit" >
            {t('form.continue')}
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
}

export default AccountDetails;
