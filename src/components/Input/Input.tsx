import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      tone: {
        default: "border-gray-300 focus:border-black",
        error: "border-red-400 focus:border-red-600",
        success: "border-green-400 focus:border-green-600",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, tone, disabled, label, hint, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 ">
        {label && <label className="text-sm font-medium text-(--text-color) ">{label}</label>}
        <input
          ref={ref}
          disabled={Boolean(disabled)}
          className={cn(inputVariants({ size, tone }), className)}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
        {hint && !error && <span className="text-xs text-gray-500">{hint}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";