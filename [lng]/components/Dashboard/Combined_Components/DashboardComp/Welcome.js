"use client";
import React, { useState, useEffect } from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="fs-34 text-primary font-fam fw-700">
          Welcome to DocHyve!
        </h1>
        <h2 className="fs-28 text-primary font-fam fw-700">
          Let’s take a look at your performance
        </h2>
      </div>
    </div>
  );
};

export default Welcome;
