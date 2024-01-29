import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import Image from "next/image";
import payment_step from "../../../../../public/payment_step.svg";
import "./Signup_3_Details.css";
import "./Signup_3_Step1.css";
import { fetchData, useFormState } from "../../services/methods/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup3Current } from "../redux/features/signupStates";
import { useRouter } from "next/navigation";
const Signup_3_Step2 = ({
  updatPrevStepFromChild,
  current,
  t,
  lng,
  updatNexttStepFromChild,
  updateMainStepFromChild,
}) => {
  const { push } = useRouter();
  const [subscriptionType, setSubscriptionType] = useState("");
  const [subscriptionLimit, setSubscriptionLimit] = useState("");
  const [providerFee, setProviderFee] = useState("");
  const [providerCount, setProviderCount] = useState("");
  const [tax, setTax] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [totalPaidAmount, settotalPaidAmount] = useState("");

  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  const next = () => {
    updateMainStepFromChild();
    push(`/${lng}/signup-step?mainstep=${4}&substep=${0}`);
  };

  //   const prev = () => {
  //     updatPrevStepFromChild(signupStates.signup3Current - 1);
  //   };

  let total_fee;

  const prev = () => {
    updatPrevStepFromChild(current - 1);
    push(`/${lng}/signup-step?mainstep=${3}&substep=${1}`);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = () => {
    fetchData("/create-registration-main-step3SubStep3").then((res) => {
      setSubscriptionType(res.data.data.subcription_type);
      setSubscriptionLimit(res.data.data.subscription_limit);
      setProviderFee(res.data.data.provider_fee);
      setProviderCount(res.data.data.provider_count);
      setTax(res.data.data.tax);
      setTaxPercent(res.data.data.tax_percentage);
      settotalPaidAmount(res.data.data.total_amount);
    });
  };

  total_fee = providerFee * providerCount;

  return (
    <div className="md:mt-28 mt-8">
      <Image src={payment_step} alt="Dochyve Logo" width={72} height={96} />
      <div className="about-dochyve mt-4 ">
        <h1 className="fw-700 font-fam  mt-3 black">
          {t("signup_mainstep3.title")}
        </h1>
        <p className="fw-600 fs-16 font-fam mt-8 mb-1">
          {t("signup_3_Step2.save_invoice")}
        </p>
        <p className="fw-600 fs-16 font-fam  mb-4">
          {t("signup_3_Step2.charge_account")}
        </p>
      </div>

      <Card
        bordered={false}
        style={{
          width: 500,
        }}
      >
        <div className="mb-2">
          <h2 className="font-fam fw-700 fs-24">
            {t("signup_3_Step2.subscription_summary")}
          </h2>
        </div>

        <Divider />
        <div className="mb-4">
          <p className="font-fam fw-600 fs-16">
            {t("signup_3_Step2.subscription_type")}
          </p>
          <label className="font-fam fw-600 fs-16">{subscriptionType}</label>
        </div>
        <div className="mb-4">
          <p className="font-fam fw-600 fs-16">
            {t("signup_3_Step2.subscription_limit")}
          </p>
          <label className="font-fam fw-600 fs-16">{subscriptionLimit}</label>
        </div>

        <div className="mb-4">
          <p className="font-fam fw-600 fs-16">
            {t("signup_3_Step2.provider_fee")}
          </p>
          <label className="font-fam fw-600 fs-16">
            ${providerFee} x {providerCount} = ${total_fee}
          </label>
        </div>

        <div className="mb-4">
          <p className="font-fam fw-600 fs-16">
            {t("signup_3_Step2.tax")} ({taxPercent}%){" "}
          </p>
          <label className="font-fam fw-600 fs-16">{tax}</label>
        </div>
        <Divider />

        <div className="mb-4">
          <p className="font-fam fw-600 fs-16">
            {t("signup_3_Step2.total_amount")}
          </p>
          <label className="font-fam fw-600 fs-16">{totalPaidAmount}</label>
        </div>
      </Card>

      <div className="flex gap-2 mt-6 md:w-5/6  items-center md:justify-end">
        <Button
          className="btn-secondary next group-buttons group-buttons md:mt-40  font-fam fs-16 fw-500"
          onClick={() => prev()}
        >
          {t("signup_substep2.back")}
        </Button>

        <Button
          className="font-fam text-white  btn-primary md:mt-40  fw-500 fs-16 items-center group-buttons"
          htmlType="submit"
          onClick={next}
        >
          {t("signup_mainstep2.save-continue")}
        </Button>
      </div>
    </div>
  );
};

export default Signup_3_Step2;
