"use client";

import { Button } from "@/components/ui/button";
import { RotateCw, WifiOff } from "lucide-react";

const NoInternetConnectionComponent = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <WifiOff className="w-16 h-16 text-red-600" />
      <h1 className="text-3xl text-red-600">No internet connection</h1>
      <p className="text-red-600">Please check ypur internet connection</p>
      <Button
        size="sm"
        variant="outline"
        className="w-40 flex items-center gap-2"
        onClick={() => window.location.reload()}
      >
        Try again <RotateCw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NoInternetConnectionComponent;
