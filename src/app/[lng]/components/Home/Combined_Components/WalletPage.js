
"use client";
import React, { useState, useEffect } from "react";
import { Col } from "antd";
import CustomRow from "../../CustomComponents/CustomRow";
import { Space } from "antd";
import Image from "next/image";
import "./HomePage.css";
import Loader from "../../Spinner/Loader";
import LoadingTimer from "../../Loader/LoadingTimer";
import { useTranslation } from "../../../../i18n/index";
import Layout from "../../../layout";
import AdminRow from "../../CustomComponents/AdminRow";
import atm from "../../../../../../public/admin/images/atm.svg"
import Debit from "./WalletComp/Debit"
import Transaction from "./WalletComp/RecentTransaction"
import "./WalletPage.css"

function WalletPage({ lng }) {
    const [isLoading, setIsLoading] = useState(true);
    const [lang, setLang] = useState("");
    const [trans, setTrans] = useState(null);

    const load = async (lang) => {
        const { t } = await useTranslation(lang === "en" ? "en" : "es", "dashboard");
        return t;
    };

    useEffect(() => {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const languageCode = url.pathname.split("/")[1];
        setLang(languageCode);
        localStorage.setItem("lng", languageCode);
    }, []);
    useEffect(() => {
        if (lang) {
            load(lang)
                .then(async (f) => {
                    setTrans(() => {
                        return f;
                    });
                })
                .catch((e) => { });
        }
    }, [lang]);




    const onChange = (key) => {
        // console.log(key);
    };


    return (
        trans && (
            <>
                <LoadingTimer setIsLoading={setIsLoading} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <AdminRow gutter={[16, 16]}>
                        <Col span={24}>
                            <div className="p-8 boundary mt-4">
                                <div className="flex justify-between flex-wrap md:flex-nowrap gap-10">
                                    <div>
                                        <div>
                                            <h2 className="fs-28 font-fam fw-700">My Wallet</h2>
                                            <p className="font-fam fw-400 fs-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="flex justify-center">
                                            <div className="circle my-auto">
                                                <h3 className="fs-28 font-fam fw-700 text-primary my-auto mt-5">350</h3>
                                                <p className="font-fam fw-500 fs-10 text-primary lh-16">Total</p>
                                                <p className="font-fam fw-500 fs-10 text-primary lh-16">Enrollment</p>
                                            </div>

                                        </div>

                                        <div className="">
                                            <div className="green-circle my-auto">
                                                <h3 className="fs-28 font-fam fw-700 text-primary my-auto mt-5">350</h3>
                                                <p className="font-fam fw-500 fs-10 text-primary lh-16">Total</p>
                                                <p className="font-fam fw-500 fs-10 text-primary lh-16">Enrollment</p>
                                            </div>

                                        </div>

                                        <div className="">
                                            <div className="red-circle my-auto">
                                                <h3 className="fs-28 font-fam fw-700 text-primary my-auto mt-5">350</h3>
                                                <p className="font-fam fw-500 fs-10 text-primary lh-16">Total</p>
                                                <p className="font-fam fw-500 fs-10 text-primary lh-16">Enrollment</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-3 rounded-md p-8 fs-18 fw-500"
                                    style={{ background: "white" }}
                                // width:"80vw"  
                                >
                                    <Debit />
                                    <Transaction t={trans} />
                                </div>

                            </div>
                        </Col>
                    </AdminRow>
                )}
            </>
        )
    );
}

export default WalletPage;
