"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import ICONS from "@/assets/icons";

const ToastComponent = () => {
  const handleSuccess = () => {
    toast(
      <div className="flex items-center gap-4 text-sm bg-green-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 min-w-[32px]">
          <Image src={ICONS.circleCheck} alt="success" width={20} height={20} />
        </div>
        <div className="flex-grow">
          <span className="font-semibold">Success</span>
          <p className="font-normal min-w-[300px]">sahi hai chal gya</p>
        </div>
      </div>,
      {
        duration: 3000,
        className: "bg-green-500 text-white border-none",
      }
    );
  };

  const handleError = () => {
    toast(
      <div className="flex items-center gap-4 text-sm bg-red-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 min-w-[32px]">
          <Image src={ICONS.circleCross} alt="success" width={20} height={20} />
        </div>
        <div className="flex-grow">
          <span className="font-semibold">Error</span>
          <p className="font-normal min-w-[300px]">Error hai bhai</p>
        </div>
      </div>,
      {
        duration: 3000,
        className: "bg-destructive text-destructive-foreground border-none",
        // variant: "destructive",
      }
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">Toast</p>
      <button
        className="bg-green-600 text-white p-2 rounded-lg cursor-pointer"
        onClick={handleSuccess}
      >
        Success toast
      </button>
      <button
        className="bg-red-600 text-white p-2 rounded-lg cursor-pointer"
        onClick={handleError}
      >
        error toast
      </button>
    </div>
  );
};

export default ToastComponent;
