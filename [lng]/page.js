import Link from "next/link";
import { useTranslation } from "../i18n";
import { Footer } from "./components/Footer";



export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng);

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
      {/* <StringInputs lng={lng} placeholder="Enter string only" type="email" />
      <NumberInputs placeholder="Enter numbers only" /> */}
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>

      {/* <Footer lng={lng} data={lng === "en" ? data : de} /> */}
    </>
  );
}
