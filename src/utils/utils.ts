import { Emoji, EmojiType } from '../components/EmojiPicker/EmojiPicker.types';

export const emojiNameWithColons = (emoji: EmojiType): string =>
	emoji.name
		.split(' ')
		.map(name => `:${name}:`)
		.join(' ');

export const getEmojiCharacter = (emoji: Emoji, selectedTone: number): string => {
	if (selectedTone)
		return emoji.tones?.find(emoji => emoji.tone.includes(selectedTone))?.char ?? emoji.char;

	return emoji.char;
};

export const getEmoji = (emoji: Emoji, selectedTone: number): Emoji => {
	if (selectedTone) return emoji.tones?.find(emoji => emoji.tone.includes(selectedTone)) ?? emoji;

	return emoji;
};
