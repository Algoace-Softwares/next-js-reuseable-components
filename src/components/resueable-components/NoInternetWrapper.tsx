"use client";

import React, { useEffect, useState } from "react";
import NoInternetConnectionComponent from "./NoInternetConnection/NoInternetConnectionComponent";

interface Props {
  children: React.ReactNode;
}

const NoInternetWrapper: React.FC<Props> = ({ children }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);

    // event listeners to update the state
    window.addEventListener("online", () => {
      setOnline(true);
    });

    window.addEventListener("offline", () => {
      setOnline(false);
    });

    return () => {
      window.removeEventListener("online", () => {
        setOnline(true);
      });
      window.removeEventListener("offline", () => {
        setOnline(false);
      });
    };
  }, []);

  //   if user is online, return the child component else return a custom component
  if (isOnline) {
    return children;
  } else {
    return <NoInternetConnectionComponent />;
  }
};

export default NoInternetWrapper;
