/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "draft-js-mention-plugin" {
  export interface MentionData {
    name: string;
    link?: string;
    avatar?: string;
  }

  export interface MentionPluginConfig {
    mentionPrefix?: string;
    theme?: any;
    entityMutability?: "IMMUTABLE" | "MUTABLE" | "SEGMENTED";
    mentionTrigger?: string;
    supportWhitespace?: boolean;
    positionSuggestions?: any;
  }

  const createMentionPlugin: (config?: MentionPluginConfig) => any;

  export default createMentionPlugin;
}
