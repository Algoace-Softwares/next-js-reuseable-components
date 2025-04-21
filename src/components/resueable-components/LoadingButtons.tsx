"use client";

import React, { useState } from "react";
import { LoadingButton } from "../ui/loading-button";
import { Button } from "../ui/button";

const LoadingButtons = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-4 ">
      <p className="font-bold">Loading button</p>
      <LoadingButton
        loading={loading}
        size={"lg"}
        type="submit"
        className="w-full"
      >
        button
      </LoadingButton>
      <Button className="cursor-pointer" onClick={() => setLoading(true)}>
        start loading
      </Button>
      <Button className="cursor-pointer" onClick={() => setLoading(false)}>
        stop loading
      </Button>
    </div>
  );
};

export default LoadingButtons;
