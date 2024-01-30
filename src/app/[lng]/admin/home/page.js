"use server";
// import "../../assets/css/signup.css";
import "./page.css";
import HomePage from "../../components/Home/Combined_Components/HomePage";
import Providers from "../../components/redux/provider";
import HomeParentPage from "../../components/Home/Combined_Components/HomeParentPage";
function Page({ params: { lng } }) {
  return (
    <>
      <Providers>
        <HomeParentPage lng={lng} />
        {/* <HomePage lng={lng} /> */}
      </Providers>
    </>
  );
}
export default Page;
