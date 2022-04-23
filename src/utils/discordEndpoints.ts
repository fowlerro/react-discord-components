const BASE_URL = 'https://cdn.discordapp.com';

export const getCustomEmoji = (emojiId: string, animated: boolean): string =>
	`${BASE_URL}/emojis/${emojiId}.${animated ? 'gif' : 'png'}`;
