"use server";
// import "../../assets/css/signup.css";

 import HomePage from "../../components/Combined_Components/CreateAccount";
function Page({ params: { lng } }) {
  return (
    <>
      <HomePage lng={lng} />
    </>
  );
}
export default Page;
