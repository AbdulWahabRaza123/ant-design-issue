import React, { useEffect, useState } from 'react'
import wallet from "../../../../../../../public/admin/images/wallet.svg";
import "./Bell.css";
import Image from "next/image";
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

const Profile = (t) => {
  const [lng, setLng] = useState("en");
  const { push } = useRouter();


  useEffect(() => {
    const temp = localStorage.getItem("lng");
    setLng(temp);
  }, []);


  const GotoWallet = () => {
    push(`/${lng}/admin/wallet`);
  };
  return (

    <Image className="mr-3" src={wallet} width={17} height={17} alt="wallet" onClick={GotoWallet} />

  )
}

export default Profile