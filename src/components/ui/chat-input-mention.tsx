/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { EditorState, convertToRaw, Modifier } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin from "draft-js-mention-plugin";
import "draft-js-mention-plugin/lib/plugin.css";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { cn } from "@/lib/utils";
import defaultSuggestionsFilter from "@/utils/defaultSuggestionsFilter";

// DATA FORMAT
// [
//{
//     name: '',
//    link: '',
//    avatar:'',
//    userId: '',
// }
//]

type Props = {
  language?: string;
  theme?: "light" | "dark";
  pickerWidth?: number;
  pickerHeight?: number;
  disableCopyPaste?: boolean;
  placeholder?: string;
  showEmoji?: boolean;
  onSend?: () => void;
  emojiPlaceholder?: string;
  debouncedSearch?: any;
  profiles?: any;
  paginationRef?: any;
};

export type ChatInputMentionRef = {
  getPlainText: () => string;
  getMentions: () => any[];
  clearEditor: () => void;
};

class ChatInputMentionClass extends React.Component<Props, any> {
  mentionPlugin = createMentionPlugin();
  editorRef: Editor | null = null;

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: this.props.profiles,
    showEmojiPicker: false,
    isMentionOpen: false,
  };

  onChange = (editorState: any) => {
    this.setState({ editorState });
  };

  handleReturn = (e: React.KeyboardEvent, editorState: any) => {
    if (!e.shiftKey && !this.state.isMentionOpen) {
      this.props.onSend?.();
      return "handled";
    }
    return "not-handled";
  };

  // if you pass the debouce value then use this
  // onSearchChange = ({ value }: { value: string }) => {
  //   this.setState({
  //     suggestions: defaultSuggestionsFilter(value, this.props.profiles),
  //   });
  //   this.props.debouncedSearch(value);
  // };

  onSearchChange = ({ value }: { value: string }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.props.profiles),
    });
  };

  insertEmoji = (emojiObject: any) => {
    const { editorState } = this.state;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      emojiObject.emoji
    );
    const newEditorState = EditorState.push(
      editorState,
      contentState,
      "insert-characters"
    );
    this.setState({ editorState: newEditorState });
  };

  handleClickOutside = () => {
    this.setState({ showEmojiPicker: false });
  };

  clearEditor = () => {
    this.setState({ editorState: EditorState.createEmpty() });
  };

  handlePastedText = () => {
    if (this.props.disableCopyPaste) return "handled";
    return "not-handled";
  };

  handleCopy = () => {
    if (this.props.disableCopyPaste) return "handled";
    return "not-handled";
  };

  getPlainText = () => {
    return this.state.editorState.getCurrentContent().getPlainText();
  };

  getMentions = () => {
    const raw = convertToRaw(this.state.editorState.getCurrentContent());
    return Object.values(raw.entityMap)
      .filter((ent: any) => ent.type === "mention")
      .map((ent: any) => ent.data.mention);
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];
    const {
      language = "en",
      theme = "light",
      pickerWidth = 300,
      pickerHeight = 350,
    } = this.props;
    const { editorState, suggestions, showEmojiPicker } = this.state;

    return (
      <div
        onCopy={
          this.props.disableCopyPaste ? (e) => e.preventDefault() : undefined
        }
        onPaste={
          this.props.disableCopyPaste ? (e) => e.preventDefault() : undefined
        }
        className="relative w-full"
      >
        <div
          className={cn(
            "w-full flex-1 font-barlow text-sm sm:text-md resize-none bg-[#F1F1F1] dark:bg-[#3B3B3B] dark:text-white dark:border-none rounded-full border-0 px-5 py-2 shadow-none focus-visible:ring-0 min-h-[40px] max-h-[40px] overflow-auto break-words break-all whitespace-pre-wrap scrollbar-none",
            this.props.showEmoji &&
              (language === "ar" || language === "ur" ? "pl-10" : "pr-10")
          )}
        >
          {editorState.getCurrentContent().hasText() === false && (
            <div
              className={cn(
                "absolute top-1/2 text-xs sm:text-sm text-[#B2B3B3] dark:text-[#9A9A9A] pointer-events-none overflow-hidden whitespace-nowrap w-full truncate",
                language === "ar" || language === "ur"
                  ? "right-5 -translate-y-1/2 text-right"
                  : "left-5 -translate-y-1/2 text-left"
              )}
            >
              {this.props.placeholder}
            </div>
          )}
          <Editor
            ref={(element) => {
              this.editorRef = element;
            }}
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            handlePastedText={this.handlePastedText}
            handleCopy={this.handleCopy}
            handleReturn={this.handleReturn}
          />
          <div ref={this.props.paginationRef}>
            <MentionSuggestions
              onSearchChange={this.onSearchChange}
              suggestions={suggestions}
              onOpen={() => this.setState({ isMentionOpen: true })}
              onClose={() => this.setState({ isMentionOpen: false })}
            />
          </div>
        </div>

        {/* Emoji Button */}
        {this.props.showEmoji && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              data-emoji-button="true"
              className={cn(
                "absolute h-6 w-6 rounded-full top-1/2 -translate-y-1/2",
                language === "ar" || language === "ur" ? "left-3" : "right-3"
              )}
              onClick={() =>
                this.setState({ showEmojiPicker: !showEmojiPicker })
              }
            >
              <Smile className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-[#CBCBCB]" />
            </Button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div
                className={cn(
                  "absolute bottom-14 z-10",
                  language !== "ar" && language !== "ur" ? "right-0" : "left-0"
                )}
              >
                <div className="relative">
                  <div
                    className="fixed inset-0"
                    onClick={this.handleClickOutside}
                  />
                  <div className="relative z-20">
                    <EmojiPicker
                      onEmojiClick={this.insertEmoji}
                      searchPlaceHolder={this.props.emojiPlaceholder}
                      skinTonesDisabled={true}
                      searchDisabled={false}
                      emojiStyle={EmojiStyle.NATIVE}
                      previewConfig={{ showPreview: false }}
                      width={pickerWidth}
                      height={pickerHeight}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

// Wrap class with forwardRef
export default forwardRef<ChatInputMentionRef, Props>((props, ref) => {
  const inputRef = useRef<ChatInputMentionClass>(null);

  useImperativeHandle(ref, () => ({
    getPlainText: () => inputRef.current?.getPlainText() ?? "",
    getMentions: () => inputRef.current?.getMentions() ?? [],
    clearEditor: () => inputRef.current?.clearEditor(),
  }));

  return <ChatInputMentionClass ref={inputRef} {...props} />;
});
