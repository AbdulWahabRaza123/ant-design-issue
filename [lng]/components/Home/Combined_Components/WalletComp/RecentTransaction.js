import React, { useEffect, useState } from 'react'
import right_arrow from "../../../../../../../public/admin/images/right_arrow.svg"
import arrow_down from "../../../../../../../public/admin/images/arrow_down.svg"
import arrow_up from "../../../../../../../public/admin/images/arrow-up.svg"
import Image from 'next/image'
import "./RecentTransaction.css"
import "../HomePage.css"
import { Radio, Space } from 'antd'

const payments = [
    { source: 'Payment from Lorem', amount: '$5500', status: 'Completed' },
    { source: 'Payment from Lorem', amount: '$5500', status: 'Completed' },
    { source: 'Payment from Lorem', amount: '$5500', status: 'Completed' },

];

const RecentTransaction = ({t}) => {
    const [cursorClass, setCursorClass] = useState("context-menu");
    const [clicked, setClicked] = useState([false, false, false]);


    const open = (index) => {
        setClicked((prevClicked) => {
            const newClicked = [...prevClicked].fill(false); // Close all divs
            newClicked[index] = !prevClicked[index]; // Toggle the selected div
            return newClicked;
        });
    };

    return (
        <div className=' mt-4 w-full md:w-4/6 '>
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <label className='fs-20 fw-700 font-fam'>
                        Recent Transaction
                    </label>
                </div>
                <div className={`flex gap-2  ${cursorClass}`} onMouseEnter={() => setCursorClass("pointer")}
                    onMouseLeave={() => setCursorClass("context-menu")}>
                    <label className={cursorClass}
                    >
                        View All
                    </label>
                    <Image width={4} height={10} src={right_arrow}></Image>
                </div>
            </div>
            <div className='transaction-container'>
                {payments.map((payment, index) => (
                    <div className='flex justify-between items-center  px-6 py-4' key={index}>
                        <div>
                            <p className='font-fam fs-16 fw-600'>{payment.source}</p>
                            <p className='font-fam fs-16 fw-500 status'>{payment.status}</p>
                        </div>
                        <div>
                            <p className='font-fam fs-18 fw-600 text-primary'>{payment.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mb-4 mt-6'>
                <div>
                    <label className='fs-20 fw-700 font-fam'>
                         <p className="leading-5">Lorem ipsum</p> 
                    </label>
                </div>
            </div>

            <div className='mb-4 mt-6'>
                <div className='boundary px-4 py-3  flex justify-between items-center' onClick={() => open(0)}>
                    <p className='fs-16 fw-600 font-fam'>
                        Follow up with selected payer
                    </p>
                    <Image alt='toggle' width={14} height={14} src={clicked[0] ? arrow_down : arrow_up}></Image>
                </div>
                {clicked[0] && (
                    <div className='mb-4 mt-6'>
                        <Radio.Group
                            defaultValue="A"
                        >
                            <Space direction="vertical">
                                <Radio value="A">Option A</Radio>
                                <Radio value="B">Option B</Radio>
                                <Radio value="C">Option C</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                )}
            </div>

            <div className='mb-4 mt-6'>
                <div className='boundary px-4 py-3  flex justify-between items-center' onClick={() => open(1)}>
                    <p className='fs-16 fw-600 font-fam'>
                        Select New Payer
                    </p>
                    <Image alt='toggle' width={14} height={14} src={clicked[1] ? arrow_down : arrow_up}></Image>
                </div>
                {clicked[1] && (
                    <div className='mb-4 mt-6'>
                        <Radio.Group
                            defaultValue="A"
                        >
                            <Space direction="vertical">
                                <Radio value="A">Option A</Radio>
                                <Radio value="B">Option B</Radio>
                                <Radio value="C">Option C</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                )}
            </div>

            <div className='mb-4 mt-6'>
                <div className='boundary px-4 py-3  flex justify-between items-center' onClick={() => open(2)}>
                    <p className='fs-16 fw-600 font-fam'>
                        Withdraw
                    </p>
                    <Image alt='toggle' width={14} height={14} src={clicked[2] ? arrow_down : arrow_up}></Image>
                </div>
                {clicked[2] && (
                    <div className='mb-4 mt-6'>
                        <Radio.Group
                            defaultValue="A"
                        >
                            <Space direction="vertical">
                                <Radio value="A">Option A</Radio>
                                <Radio value="B">Option B</Radio>
                                <Radio value="C">Option C</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentTransaction