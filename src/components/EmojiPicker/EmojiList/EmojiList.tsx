import React, { ForwardedRef, forwardRef, memo } from 'react';
import styled from 'styled-components';

import EmojisCategory from './EmojisCategory';

import type {
	CategoryRefs,
	OnEmojiClick,
	Emojis,
	EmojiCategory,
	CategoryNames,
	SetActiveEmoji,
} from '../EmojiPicker.types';
import { useEmojiPickerContext, EmojiPickerClasses } from '../EmojiPickerContext';

interface EmojiListProps {
	emojis: Emojis;
	customEmojis: EmojiCategory[] | undefined;
	refs: CategoryRefs;
	onEmojiClick?: OnEmojiClick;
	categoryNames: CategoryNames;
	search: string;
	selectedSkinTone: number;
	setActiveEmoji: SetActiveEmoji;
}

const StyledEmojiList = styled('div')(({ theme }) => ({
	gridArea: 'emojis',
	overflow: 'hidden scroll',
	paddingRight: 0,
	zIndex: 0,

	scrollbarColor: `${theme.background.tertiary} transparent`,
	scrollbarWidth: 'thin',

	'::-webkit-scrollbar': {
		width: '10px',
		backgroundColor: 'transparent',
	},

	'::-webkit-scrollbar-button': {
		display: 'none',
		width: 0,
		height: 0,
	},

	'::-webkit-scrollbar-corner': {
		backgroundColor: 'transparent',
	},

	'::-webkit-scrollbar-thumb': {
		borderRadius: '10px',
		minHeight: '48px',
		boxShadow: `inset 0 0 10px 10px ${theme.background.tertiary}`,
		border: 'solid 3px transparent',
	},
}));

function EmojiList(
	{
		emojis,
		customEmojis,
		refs,
		onEmojiClick,
		categoryNames,
		search,
		selectedSkinTone,
		setActiveEmoji,
	}: EmojiListProps,
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<StyledEmojiList ref={ref} className={EmojiPickerClasses.emojiList}>
			<FrequentlyUsedCategory
				refs={refs}
				emojis={customEmojis}
				categoryNames={categoryNames}
				search={search}
				selectedSkinTone={selectedSkinTone}
				setActiveEmoji={setActiveEmoji}
				onEmojiClick={onEmojiClick}
			/>
			<EmojiCategories
				refs={refs}
				emojis={customEmojis}
				categoryNames={categoryNames}
				search={search}
				selectedSkinTone={selectedSkinTone}
				setActiveEmoji={setActiveEmoji}
				onEmojiClick={onEmojiClick}
			/>
			<EmojiCategories
				refs={refs}
				emojis={emojis}
				categoryNames={categoryNames}
				search={search}
				selectedSkinTone={selectedSkinTone}
				setActiveEmoji={setActiveEmoji}
				onEmojiClick={onEmojiClick}
			/>
		</StyledEmojiList>
	);
}

interface EmojiCategoryProps {
	refs: CategoryRefs;
	emojis: EmojiCategory[] | undefined;
	categoryNames: CategoryNames;
	search: string;
	selectedSkinTone: number;
	setActiveEmoji: SetActiveEmoji;
	onEmojiClick?: OnEmojiClick;
}

function FrequentlyUsedCategory({
	refs,
	emojis,
	categoryNames,
	search,
	selectedSkinTone,
	setActiveEmoji,
	onEmojiClick,
}: EmojiCategoryProps) {
	const { frequentlyUsed } = useEmojiPickerContext();

	const customEmojiCategories = emojis?.map(emojiCategory => emojiCategory.name);

	const emojiCategory = {
		name: 'frequentlyUsed',
		emojis: frequentlyUsed.filter(
			emoji =>
				!('id' in emoji) || !emoji.serverName || customEmojiCategories?.includes(emoji.serverName)
		),
	};

	return (
		<EmojisCategory
			emojiCategory={emojiCategory}
			categoryNames={categoryNames}
			refs={refs}
			onEmojiClick={onEmojiClick}
			search={search}
			selectedSkinTone={selectedSkinTone}
			setActiveEmoji={setActiveEmoji}
		/>
	);
}

function EmojiCategories({
	refs,
	emojis,
	categoryNames,
	search,
	selectedSkinTone,
	setActiveEmoji,
	onEmojiClick,
}: EmojiCategoryProps) {
	return (
		<>
			{emojis?.map(emojiCategory => (
				<EmojisCategory
					key={emojiCategory.name}
					emojiCategory={emojiCategory}
					categoryNames={categoryNames}
					refs={refs}
					onEmojiClick={onEmojiClick}
					search={search}
					selectedSkinTone={selectedSkinTone}
					setActiveEmoji={setActiveEmoji}
				/>
			))}
		</>
	);
}

export default memo(forwardRef(EmojiList));
