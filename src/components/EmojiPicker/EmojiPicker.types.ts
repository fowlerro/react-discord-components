import type { MutableRefObject } from 'react';
import type { Placement } from '@popperjs/core';
import type { EmojiCategories } from './EmojiPickerContext';

export interface Emoji {
	name: string;
	char: string;
	hasTone?: boolean;
	tones?: EmojiToneType[];
}

interface EmojiToneType {
	name: Emoji['name'];
	char: Emoji['char'];
	tone: number[];
}

export interface CustomEmoji {
	id: string;
	name: string;
	animated: boolean;
	serverName?: string;
}

export type EmojiType = Emoji | CustomEmoji;

export type CategoryNames = {
	[category in EmojiCategories]: string;
};

export type CustomCategory = {
	name: string;
	iconURL?: string;
};

export interface EmojiCategory {
	name: string;
	iconURL?: string;
	emojis: EmojiType[];
}

export type Emojis = EmojiCategory[];

export type CategoryElements = {
	[category: string]: HTMLDivElement | null;
};

export type CategoryRefs = MutableRefObject<CategoryElements>;

export type OnEmojiClick = (emoji: EmojiType) => void;
export type SetActiveEmoji = (emoji: EmojiType) => void;
export type SetSearch = (search: string) => void;
export type SetSelectedSkinTone = (skinTone: number) => void;

export interface EmojiPickerProps {
	open: boolean;
	anchorEl: Element | null;
	placement?: Placement;
	placementOffsets?: [number, number];
	theme?: 'dark' | 'light';
	onEmojiClick?: OnEmojiClick;
	customEmojis?: EmojiCategory[];
	categoryNames?: Partial<CategoryNames>;
	className?: string;
}
