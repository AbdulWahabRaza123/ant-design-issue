import React, { useState, useEffect } from "react";
import Loader from "../Spinner/Loader";

function LoadingTimer({ setIsLoading }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
       setIsLoading(false); // Call the setIsLoading function from props
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Render the Loader component while loading
  // return isLoading ? <Loader /> : null;
}

export default LoadingTimer;
