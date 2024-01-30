"use server";
 import "../../../assets/css/signup.css";
import "./page.css";
import PatientPage from "../../components/Patient/Combined_Components/PatientPage";
import Providers from "../../components/redux/provider";
function Page({ params: { lng } }) {
  return (
    <>
      <Providers>
        <PatientPage lng={lng} />
      </Providers>

    </>
  );
}
export default Page;
