"use server";
import "../../assets/css/signup.css";
import "./page.css";
import SigninPage from "../components/Combined_Components/SigninPage";
function Page({ params: { lng } }) {
  return (
    <>
      <SigninPage lng={lng} />
    </>
  );
}
export default Page;
