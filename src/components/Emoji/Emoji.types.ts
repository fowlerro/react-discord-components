export type EmojiProps = {
	emoji: EmojiType | string;
} & React.ComponentPropsWithRef<'img'>;

export interface DefaultEmoji {
	name: string;
	char: string;
	hasTone?: boolean;
	tones?: EmojiToneType[];
}

interface EmojiToneType {
	name: DefaultEmoji['name'];
	char: DefaultEmoji['char'];
	tone: number[];
}

export interface CustomEmoji {
	id: string;
	name: string;
	animated: boolean;
	serverName?: string;
}

export type EmojiType = DefaultEmoji | CustomEmoji;
