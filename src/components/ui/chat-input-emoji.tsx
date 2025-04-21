"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";

// Dynamically import the emoji picker to reduce initial bundle size
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputHeight?: string | number; // New prop for controlling height
  disableCopyPaste?: boolean;
  disabled?: boolean;
}

const ChatInputEmoji = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      className,
      value,
      onChange,
      inputHeight,
      disableCopyPaste,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalMessage, setInternalMessage] = React.useState("");
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = useMergedRef(ref, textareaRef);

    // Define the media query breakpoints
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

    // Determine the width based on screen size
    const pickerWidth = isSmallScreen ? 250 : isMediumScreen ? 280 : 320;
    const pickerHeight = isSmallScreen ? 300 : isMediumScreen ? 350 : 400;

    // Use controlled or uncontrolled input based on whether value is provided
    const isControlled = value !== undefined;
    const message = isControlled ? String(value) : internalMessage;

    // Convert inputHeight to CSS value if it's a number
    const heightStyle = inputHeight
      ? typeof inputHeight === "number"
        ? `${inputHeight}px`
        : inputHeight
      : undefined;

    // Function to insert emoji at cursor position without closing the picker
    const insertEmoji = (emojiData: EmojiClickData) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;

      if (isControlled && onChange) {
        // For controlled components, we need to create a synthetic event
        const newValue =
          message.substring(0, start) +
          emojiData.emoji +
          message.substring(end);
        const syntheticEvent = {
          target: { value: newValue },
          currentTarget: { value: newValue },
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(syntheticEvent);
      } else {
        // For uncontrolled
        const newMessage =
          internalMessage.substring(0, start) +
          emojiData.emoji +
          internalMessage.substring(end);
        setInternalMessage(newMessage);
      }

      // Focus back on textarea and set cursor position after the inserted emoji
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + emojiData.emoji.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 10);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalMessage(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    // Handle clicking outside to close the emoji picker
    const handleClickOutside = (e: React.MouseEvent) => {
      // Only close if clicking outside both the emoji button and picker
      const target = e.target as HTMLElement;
      const isEmojiButton = target.closest('[data-emoji-button="true"]');
      if (!isEmojiButton) {
        setShowEmojiPicker(false);
      }
    };

    return (
      <div className="relative w-full bg-[#F1F1F1] dark:bg-darkThemeBg dark:border-2 dark:border-solid dark:border-[#424242] rounded-full">
        <Textarea
          autoComplete="off"
          disabled={disabled}
          onCopy={disableCopyPaste ? (e) => e.preventDefault() : undefined}
          onPaste={disableCopyPaste ? (e) => e.preventDefault() : undefined}
          onCut={disableCopyPaste ? (e) => e.preventDefault() : undefined}
          ref={mergedRef}
          name="message"
          value={message}
          onChange={handleChange}
          style={heightStyle ? { height: heightStyle } : undefined}
          className={cn(
            "flex-1 w-[90%] sm:w-[95%] resize-none border-0 dark:border-none pl-5 pr-12 pt-2 pb-1.5 shadow-none text-xs sm:text-sm focus-visible:ring-0 placeholder:text-[#B2B3B3] dark:placeholder:text-[#9A9A9A] scrollbar-none",
            // Only apply default height classes if no inputHeight prop and no height in className
            !heightStyle &&
              !className?.includes("h-") &&
              !className?.includes("min-h-") &&
              !className?.includes("height")
              ? "!min-h-[40px] h-9"
              : "",
            className
          )}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-emoji-button="true"
          //

          className={cn(
            "absolute h-6 w-6 rounded-full right-3 top-1/2 -translate-y-1/2"
            // language !== "ar" && language !== "ur"
            //   ? "right-3 top-1/2 -translate-y-1/2"
            //   : "left-6 top-1/3 -translate-x-1/2"
          )}
          disabled={disabled}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Smile className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
        </Button>

        {showEmojiPicker && (
          <div
            className={cn(
              "absolute bottom-14 z-10 right-0"
              //   language !== "ar" && language !== "ur" ? "right-0" : "left-0"
            )}
          >
            <div className="relative">
              <div className="fixed inset-0" onClick={handleClickOutside} />
              <div className="relative z-20">
                <EmojiPicker
                  onEmojiClick={insertEmoji}
                  searchPlaceHolder="search"
                  skinTonesDisabled={true}
                  searchDisabled={false}
                  emojiStyle={EmojiStyle.NATIVE}
                  previewConfig={{
                    showPreview: false,
                  }}
                  width={pickerWidth}
                  height={pickerHeight}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
ChatInputEmoji.displayName = "ChatInputEmoji";

// Helper function to merge refs
function useMergedRef<T>(...refs: React.Ref<T>[]) {
  return React.useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
    },
    [refs]
  );
}

export { ChatInputEmoji };
