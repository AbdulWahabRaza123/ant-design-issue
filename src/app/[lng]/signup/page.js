"use server";
import "../../assets/css/signup.css";
import "./page.css";
import SignupPage from "../components/Combined_Components/SignupPage";
function Page({ params: { lng } }) {
  return (
    <>
      <SignupPage lng={lng} />
    </>
  );
}
export default Page;
