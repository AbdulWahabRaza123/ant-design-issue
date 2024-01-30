import React from 'react'
import bell from "../../../../../../../public/admin/images/bell.svg";
import features from "../../../../../../../public/admin/images/features.svg";
import doctor1 from "../../../../../../../public/admin/images/doctor1.svg";
import "./Bell.css";
import Image from "next/image";
import { Button } from 'antd';
import "./Feature.css"

const Feature = () => {
  return (
    <Button className='no-border shadow-none feature-responsive'>
         <Image className="mr-3" src={features} width={30} height={40} alt="features" />
    </Button>
  )
}

export default Feature