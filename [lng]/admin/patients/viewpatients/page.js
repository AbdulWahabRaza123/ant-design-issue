"use server";
import "../../../../assets/css/signup.css";
import "./page.css";
import AllPatient from "../../../../[lng]/components/Patient/Combined_Components/AllPatients";
import Providers from "../../../components/redux/provider";
function Page({ params: { lng } }) {
  return (
    <>
      <Providers>
        <AllPatient lng={lng} />
      </Providers>

    </>
  );
}
export default Page;
