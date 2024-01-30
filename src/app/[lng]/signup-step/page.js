"use server";
import "../../assets/css/signup.css";
import SignUp_1_Page from "../components/Combined_Components/Signup_1_Page";
// import Providers from "@/app/[lng]/components/redux/provider";
import Providers from "../components/redux/provider";

export default async function Page({ params: { lng }, t }) {
  return (
    <>
      <Providers>
        <SignUp_1_Page t={t} lng={lng} />
      </Providers>
    </>
  );
}
