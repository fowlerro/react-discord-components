import React from 'react';
import styled from 'styled-components';
import LeftArrowIcon from '../../Icons/LeftArrowIcon';

import CategoryIcon from '../CategoryList/CategoryIcon';
import { EmojiCategories, EmojiPickerClasses } from '../EmojiPickerContext';
import type { CategoryNames, CustomCategory } from '../EmojiPicker.types';

interface EmojiCategoryHeaderProps {
	emojiCategory: CustomCategory;
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
	categoryNames: CategoryNames;
}

const StyledEmojiCategoryHeaderWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	height: '32px',
	padding: '0 8px',
	backgroundColor: theme.background.primary,
	alignItems: 'center',
	position: 'sticky',
	top: 0,
	userSelect: 'none',
}));

const StyledEmojiCategoryHeader = styled('div')(({ theme }) => ({
	color: theme.header.secondary,
	display: 'flex',
	alignItems: 'center',
	fontSize: '12px',
	fontWeight: 600,
	textTransform: 'uppercase',
	transition: 'color .125s',
	cursor: 'pointer',

	'&:hover': {
		color: theme.interactive.active,
	},
}));

const StyledEmojiCategoryName = styled('span')({
	marginInline: '8px',
});

function EmojiCategoryHeader({
	emojiCategory,
	expanded,
	setExpanded,
	categoryNames,
}: EmojiCategoryHeaderProps): JSX.Element {
	return (
		<StyledEmojiCategoryHeaderWrapper className={EmojiPickerClasses.emojiListGroupHeader}>
			<StyledEmojiCategoryHeader onClick={() => setExpanded(!expanded)}>
				{'iconURL' in emojiCategory ? (
					<img
						src={emojiCategory.iconURL}
						alt={emojiCategory.name}
						width='16'
						height='16'
						style={{
							borderRadius: '4px',
						}}
					/>
				) : (
					<CategoryIcon category={emojiCategory.name as EmojiCategories} width='16' height='16' />
				)}
				<StyledEmojiCategoryName>
					{categoryNames?.[emojiCategory.name as EmojiCategories] ?? emojiCategory.name}
				</StyledEmojiCategoryName>
				<LeftArrowIcon
					width='16'
					height='16'
					style={{
						transition: 'transform .1s',
						transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
					}}
				/>
			</StyledEmojiCategoryHeader>
		</StyledEmojiCategoryHeaderWrapper>
	);
}

export default EmojiCategoryHeader;
