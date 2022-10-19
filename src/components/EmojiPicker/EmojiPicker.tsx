import React, { useMemo } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

import emojis from '../../assets/emojis.json';

import Header from './Header/Header';
import CategoryList from './CategoryList/CategoryList';
import EmojiList from './EmojiList/EmojiList';
import Footer from './Footer/Footer';
import EmojiPickerContextProvider, {
	defaultEmojiCategories,
	EmojiPickerClasses,
} from './EmojiPickerContext';

import type {
	EmojiPickerProps,
	CategoryElements,
	CustomCategory,
	CategoryNames,
} from './EmojiPicker.types';
import type { EmojiType } from '../Emoji/Emoji.types';

const StyledEmojiPicker = styled('div')(({ theme }) => ({
	fontFamily: theme.typography.font.primary,
	backgroundColor: theme.background.primary,
	height: '444px',
	maxWidth: '422px',
	borderRadius: '8px',
	color: theme.header.secondary,
	boxShadow: theme.elevation.medium,
	overflow: 'hidden',
	display: 'grid',
	zIndex: 9999,
	gridTemplateColumns: '48px auto',
	gridTemplateRows: 'auto 1fr auto',
	gridTemplateAreas: `
        "header header"
        "categories emojis"
        "categories footer"
    `,
}));

export function EmojiPicker({
	open,
	anchorEl,
	placement,
	placementOffsets,
	customEmojis,
	onEmojiClick,
	theme = 'dark',
	categoryNames,
	className,
}: EmojiPickerProps): JSX.Element {
	const [pickerEl, setPickerEl] = React.useState<HTMLDivElement | null>(null);

	const { styles, attributes } = usePopper(anchorEl, pickerEl, {
		strategy: 'fixed',
		placement,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: placementOffsets,
				},
			},
		],
	});

	const [activeEmoji, setActiveEmoji] = React.useState<EmojiType>(emojis[0].emojis[0]);
	const [selectedSkinTone, setSelectedSkinTone] = React.useState(0);
	const [search, setSearch] = React.useState('');

	const categoryRefs = React.useRef<CategoryElements>({});
	const memoCategoryNames: CategoryNames = useMemo(
		() => ({
			...defaultEmojiCategories,
			...categoryNames,
		}),
		[categoryNames]
	);
	const customCategories: CustomCategory[] =
		customEmojis?.map(category => ({ name: category.name, iconURL: category.iconURL })) ?? [];

	if (open)
		return (
			<EmojiPickerContextProvider themeMode={theme}>
				<StyledEmojiPicker
					className={
						className ? `${EmojiPickerClasses.root} ${className}` : EmojiPickerClasses.root
					}
					ref={setPickerEl}
					style={styles.popper}
					{...attributes.popper}
				>
					<Header
						activeEmoji={activeEmoji}
						search={search}
						setSearch={setSearch}
						selectedSkinTone={selectedSkinTone}
						setSelectedSkinTone={setSelectedSkinTone}
					/>
					<CategoryList refs={categoryRefs} customCategories={customCategories} />
					<EmojiList
						emojis={emojis}
						customEmojis={customEmojis}
						refs={categoryRefs}
						onEmojiClick={onEmojiClick}
						categoryNames={memoCategoryNames}
						search={search}
						selectedSkinTone={selectedSkinTone}
						setActiveEmoji={setActiveEmoji}
					/>
					<Footer
						activeEmoji={activeEmoji}
						selectedSkinTone={selectedSkinTone}
						customCategories={customCategories}
					/>
				</StyledEmojiPicker>
			</EmojiPickerContextProvider>
		);
	return <></>;
}
