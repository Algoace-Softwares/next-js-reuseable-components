import { MentionData } from "draft-js-mention-plugin";

export default function defaultSuggestionsFilter(
  searchValue: string,
  mentions: MentionData[]
): MentionData[] {
  const value = searchValue.toLowerCase();
  return mentions.filter(
    (mention) => mention.name.toLowerCase().indexOf(value) > -1
  );
}
