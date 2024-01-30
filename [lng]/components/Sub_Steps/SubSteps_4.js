import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSignup4Current } from "../redux/features/signupStates";
const SubSteps_4 = () => {

    const items = ["0", "1"];
    const dispatch = useAppDispatch();
    const signupStates = useAppSelector((states) => states.signupState);

    return (
        <div className="flex mb-4 mt-24 custom-steps">
            {items.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`rounded-lg h-2 w-1/4 mx-1 ${signupStates.signup4Current >= item ? "active" : "unactive"}`}
                    >
                    </div>
                );
            })}
        </div>
    );
};

export default SubSteps_4;
