import { DefaultEmoji, EmojiType } from '../components/Emoji';

export const emojiNameWithColons = (emoji: EmojiType): string =>
	emoji.name
		.split(' ')
		.map(name => `:${name}:`)
		.join(' ');

export const getEmojiCharacter = (emoji: DefaultEmoji, selectedTone: number): string => {
	if (selectedTone)
		return emoji.tones?.find(emoji => emoji.tone.includes(selectedTone))?.char ?? emoji.char;

	return emoji.char;
};

export const getEmoji = (emoji: DefaultEmoji, selectedTone: number): DefaultEmoji => {
	if (selectedTone) return emoji.tones?.find(emoji => emoji.tone.includes(selectedTone)) ?? emoji;

	return emoji;
};
