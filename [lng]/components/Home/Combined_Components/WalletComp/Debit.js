import React from 'react'
import green_arrow from "../../../../../../../public/admin/images/green_arrow.svg"
import Image from 'next/image'

const Debit = () => {
    return (
        <div className="card-background p-6">
            <div className="">
                <p className="text-white font-fam fs-16 fw-500">Balance</p>
                <h2 className="fw-600 fs-24 text-white font-fam mt-4">$3,403.09</h2>
            </div>

            <div className="comparison flex gap-2">
                <Image src={green_arrow}></Image>
                <label className="fw-500 font-fam">15% compared with last month</label>
            </div>

            <div className="comparison">
                <h2 className="fw-600 fs-16 text-white font-fam mt-9">Muhammad Ibrahim</h2>
            </div>
        </div>
    )
}

export default Debit