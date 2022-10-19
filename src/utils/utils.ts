import { DefaultEmoji, CustomEmoji, EmojiType } from '../components';

export const isDefaultEmoji = (emoji: EmojiType | string): emoji is DefaultEmoji =>
	(emoji as DefaultEmoji)?.char !== undefined;
export const isCustomEmoji = (emoji: EmojiType | string): emoji is CustomEmoji =>
	(emoji as CustomEmoji)?.id !== undefined;

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

export const parseEmojiToCodePoints = (emoji: string) => {
	const codePoints = [];
	for (const element of emoji) {
		codePoints.push(element.codePointAt(0)?.toString(16));
	}
	return codePoints.join('-');
};

export const parseCodePointsToEmoji = (codePoints: string) =>
	String.fromCodePoint(...codePoints.split('-').map(point => parseInt(point, 16)));

export const getTwemojiCodePoints = (codePoints: string) =>
	codePoints.includes('-fe0f') && !codePoints.includes('-200d')
		? codePoints.replace('-fe0f', '')
		: codePoints;

export const getTwemojiURL = (emojiChar: string) =>
	`https://twemoji.maxcdn.com/v/14.0.0/svg/${getTwemojiCodePoints(
		parseEmojiToCodePoints(emojiChar)
	)}.svg`;
