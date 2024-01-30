"use server"
import "../../assets/css/signup.css";
import CreatePage from "../components/Combined_Components/CreateAccount"


export default async function Page({ params: { lng } }) {

    return (
        <>
           <CreatePage lng={lng}/>
        </>
    );
}
