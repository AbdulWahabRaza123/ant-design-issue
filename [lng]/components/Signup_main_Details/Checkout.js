import {
    PaymentElement,
    CardElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";
  import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Space,
  } from "antd";
  import { t } from "i18next";
  import { useEffect, useState } from "react";
  import amex from "../../../../../public/amex.svg";
  import visa from "../../../../../public/visa.svg";
  import mastercard from "../../../../../public/master-card.svg";
  import discover from "../../../../../public/discover.svg";
  import paypal from "../../../../../public/paypal.svg";
  import apple_pay from "../../../../../public/apple_pay.svg";
  import Image from "next/image";
  import "./Signup_3_Step1.css";
  import { fetchData, postData, useFormState } from "../../services/methods/api";
  
  const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: 500,
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#bfbfbf" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  const CheckoutForm = ({ t, next, previous }) => {
    const [radio1Value, setRadio1Value] = useState(null);
    const [radio2Value, setRadio2Value] = useState(null);
    const [radio3Value, setRadio3Value] = useState(null);
    const [form1Visible, setForm1Visible] = useState(false);
    const [form2Visible, setForm2Visible] = useState(false);
    const [form3Visible, setForm3Visible] = useState(false);
    const [paymentHeader1Color, setPaymentHeader1Color] = useState("#fff");
    const [paymentHeader2Color, setPaymentHeader2Color] = useState("#fff");
    const [paymentHeader3Color, setPaymentHeader3Color] = useState("#fff");
  
    const [shippingForm, setShippingForm] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [stateOptions, setStateOptions] = useState([]);
  
    const stripe = useStripe();
    const elements = useElements();
  
    const initialFormData = {
      payment_method_id: "",
      billing_address: "",
      city: "",
      state: "",
      zip_code: null,
    };
  
    // Use the useFormState hook to manage form state
    const { formData, handleChange } = useFormState(initialFormData);
  
    const Back = () => {
      previous();
    };
  
    const handleRadioChange = (e) => {
      const { value } = e.target;
      setForm1Visible(false);
      setForm2Visible(false);
      setForm3Visible(false);
      // Reset all radio values
      setRadio1Value(null);
      setRadio2Value(null);
      setRadio3Value(null);
      setPaymentHeader1Color("");
      setPaymentHeader2Color("");
      setPaymentHeader3Color("");
  
      if (value === "showForm") {
        setForm1Visible(true);
        setRadio1Value("showForm");
        setPaymentHeader1Color("clicked-payment-header");
      } else if (value === "showForm2") {
        setForm2Visible(true);
        setRadio2Value("showForm2");
        setPaymentHeader2Color("clicked-payment-header");
      } else if (value === "showForm3") {
        setForm3Visible(true);
        setRadio3Value("showForm3");
        setPaymentHeader3Color("clicked-payment-header");
      }
  
      if (value === 0) {
        setShippingForm(true);
      } else {
        setShippingForm(false);
      }
    };
  
    useEffect(() => {
      fetchStates();
    }, []);
  
    function fetchStates() {
      fetchData("create-user-licensed-states").then((res) => {
        if (res) setStateOptions(res.data.data.states);
      });
    }
  
    const handleStateChange = (value) => {
      //In this handle state I am getting the dropdown value as I was not able to get the name of select tag so I am getting its values only
      setSelectedState(value);
    };
  
    formData.state = selectedState;
  
    const handleSubmit = async (event) => {
      const cardElement = elements.getElement("card");
      let result = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        // billing_details: {
        //   address: {
        //     city: values.city,
        //     line1: values.address,
        //     postal_code: values.zip,
        //     state: values.state
        //   },
        //   email: "janedoe@example.com",
        //   name: values.name,
        //   phone: "555-555-5555"
        // }
      });
      console.log(result);
  
      formData.payment_method_id = result.paymentMethod.id;
      formData.state = selectedState;
      postData("/store-registration-main-step3substep2", formData)
        .then((res) => {
          next();
        })
        .catch((error) => {
          if (error.response) {
          } else {
          }
        });
    };
  
    return (
      <Form>
        <div className="payment-box mb-4">
          <div className={`intialpaymentheader p-4 ${paymentHeader1Color}`}>
            <div className="flex justify-between ">
              <Radio.Group onChange={handleRadioChange} value={radio1Value}>
                <Radio className="payment_type" value="showForm">
                  {t("signup_3_Step1.credit_card")}
                </Radio>
              </Radio.Group>
              <div className="flex gap-4">
                <Image src={amex} alt="Amex" width={35} height={9} />
                <Image src={visa} alt="Visa" width={35} height={9} />
  
                <Image src={mastercard} alt="Mastercard" width={35} height={9} />
  
                <Image src={discover} alt="Discover" width={35} height={9} />
              </div>
            </div>
          </div>
          {radio1Value === "showForm" && (
            <Form className="p-4 mb-4 mt-4" layout="vertical">
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("signup_3_Step1.name_on_card")}
                rules={[
                  {
                    required: true,
                    message: t("form.label.address_required"),
                  },
                ]}
              >
                <Input
                  className="w-100 input_email"
                  type="text"
                  name="card_name"
                  placeholder="Card Name"
                />
              </Form.Item>
  
              <CardElement options={CARD_ELEMENT_OPTIONS} />
              <div>
                <Checkbox htmlType="checkbox">
                  {t("signup_3_Step1.save_info")}
                </Checkbox>
                <div>
                  <p>{t("signup_3_Step1.question_save_info")}</p>
                </div>
              </div>
            </Form>
          )}
        </div>
        <div className="payment-box mb-4">
          <div className={`intialpaymentheader p-4 ${paymentHeader2Color}`}>
            <div className="flex justify-between ">
              <Radio.Group onChange={handleRadioChange} value={radio2Value}>
                <Radio className="payment_type" value="showForm2">
                  {t("signup_3_Step1.paypal")}
                </Radio>
              </Radio.Group>
              <div className="flex gap-4">
                <Image src={paypal} alt="Paypal" width={56} height={15} />
              </div>
            </div>
          </div>
  
          {radio2Value === "showForm2" && (
            <Form className="p-4 mt-4" layout="vertical">
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("signup_3_Step1.name_on_card")}
                rules={[
                  {
                    required: true,
                    message: t("form.label.address_required"),
                  },
                ]}
              >
                <Input
                  className="w-100 input_email"
                  type="email"
                  name="email"
                  placeholder={t("signup_3_Step1.enter_card_name")}
                />
              </Form.Item>
  
              <div className="mt-2">
                <Checkbox htmlType="checkbox">
                  {t("signup_3_Step1.save_info")}
                </Checkbox>
                <div>
                  <p>{t("signup_3_Step1.question_save_info")}</p>
                </div>
              </div>
            </Form>
          )}
        </div>
  
        <div className="payment-box">
          <div className={`intialpaymentheader p-4 ${paymentHeader3Color}`}>
            <div className="flex justify-between ">
              <Radio.Group onChange={handleRadioChange} value={radio3Value}>
                <Radio className="fw-600 font-fam payment_type" value="showForm3">
                  {t("signup_3_Step1.apple_pay")}
                </Radio>
              </Radio.Group>
              <div className="flex gap-4">
                <Image src={apple_pay} alt="Apple Pay" width={38} height={15} />
              </div>
            </div>
          </div>
          {radio3Value === "showForm3" && (
            <Form className="p-4 mt-4" layout="vertical">
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("signup_3_Step1.apple_id")}
                rules={[
                  {
                    required: true,
                    message: t("form.label.address_required"),
                  },
                  {
                    type: "email",
                    message: t("form.label.address_invalid"),
                  },
                ]}
              >
                <Input
                  className="w-100 input_email"
                  type="email"
                  name="apple_id"
                  placeholder={t("signup_3_Step1.enter_apple_id")}
                />
              </Form.Item>
  
              <div className="">
                <Checkbox htmlType="checkbox">
                  {t("signup_3_Step1.save_info")}
                </Checkbox>
                <div className="ml-5">
                  <p>{t("signup_3_Step1.question_save_info")}</p>
                </div>
              </div>
            </Form>
          )}
        </div>
  
        <div className="about-dochyve mt-4 ">
          <p className="fw-600 fs-16 font-fam mt-8 mb-4">
            Please provide Billing / Shipping Address
          </p>
        </div>
  
        <Form className="p-4" layout="vertical">
          <Form.Item
            className="email_label fw-600 font-fam"
            label={t("signup_3_Step1.billing_address")}
            // name="billing_address"
            rules={[
              {
                required: true,
                message: t("form.label.address_required"),
              },
              {
                type: "email",
                message: t("form.label.address_invalid"),
              },
            ]}
          >
            <Input
              className="w-100 input_email"
              type="text"
              name="billing_address"
              placeholder={t("signup_substep4.Address#1_Placeholder")}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Item>
  
          <Form.Item
            className="email_label fw-600 font-fam"
            label={t("signup_substep4.Address#2")}
            rules={[
              {
                required: true,
                message: t("form.label.address_required"),
              },
              {
                type: "email",
                message: t("form.label.address_invalid"),
              },
            ]}
          >
            <Input
              className="w-100 input_email"
              type="email"
              name="email"
              placeholder={t("signup_substep4.Address#1_Placeholder")}
            />
          </Form.Item>
  
          <Row gutter={[8, 8]}>
            <Col className="gutter-row " xs={24} md={8} lg={8}>
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("signup_substep4.city")}
                // name="city"
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
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Form.Item>
            </Col>
  
            <Col className="gutter-row " xs={24} md={8} lg={8}>
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
                  optionLabelProp="label"
                  allowClear={true}
                  name="state"
                  onChange={handleStateChange}
                  // onChange={(e) => handleChange({ target: { name: "state", value: e } })}
                  // value={selectedState}
                  // defaultValue="alabama"
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
              </Form.Item>
            </Col>
            <Col className="gutter-row " xs={24} md={8} lg={8}>
              <Form.Item
                className="email_label fw-600 font-fam"
                label={t("form.zipcode")}
                name="zip_code"
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
                  name="zip_code"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Space direction="vertical" className="mb-4 mt-4">
            <Radio.Group
              onChange={handleRadioChange}
              name="medical_billing_answers"
            >
              <p className="fw-600 fs-16 font-fam mb-4 ">
                Does Your Billing & Shipping Address are same?
              </p>
              <Radio className="font-fam" value={1}>
                {t("form.y")}
              </Radio>
              <Radio className="font-fam fs-14 fw-400" value={0}>
                {t("form.n")}
              </Radio>
            </Radio.Group>
          </Space>
        </Form>
  
        {shippingForm === true && (
          <Form className="p-4" layout="vertical">
            <Form.Item
              className="email_label fw-600 font-fam"
              label={t("signup_3_Step1.shipping_address")}
              rules={[
                {
                  required: true,
                  message: t("form.label.address_required"),
                },
                {
                  type: "email",
                  message: t("form.label.address_invalid"),
                },
              ]}
            >
              <Input
                className="w-100 input_email"
                type="text"
                name="email"
                placeholder={t("signup_substep4.Address#1_Placeholder")}
              />
            </Form.Item>
  
            <Form.Item
              className="email_label fw-600 font-fam"
              label={t("signup_substep4.Address#2")}
              rules={[
                {
                  required: true,
                  message: t("form.label.address_required"),
                },
                {
                  type: "email",
                  message: t("form.label.address_invalid"),
                },
              ]}
            >
              <Input
                className="w-100 input_email"
                type="text"
                name="email"
                placeholder={t("signup_substep4.Address#1_Placeholder")}
              />
            </Form.Item>
  
            <Row gutter={[8, 8]}>
              <Col className="gutter-row " xs={24} md={8} lg={8}>
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
                  />
                </Form.Item>
              </Col>
  
              <Col className="gutter-row " xs={24} md={8} lg={8}>
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
                    className="input_email ant-select-selection-item"
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
                </Form.Item>
              </Col>
              <Col className="gutter-row " xs={24} md={8} lg={8}>
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
                    name="zipcode"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
  
        <div className="flex gap-2 items-center justify-end">
          <Button
            className="btn-secondary next group-buttons group-buttons md:mt-40  font-fam fs-16 fw-500"
            onClick={() => Back()}
          >
            {t("signup_substep2.back")}
          </Button>
  
          <Button
            className="font-fam text-white  btn-primary md:mt-40  fw-500 fs-16 items-center group-buttons"
            htmlType="submit"
            onClick={handleSubmit}
          >
            {t("signup_mainstep2.save-continue")}
          </Button>
        </div>
      </Form>
    );
  };
  
  export default CheckoutForm;
  