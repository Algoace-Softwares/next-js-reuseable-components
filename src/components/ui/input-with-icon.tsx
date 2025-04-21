"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

export type IconType =
  | LucideIcon
  | React.ReactElement
  | string
  | { src: string; alt?: string; type?: "svg" | "image" };

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  wrapperClassName?: string;
  iconSize?: number;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  (
    {
      className,
      icon,
      iconPosition = "left",
      iconClassName,
      wrapperClassName,
      iconSize = 16,
      ...props
    },
    ref
  ) => {
    const renderIcon = () => {
      if (!icon) return null;

      const iconClasses = cn("text-muted-foreground", iconClassName);
      // If icon is a Lucide icon component
      if (typeof icon === "function") {
        const Icon = icon as unknown as LucideIcon;
        return (
          <Icon
            className={cn(iconClasses)}
            style={{ width: iconSize, height: iconSize }}
          />
        );
      }

      // If icon is a string (URL to SVG or image)
      if (typeof icon === "string") {
        // Check if it's an SVG URL or path
        const isSvg =
          icon.endsWith(".svg") ||
          icon.includes(".svg?") ||
          icon.startsWith("<svg");

        if (isSvg) {
          // For SVG files or inline SVG
          if (icon.startsWith("<svg")) {
            // Inline SVG string
            return (
              <div
                className={iconClasses}
                style={{ width: iconSize, height: iconSize }}
                dangerouslySetInnerHTML={{ __html: icon }}
              />
            );
          } else {
            // SVG file URL
            return (
              <div
                className={iconClasses}
                style={{ width: iconSize, height: iconSize }}
              >
                <object
                  data={icon}
                  type="image/svg+xml"
                  width={iconSize}
                  height={iconSize}
                  className="w-full h-full"
                >
                  <img
                    src={icon || "/placeholder.svg"}
                    alt=""
                    width={iconSize}
                    height={iconSize}
                    className="w-full h-full"
                  />
                </object>
              </div>
            );
          }
        } else {
          // Regular image URL (PNG, JPG, etc.)
          return (
            <div
              className={iconClasses}
              style={{ width: iconSize, height: iconSize }}
            >
              <img
                src={icon || "/placeholder.svg"}
                alt=""
                width={iconSize}
                height={iconSize}
                className="w-full h-full object-contain"
              />
            </div>
          );
        }
      }

      // If icon is an object with src (for Next.js Image or explicit type)
      if (typeof icon === "object" && "src" in icon) {
        // Check if it's explicitly marked as SVG
        if (
          icon.type === "svg" ||
          icon.src.endsWith(".svg") ||
          icon.src.includes(".svg?")
        ) {
          return (
            <div
              className={iconClasses}
              style={{ width: iconSize, height: iconSize }}
            >
              <object
                data={icon.src}
                type="image/svg+xml"
                width={iconSize}
                height={iconSize}
                className="w-full h-full"
              >
                <img
                  src={icon.src || "/placeholder.svg"}
                  alt={icon.alt || ""}
                  width={iconSize}
                  height={iconSize}
                  className="w-full h-full"
                />
              </object>
            </div>
          );
        } else {
          // Regular image
          return (
            <div
              className={iconClasses}
              style={{ width: iconSize, height: iconSize }}
            >
              <Image
                src={icon.src || ""}
                alt={icon.alt || ""}
                width={iconSize}
                height={iconSize}
                className="w-full h-full object-contain"
              />
            </div>
          );
        }
      }

      // If icon is a React element
      if (React.isValidElement(icon)) {
        // Type guard to check if the element can accept className and style props
        const iconElement = icon as React.ReactElement<{
          className?: string;
          style?: React.CSSProperties;
        }>;

        return React.cloneElement(iconElement, {
          className: cn(iconClasses, iconElement.props.className),
          style: {
            ...(iconElement.props.style || {}),
            width: iconSize,
            height: iconSize,
          },
        });
      }

      return null;
    };

    return (
      <div className={cn("relative flex items-center", wrapperClassName)}>
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 flex h-full items-center pointer-events-none">
            {renderIcon()}
          </div>
        )}
        <Input
          className={cn(
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 flex h-full items-center pointer-events-none">
            {renderIcon()}
          </div>
        )}
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
