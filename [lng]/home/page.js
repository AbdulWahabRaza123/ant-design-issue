"use server";
import HomePage from "../components/Home/Combined_Components/HomePage"; 

function Page({ params: { lng } }) {
  return (
    <>
      <HomePage lng={lng} />
    </>
  );
}
export default Page;
