"use server";
import BellMainComp from "@/app/[lng]/components/Notifications/BellComp/BellMainComp";
function Page({ params: { lng } }) {
  return (
    <>
      <BellMainComp lng={lng} />
    </>
  );
}
export default Page;
