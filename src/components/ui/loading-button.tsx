import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { Button, ButtonProps, buttonVariants } from "./button";

export interface LoadingButtonProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, children, className, variant, size, ...props }, ref) => {
    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={!!loading}
        {...props}
      >
        {loading ? (
          <>
            <LoaderCircle className="mr-2 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
