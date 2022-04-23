import React, { memo } from 'react';
import styled from 'styled-components';

import CategoryIcon from './CategoryIcon';

import type { CategoryRefs, CustomCategory } from '../EmojiPicker.types';
import {
	useEmojiPickerContext,
	emojiCategories,
	EmojiCategories,
	EmojiPickerClasses,
} from '../EmojiPickerContext';

interface CategoryListProps {
	refs: CategoryRefs;
	customCategories: CustomCategory[];
}

const StyledEmojiCategories = styled('div')(({ theme }) => ({
	gridArea: 'categories',
	overflow: 'hidden auto',
	backgroundColor: theme.background.tertiary,
	borderRadius: '0 0 0 8px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	paddingBlock: '12px',
	paddingRight: 0,

	scrollbarWidth: 'none',
	msOverflowStyle: 'none',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
}));

const Divider = styled('hr')(({ theme }) => ({
	width: '32px',
	margin: '12px 0',
	border: 'none',
	borderBottom: `1px solid ${theme.background.modifier.accent}`,
}));

function CategoryList({ refs, customCategories }: CategoryListProps) {
	const { frequentlyUsed } = useEmojiPickerContext();
	return (
		<StyledEmojiCategories className={EmojiPickerClasses.categoryList}>
			{frequentlyUsed.length ? (
				<CategoryItem category='frequentlyUsed' categoryRefs={refs} />
			) : null}
			<CustomCategories refs={refs} customCategories={customCategories} />
			{emojiCategories
				.filter(category => category !== 'frequentlyUsed')
				.map(category => (
					<CategoryItem key={category} category={category} categoryRefs={refs} />
				))}
		</StyledEmojiCategories>
	);
}

function CustomCategories({ refs, customCategories }: CategoryListProps) {
	return (
		<>
			{customCategories?.length ? (
				<>
					{customCategories.map(category => (
						<CustomCategoryItem key={category.name} category={category} refs={refs} />
					))}
					<Divider />
				</>
			) : null}
		</>
	);
}

interface CategoryItemProps {
	category: string;
	categoryRefs: CategoryRefs;
}

const StyledCategoryItem = styled('div')(({ theme }) => ({
	width: '24px',
	height: '24px',
	borderRadius: '4px',
	padding: '4px',
	cursor: 'pointer',
	transition: 'background-color 0.1s ease-in-out',

	'&:hover': {
		backgroundColor: theme.background.modifier.hover,
		color: theme.text.normal,
	},
}));

function CategoryItem({ category, categoryRefs }: CategoryItemProps) {
	const handleClick = () => {
		categoryRefs.current[category]?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<StyledCategoryItem className={EmojiPickerClasses.categoryListItem} onClick={handleClick}>
			<CategoryIcon category={category as EmojiCategories} />
		</StyledCategoryItem>
	);
}

interface CustomCategoryItemProps {
	category: CustomCategory;
	refs: CategoryRefs;
}

const StyledCategoryCustomItem = styled('div')({
	width: '32px',
	height: '32px',
	cursor: 'pointer',
	padding: '4px',
	'& > img': {
		borderRadius: '50%',
		transition: 'border-radius .1s',
		'&:hover': {
			borderRadius: '8px',
		},
	},
});

function CustomCategoryItem({ category, refs }: CustomCategoryItemProps): JSX.Element {
	const handleClick = () => {
		refs.current[category.name]?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<StyledCategoryCustomItem
			className={EmojiPickerClasses.categoryListCustomItem}
			onClick={handleClick}
		>
			<img src={category.iconURL} alt={category.name} width='32' height='32' />
		</StyledCategoryCustomItem>
	);
}

export default memo(CategoryList);
