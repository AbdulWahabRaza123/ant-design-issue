import React, { useEffect, useState } from "react";

export default function ScreenWidth() {
  const [width, setWidth] = useState(() => {
    // Check if window is defined
    return typeof window !== "undefined" ? window.innerWidth : 0;
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Check if window is defined before adding event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      // Check if window is defined before removing event listener
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return width;
}
