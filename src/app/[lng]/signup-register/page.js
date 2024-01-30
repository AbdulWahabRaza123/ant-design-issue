"use server"
import "../../assets/css/signup.css";
import SignRegister from "../components/Combined_Components/Signup_Register"


export default async function Page({ params: { lng } }) {

    return (
        <>
           <SignRegister lng={lng}/>
        </>
    );
}
