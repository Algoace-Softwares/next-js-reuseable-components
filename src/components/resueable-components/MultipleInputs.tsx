"use client";

import React, { useRef, useState } from "react";
import { InputWithIcon } from "../ui/input-with-icon";
import { Mail } from "lucide-react";
import { PasswordInput } from "./password-input";
import { PhoneInput } from "../ui/phone-input";
import { ChatInputEmoji } from "../ui/chat-input-emoji";
import ChatInputMention, {
  ChatInputMentionRef,
} from "../ui/chat-input-mention";
import mentions from "@/utils/mentions";

const MultipleInputs = () => {
  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputRef = useRef<ChatInputMentionRef>(null);

  const handleMessage = () => {
    const message = inputRef.current?.getPlainText();
    const mentions = inputRef.current?.getMentions();

    console.log("Sending message:", message);
    console.log("Mentions:", mentions);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <p className="font-bold">Icon input</p>
      <InputWithIcon
        id="search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        icon={<Mail />}
        placeholder="Search..."
        iconPosition="left"
      />
      <InputWithIcon
        id="search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        icon={<Mail />}
        placeholder="Search..."
        iconPosition="right"
      />
      <p className="font-bold">Password input</p>
      <PasswordInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="enter password"
      />
      <p className="font-bold">Phone number input</p>
      <PhoneInput
        value={phoneNumber}
        onChange={(val) => setPhoneNumber(val)}
        className="bg-inputBg border-t-[1px] border-b-[1px] border-l-[1px] border-inputBorder"
        placeholder="enter phone number"
      />
      <p className="font-bold">Input with emojis</p>
      <ChatInputEmoji
        value={value}
        disableCopyPaste
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && console.log(e)}
        placeholder="write message"
        className="flex-1 h-[10px] sm:h-[40px] min-h-[37px] sm:min-h-[40px] resize-none rounded-full border-0 px-5 py-2 shadow-none focus-visible:ring-0"
      />

      <b>
        This input is working perfectly fine, but if you want to send it along
        with a mention, then you’ll need to handle that separately — that part
        hasn&apos;t been implemented yet. However, the mention functionality
        itself is working properly.
      </b>
      <p className="font-bold">Input with emojis and mention user using @</p>
      <ChatInputMention
        ref={inputRef}
        disableCopyPaste
        showEmoji
        onSend={handleMessage}
        placeholder="write message"
        emojiPlaceholder="search"
        language={"en"}
        debouncedSearch={""}
        profiles={mentions}
      />
      <p className="font-bold">Input with mention user using @</p>
      <ChatInputMention
        ref={inputRef}
        disableCopyPaste
        showEmoji={false}
        onSend={handleMessage}
        placeholder="write message"
        emojiPlaceholder="search"
        language={"en"}
        // debouncedSearch={""}
        profiles={mentions}
      />
    </div>
  );
};

export default MultipleInputs;
