import React from 'react'
import profile from "../../../../../../../public/admin/images/profile.svg";
import "./Bell.css";
import Image from "next/image";
import { Button } from 'antd';

const Profile = () => {
  return (
    <Image className="mr-3" src={profile} width={13} height={17} alt="profile" />
  )
}

export default Profile