import React from 'react'
import { Progress } from 'antd';
import "./Illnesses.css"

const IllPatients = [
    {
        id: 1,
        disease: "Diarrhea",
        number: 15,
        total_patients: "15 Patients",
    },

    {
        id: 2,
        disease: "Allergies",
        number: 25,
        total_patients: "25 Patients"
    },

    {
        id: 3,
        disease: "Colds and Flu",
        number: 50,
        total_patients: "50 Patients"
    },

    {
        id: 4,
        disease: "Conjunctivitis",
        number: 75,
        total_patients: "75 Patients"
    },


    {
        id:5,
        disease: "Mononucleosis",
        number: 90,
        total_patients: "90 Patients"
    }
]

// const twoColors = {
//     '0%': '#add8e6', // Light blue color for 0%
//     '100%': '#00008b' // Dark blue color for 100%
// };
const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};

const Insurances = () => {
    return (
        <div className='p-8'>
            {IllPatients.map((data, key) => {
                return (
                    <div className='flex gap-8 progress-container' id={key}>
                        <p className='data fw-500 font-fam'>{data.disease}<span></span></p>
                        <Progress className='progress-bar' percent={data.number}/>
                        <p className='data fw-500 font-fam'>{data.total_patients}</p>
                    </div>
                )

            })}

        </div>
    )
}

export default Insurances
