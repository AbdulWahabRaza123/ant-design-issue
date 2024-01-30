import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Table,
} from "antd";
import Image from "next/image";
import payment_step from "../../../../../public/payment_step.svg";
import yellow_tick from "../../../../../public/yellow_tick.svg";
import blue_tick from "../../../../../public/blue_tick.svg";
import gray_tick from "../../../../../public/gray_tick.svg";
import "./Signup_3_Details.css";
import { fetchData, postData, useFormState } from "../../services/methods/api";
import "./Signup_3_Step0.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter } from "next/navigation";
const Signup_3_Step0 = ({
  updatNexttStepFromChild,
  mainstep,
  setMainStep,
  t,
  updateMainStepFromChild,
  updateMainPreviousFromChild,
  lng,
}) => {
  const { push } = useRouter();
  const [showDoctors, SetShowDoctors] = useState([]);
  const [subTotal, SetSubTotal] = useState(0);
  const [annualCharges, setAnnualCharges] = useState(0);
  const [tax1Amount, setTax1Amount] = useState(0);
  const [tax2Amount, setTax2Amount] = useState(0);
  const [totalProviderPrice, setTotalProviderPrice] = useState(0);
  const [monthlywithBilling, setmonthlywithBilling] = useState(0);
  const [monthlywithoutBilling, setmonthlywithoutBilling] = useState(0);
  const [annualSubscription, setannualSubscription] = useState(0);
  const [totalProviders, setTotalProviders] = useState(0);
  const [providerFee, setProviderFee] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [header1Color, setHeader1Color] = useState("bg-silver");
  const [header2Color, setHeader2Color] = useState("bg-silver");
  const [text1Color, setText1Color] = useState("black");
  const [text2Color, setText2Color] = useState("black");
  const [basicImage, setBasicImage] = useState(gray_tick);
  const [premiumImage, setPremiumImage] = useState(gray_tick);
  const [borderBasic, setBorderBasic] = useState("1px solid #8b8b8b");
  const [borderPremium, setBorderPremium] = useState("");
  const [boxShadow1, setBoxShadow1] = useState("0px 0px 16px 4px #43424275");
  const [boxShadow2, setBoxShadow2] = useState("");

  const [subscriptionPlans, setSubscriptionPlans] = useState();

  const [selectedCardId, setSelectedCardId] = useState(0);

  const initialFormData = {
    plan_id: null,
  };

  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  console.log(signupStates);

  // Use the useFormState hook to manage form state
  const { formData, handleChange } = useFormState(initialFormData);

  const prev = () => {
    updateMainPreviousFromChild(mainstep - 1);
    push(`/${lng}/signup-step?mainstep=${2}&substep=${0}`);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  async function fetchProviders() {
    fetchData("/create-registration-main-step3").then((res) => {
      if (res) {
        setmonthlywithBilling(res.data.data.monthly_subscription);
        setmonthlywithoutBilling(res.data.data.monthly_subscription_vice_verse);
        setannualSubscription(res.data.data.year_subscription);
        let provider_price = res.data.data.provider_fee;
        setProviderFee(res.data.data.provider_fee);
        // SetShowDoctors(saveDoctors(res.data.data.provider_count, provider_price));
        SetSubTotal(res.data.data.sub_total);
        setAnnualCharges(res.data.data.annual_charges);
        setTax1Amount(res.data.data.subscription_plans[0].tax_amount);
        setTax2Amount(res.data.data.subscription_plans[1].tax_amount);

        setTotalProviderPrice(res.data.data.total_provider_price);
        setSubscriptionPlans(res.data.data.subscription_plans);
        setTotalProviders(res.data.data.provider_count);
        setTaxPercent(res.data.data.tax_pecentage);
      }
    });
  }

  const handleCardClick = (id) => {
    setSelectedCardId(id);

    if (id === 1) {
      setHeader1Color("bg-primary");
      setHeader2Color("bg-silver");
      setText1Color("text-white");
      setText2Color("black");
      setBasicImage(blue_tick);
      setPremiumImage(gray_tick);
      //   setBorderBasic("1px solid #8b8b8b");
      setBorderPremium("");
      setBoxShadow1("0px 0px 16px 4px #43424275");
      setBoxShadow2("");
    } else if (id === 2) {
      setHeader2Color("bg-primary");
      setHeader1Color("bg-silver");
      setText2Color("text-white");
      setText1Color("black");
      setPremiumImage(blue_tick);
      setBasicImage(gray_tick);
      // setBorderPremium("1px solid #8b8b8b");
      setBorderBasic("");
      setBoxShadow2("0px 0px 16px 4px #43424275");
      setBoxShadow1("");
    } else if (id === 3) {
      // Handle card with ID 3
    } else {
      // Handle other cases
    }
  };

  const next = () => {
    formData.plan_id = selectedCardId;
    postData("/store-registration-main-step3", formData)
      .then((res) => {
        updatNexttStepFromChild(signupStates.signup3Current + 1);
      })
      .catch((error) => {
        if (error.response) {
        } else {
        }
      });
  };

  useEffect(() => {
    handleCardClick(1); // Set the default selection to card with ID 1
  }, []);

  return (
    <div className="md:mt-28 mt-8">
      <Image src={payment_step} alt="Dochyve Logo" width={72} height={96} />
      <div className="about-dochyve mt-4 ">
        <h1 className="fw-700 font-fam  mt-3 black">
          {t("signup_mainstep3.title")}
        </h1>
        <p className="fw-600 fs-16 font-fam mt-8 mb-4">
          {t("signup_mainstep3.description")}
        </p>
      </div>
      <Form>
        <Space direction="vertical" className="mb-4 w-full mt-4">
          <Alert
            className="custom-alert md:w-5/6"
            message=<span className="font-fam fw-700 text-primary">
              {t("signup_3_Step0.verification")}
            </span>
            type="warning"
            closable
          />

          <div className="main-card md:grid gap-4 grid-cols-3">
            {subscriptionPlans?.map((plan) => {
              let image_render;
              let taxamount;

              if (plan.id === 1) {
                image_render = gray_tick;
                taxamount = plan.tax_amount;
              }
              if (plan.id === 2) {
                image_render = gray_tick;
                taxamount = plan.tax_amount;
              }
              if (plan.id === 3) {
                image_render = blue_tick;
              }

              return (
                <div
                  key={plan.id}
                  className={`rounded-lg md:mt-8 card-hover card-shadow`}
                  style={{
                    border:
                      plan.id === 1
                        ? borderBasic
                        : plan.id === 2
                        ? borderPremium
                        : "",
                    boxShadow:
                      plan.id === 1
                        ? boxShadow1
                        : plan.id === 2
                        ? boxShadow2
                        : "",
                  }}
                  onClick={() => handleCardClick(plan.id)}
                >
                  <div
                    className={`p-3 left-right-radius  text-center ${
                      plan.id === 1
                        ? header1Color
                        : plan.id === 2
                        ? header2Color
                        : ""
                    }`}
                  >
                    <h5
                      className={`mb-2 p-1  fw-700 font-fam ${
                        plan.id === 1
                          ? text1Color
                          : plan.id === 2
                          ? text2Color
                          : ""
                      }`}
                    >
                      {plan.plan_name}
                    </h5>
                    <h1
                      className={`font-fam fw-600 ${
                        plan.id === 1
                          ? text1Color
                          : plan.id === 2
                          ? text2Color
                          : ""
                      }`}
                    >
                      {plan.amount}
                    </h1>
                    <h5
                      className={`mb-2 fw-500 font-fam ${
                        plan.id === 1
                          ? text1Color
                          : plan.id === 2
                          ? text2Color
                          : ""
                      }`}
                    >
                      /{plan.sub_titled}
                    </h5>
                    {plan.plan_name === "Premium" ? (
                      <h5 className={`font-fam fw-600 ${text2Color}`}>
                        Save {plan.discount_percent}%
                      </h5>
                    ) : (
                      <h5>&nbsp;</h5>
                    )}
                  </div>

                  <div className="total-provider pl-4 pr-4 py-2 flex  justify-between">
                    <h5 className="fw-600 font-fam">
                      {t("signup_3_Step0.total_provider")}
                    </h5>
                    <h5 className="fw-600  font-fam">{totalProviders}</h5>
                  </div>
                  <Divider className="bg-silver  mt-0.5 mb-1" />
                  <div className="total-provider pl-4 pr-4 py-2 flex justify-between">
                    <h5 className="fw-600 font-fam">
                      {t("signup_3_Step0.monthly_fee")}
                    </h5>
                    <h5 className="fw-600  font-fam">{providerFee}</h5>
                  </div>
                  <Divider className="bg-silver  mt-0.5 mb-1" />

                  <div className="total-provider pl-4 pr-4 py-2 flex justify-between">
                    <h5 className="fw-600 font-fam">
                      {t("signup_3_Step0.tax")} {taxPercent}%
                    </h5>
                    <h5 className="fw-600  font-fam">{taxamount}</h5>
                  </div>
                  <Divider className="bg-silver  mt-0.5 mb-1" />

                  <div className="feature-text">
                    <h5 className="text-silver  fw-700 font-fam">
                      {t("signup_3_Step0.features")}
                    </h5>
                  </div>

                  <div className="p-4 pb-2 mb-2">
                    {plan.subscription_features.map((val, key) => (
                      <div key={key}>
                        <div className="flex mb-2 gap-2">
                          <Image
                            src={
                              plan.id === 1
                                ? basicImage
                                : plan.id === 2
                                ? premiumImage
                                : ""
                            }
                            alt="Dochyve Logo"
                            width={20}
                            height={20}
                          />
                          <h5 className="fw-700 font-fam">{val.name}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 justify-end md:mb-7  md:mt-52">
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
        </Space>
      </Form>
    </div>
  );
};

export default Signup_3_Step0;
