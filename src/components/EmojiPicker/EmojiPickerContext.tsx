import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import useLocalStorage from '../../hooks/useLocalStorage';

import { theme } from '../../utils/theme';

import type { EmojiType } from '../Emoji';

export type SetFrequentlyUsed = (
	value: EmojiType[] | ((value: EmojiType[]) => EmojiType[])
) => void;

interface EmojiPickerContextValues {
	frequentlyUsed: EmojiType[];
	setFrequentlyUsed: SetFrequentlyUsed;
}

interface ContextProps {
	children: ReactNode;
	themeMode: 'dark' | 'light';
}

export const emojiCategories = [
	'frequentlyUsed',
	'people',
	'nature',
	'food',
	'activities',
	'travel',
	'objects',
	'symbols',
	'flags',
] as const;

export const defaultEmojiCategories = {
	frequentlyUsed: 'Frequently used',
	people: 'People',
	nature: 'Nature',
	food: 'Food',
	activities: 'Activities',
	travel: 'Travel',
	objects: 'Objects',
	symbols: 'Symbols',
	flags: 'Flags',
};

export type EmojiCategories = typeof emojiCategories[number];

const EmojiPickerContext = createContext<EmojiPickerContextValues>({} as EmojiPickerContextValues);

export function useEmojiPickerContext() {
	const context = useContext(EmojiPickerContext);

	return context;
}

export default function EmojiPickerContextProvider({ themeMode, children }: ContextProps) {
	const [frequentlyUsed, setFrequentlyUsed] = useLocalStorage<EmojiType[]>({
		key: 'frequentlyUsedEmojis',
		initialValue: [],
	});

	const memoFrequentlyUsed = useMemo(
		() => ({ frequentlyUsed, setFrequentlyUsed }),
		[frequentlyUsed]
	);

	return (
		<ThemeProvider theme={themeMode === 'light' ? theme.light : theme.dark}>
			<EmojiPickerContext.Provider value={memoFrequentlyUsed}>
				{children}
			</EmojiPickerContext.Provider>
		</ThemeProvider>
	);
}

export const EmojiPickerClasses = {
	root: 'RDC-EmojiPicker',
	header: 'RDC-EmojiPicker-Header',
	inputSearch: 'RDC-EmojiPicker-InputSearch',
	skinToneSelector: 'RDC-EmojiPicker-SkinToneSelector',
	skinToneSelectorItem: 'RDC-EmojiPicker-SkinToneSelectorItem',
	categoryList: 'RDC-EmojiPicker-CategoryList',
	categoryListItem: 'RDC-EmojiPicker-CategoryListItem',
	categoryListCustomItem: 'RDC-EmojiPicker-CategoryListCustomItem',
	emojiList: 'RDC-EmojiPicker-EmojiList',
	emojiListGroup: 'RDC-EmojiPicker-EmojiListGroup',
	emojiListGroupHeader: 'RDC-EmojiPicker-EmojiListGroupHeader',
	emojiListGroupItem: 'RDC-EmojiPicker-EmojiListItem',
	footer: 'RDC-EmojiPicker-Footer',
	footerEmoji: 'RDC-EmojiPicker-FooterEmoji',
	footerEmojiText: 'RDC-EmojiPicker-FooterEmojiText',
	footerEmojiServerIcon: 'RDC-EmojiPicker-FooterEmojiServerIcon',
};
