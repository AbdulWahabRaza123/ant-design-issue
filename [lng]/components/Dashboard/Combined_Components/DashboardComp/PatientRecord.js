"use client";
import "./Welcome.css";
import { useState, useEffect } from "react";

const PatientRecord = () => {
  return (
    <div className="flex  gap-4">
      <div className="patient-records p-3">
        <label className="fw-700 font-fam">Total Patients</label>
        <h3 className="fw-700 fs-26 text-primary font-fam">210</h3>
        <p className="fw-500 text-primary font-fam">
          <span className="text-green fw-600 font-fam">+16%</span> in last month
        </p>
      </div>

      <div className="patient-records p-3">
        <label className="fw-700 font-fam">New Patients</label>
        <h3 className="fw-700 fs-26 text-primary font-fam">100</h3>
        <p className="fw-500 text-primary font-fam">
          <span className="text-green fw-600 font-fam">+16%</span> in last month
        </p>
      </div>

      <div className="patient-records p-3">
        <label className="fw-700 font-fam">Total Patients</label>
        <h3 className="fw-700 fs-26 text-primary font-fam">210</h3>
        <p className="fw-500 text-primary font-fam">
          <span className="text-green fw-600 font-fam">+16%</span> in last month
        </p>
      </div>
    </div>
  );
};

export default PatientRecord;
