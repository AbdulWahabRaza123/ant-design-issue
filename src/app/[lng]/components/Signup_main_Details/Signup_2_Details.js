import React, { useEffect, useState } from "react";
import Image from "next/image";
import price_book from "../../../../../public/price_book.svg";
import { Button, Collapse, Form, Radio, Space } from "antd";
import "./Signup_2_Details.css";
import { fetchData, postData, useFormState } from "../../services/methods/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { setSignup2Current } from "../redux/features/signupStates";
import { setSignup1Current } from "../redux/features/signupStates";
const Signup_2_Details = ({
  t,
  lng,
  updateMainStepFromChild,
  updatPrevStepFromChild,
  updateMainPreviousFromChild,
  mainstep,
  //   current,
  //   setCurrent,
}) => {
  // Initial form data
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);
  console.log(signupStates);

  const initialFormData = {
    is_medical_billing_include: true,
  };
  // const [current, setCurrent] = useState(0);

  const { formData, handleChange } = useFormState(initialFormData);

  const { Panel } = Collapse;
  const [value, setValue] = useState(true);
  let additional_charges;

  const [FeeWithBilling, setFeeWithBilling] = useState(null);
  const [FeeWithoutBilling, setFeeWithoutBilling] = useState(null);

  const [Faqs, setFaqs] = useState([{}]);

  let price;

  if (value == true) {
    price = FeeWithBilling;
    const additional_price = "3.5%";
    additional_charges = t("signup_mainstep2.additional_charges").replace(
      "percentage",
      additional_price
    );
  }

  if (value == false) {
    price = FeeWithoutBilling;
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // useEffect
  useEffect(() => {
    fetchSubscriptionFee();
  }, []);
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const searchValue = urlParams.get("substep") || 0;
  //   if (searchValue >= 0) {
  //     dispatch(setSignup2Current(searchValue));
  //   } else {
  //     return;
  //   }

  // }, [useSearchParams]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const main = urlParams.get("mainstep");
    const substep = urlParams.get("substep");
    if (!substep) {
      push(`/${lng}/signup-step?mainstep=${main}&substep=${0}`);
      dispatch(setSignup2Current(0));
    }
  }, []);
  const fetchSubscriptionFee = () => {
    fetchData("/create-registration-main-step2").then((res) => {
      setFeeWithBilling(res.data.data.prices.sf_with_billing);
      setFeeWithoutBilling(res.data.data.prices.sf_without_billing);
      setFaqs(res.data.data.faqs);
    });
  };

  const next = () => {
    postData("/store-registration-main-step2", formData)
      .then((res) => {
        if (res.errors) {
        } else {
          //   push(`/${lng}/signup-step`);
          updateMainStepFromChild(signupStates.signup2Current);
        }
      })
      .catch((error) => {
        setLoading(false);
        setIsResponseReceived(true);
        if (error.response) {
        } else {
        }
      });
  };

  const prev = () => {
    // if (signupStates.signup2Current === 0) {
    const temp = mainstep - 1;
    updateMainPreviousFromChild(3);
    push(
      `/${lng}/signup-step?mainstep=${temp}&substep=${signupStates.signup1Current}`
    );

    // } else {
    // //   const temp = signupStates.signup2Current - 1;
    //   updatPrevStepFromChild(temp);

    //   push(
    //     `/${lng}/signup-step?mainstep=${mainstep - 1}&substep=${parseInt(temp)}`
    //   );
    // }
    // // dispatch(setSignup1Current(parseInt(signupStates.signup1Current) - 1));
  };

  return (
    <div className="md:mt-28 mt-8">
      <Image src={price_book} alt="Dochyve Logo" width={72} height={96} />
      <div className="about-dochyve mt-4  mw-465">
        <h1 className="fw-700 font-fam  mt-3  black">
          {t("signup_mainstep2.title")}
        </h1>
        <p className="fw-600 fs-16 font-fam mt-8   mb-4 ">
          {t("signup_mainstep2.description")}
        </p>
      </div>
      <Form>
        <Space direction="vertical" className="mb-4 mt-4">
          <Radio.Group
            onChange={(e) => {
              onChange(e);
              handleChange({
                target: {
                  name: "is_medical_billing_include",
                  value: e.target.value,
                  type: "radio",
                },
              });
            }}
            value={value}
            name="is_medical_billing_include"
          >
            <p className="fw-600 fs-16 font-fam mb-4 ">
              {t("signup_mainstep2.radio_title")}
            </p>
            <Radio className="font-fam" value={true}>
              {t("form.y")}
            </Radio>
            <Radio className="font-fam fs-14 fw-400" value={false}>
              {t("form.n")}
            </Radio>
          </Radio.Group>

          <div className="fs-16 fw-600 font-fam mt-4 ">
            {t("signup_mainstep2.subscription_fee")}
          </div>
          <div
            className="price-display btn-primary  fw-700 text-white font-fam fs-24 text-center "
            style={{ width: "111px", borderRadius: "5px", height: "44px" }}
          >{`$${price}`}</div>
          <div className="fs-16 fw-600 font-fam">
            <label>{additional_charges}</label>
          </div>
          <>
            <h3 className="font-fam fw-700 md:mt-8">
              {t("signup_mainstep2.faqs")}
            </h3>

            <Collapse className="custom-collapse" size="large" accordion>
              {Faqs.map((faq) => (
                <Panel header={faq.question} key={faq.id}>
                  <p>{faq.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </>
          <div className="flex md:mt-40 gap-2 justify-end items-center">
            <Button
              className="btn-secondary next group-buttons group-buttons  font-fam fs-16 fw-500"
              onClick={() => prev()}
            >
              {t("signup_substep2.back")}
            </Button>
            <Button
              className="font-fam text-white  btn-primary  fw-500 fs-16 items-center group-buttons"
              onClick={next}
              htmlType="submit"
            >
              {t("signup_mainstep2.save-continue")}
            </Button>
          </div>
        </Space>
      </Form>
    </div>
  );
};

export default Signup_2_Details;
