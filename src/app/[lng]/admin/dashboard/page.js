"use server";
// import "../../assets/css/signup.css";
import "./page.css";
import DashboardPage from "../../components/Dashboard/Combined_Components/DashboardPage";
import Providers from "../../components/redux/provider";
function Page({ params: { lng } }) {
  return (
    <>
      <Providers>
        <DashboardPage lng={lng} />
        
      </Providers>

    </>
  );
}
export default Page;
