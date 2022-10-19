import type { MutableRefObject } from 'react';
import type { Placement } from '@popperjs/core';
import type { EmojiCategories } from './EmojiPickerContext';
import { EmojiType } from '../Emoji';

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
