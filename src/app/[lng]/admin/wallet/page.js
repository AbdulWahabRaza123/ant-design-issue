"use server";
import WalletPage from "../../components/Home/Combined_Components/WalletPage";
import Providers from "../../components/redux/provider";

function Page({ params: { lng } }) {
    return (
        <>
        <Providers>
            <WalletPage lng={lng} />
        </Providers>
        </>
    );
}
export default Page;
