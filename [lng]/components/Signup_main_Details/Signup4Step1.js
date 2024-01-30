import React from 'react'
import Image from "next/image";
import demo_schedule from "../../../../../public/demo-schedule.svg"
import { Button } from 'antd';

const Signup4Step1 = ({ format, t }) => {
    return (

        <div className="md:mt-28 mt-8">

            <Image
                src={demo_schedule}
                alt="Dochyve Logo"
                width={72}
                height={96}
            />
            <div className='about-dochyve mt-2 p-2  mw-465'>
                <h1 className='fw-700 font-fam mt-3 black'>Thank You For Scheduling Demo</h1>
                <div className=''>
                    <p className='fw-500 fs-16 black font-fam'>On {format[0]}, {format[1]},  @ {format[2]}</p>

                </div>

                <div className=''>
                    <p className='fw-500 fs-16 black font-fam mt-8'>Note: <br></br>
                        you will recieve.....</p>
                </div>

                <div className='flex gap-2 mt-44 justify-end'>
                    <Button
                        className="font-fam text-white  btn-primary md:mt-40  fw-500 fs-16 items-center group-buttons"
                        htmlType="submit"
                        onClick={next}
                    >
                        {t("signup_mainstep2.save-continue")}
                    </Button>
                </div>


            </div>
        </div>
    )
}

export default Signup4Step1