"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/sections/Loader";

export default function LoaderGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("sd-loader-seen");
    if (!seen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  if (!show) return null;

  return (
    <Loader
      onComplete={() => {
        sessionStorage.setItem("sd-loader-seen", "1");
        document.body.style.overflow = "";
        setShow(false);
      }}
    />
  );
}
