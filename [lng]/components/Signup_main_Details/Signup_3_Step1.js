import Image from "next/image";
import payment_step from "../../../../../public/payment_step.svg";
import "./Signup_3_Details.css";
import "./Signup_3_Step1.css";
import { useFormState } from "../../services/methods/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./Checkout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup3Current } from "../redux/features/signupStates";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(
  "pk_test_51O6w23I9zJv7DZt5p615RJzOMpSOA0KrqBOZp16jKB8dJsjnZoNukLZzZsdI0JxvLnptKsdkjEW4xGeB8aCnqVt900ATltGT4J"
);
// const clientSecret = "sk_test_51O5pseBZi0LkmnwWASu49AfaeUd3jh0V504dJ2d0oL4Zj2VFygSesOnYdTnl7LFjOCfepAGtL7HkpeRABsbHzaGJ00CMYiTtT8";

const Signup_3_Step1 = ({
  
  updatPrevStepFromChild,
  t,
  lng,
  updatNexttStepFromChild,
}) => {
  const { push } = useRouter();
  // Initial form data
  const initialFormData = {
    cvv: null,
  };

  // Use the useFormState hook to manage form state
  const { formData, handleChange } = useFormState(initialFormData);

  const dispatch = useAppDispatch();
  const signupStates = useAppSelector((states) => states.signupState);

  const next = () => {
    updatNexttStepFromChild(signupStates.signup3Current + 1);
    push(`/${lng}/signup-step?mainstep=${3}&substep=${2}`);
  };

  const previous = () => {
    updatPrevStepFromChild(signupStates.signup3Current - 1);
    push(`/${lng}/signup-step?mainstep=${3}&substep=${0}`);
  };

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
        <p className="fw-600 fs-16 font-fam mt-8 mb-4">
          {t("signup_3_Step1.payment_selection")}
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm t={t} previous={previous} next={next} />
      </Elements>
    </div>
  );
};

export default Signup_3_Step1;
