"use server";
import AppointmentComp from "@/app/[lng]/components/Notifications/AppointmentComp/AppointmentComp";
function Page({ params: { lng } }) {
  return (
    <>
      <AppointmentComp lng={lng} />
    </>
  );
}
export default Page;
