"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../../i18n";
import HomePage from "./HomePage";
function HomePageParent({ lng }) {
  const [trans, setTrans] = useState(null);

  const load = async () => {
    const { t } = await useTranslation(lng, "dashboard");
    return t;
  };
  useEffect(() => {
    load()
      .then(async (f) => {
        setTrans(() => {
          return f;
        });
      })
      .catch((e) => {});
  }, []);
  if (!trans || !lng) {
    return;
  }
  return (
    trans && (
      <>
        <HomePage t={trans} lng={lng} />
      </>
    )
  );
}

export default HomePageParent;
