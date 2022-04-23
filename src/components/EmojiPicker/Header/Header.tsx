import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';

import SearchIcon from '../../Icons/SearchIcon';
import XMarkIcon from '../../Icons/XMarkIcon';
import { emojiNameWithColons } from '../../../utils/utils';

import type { EmojiType, SetSearch, SetSelectedSkinTone } from '../EmojiPicker.types';
import { EmojiPickerClasses } from '../EmojiPickerContext';

interface HeaderProps {
	activeEmoji: EmojiType;
	selectedSkinTone: number;
	setSelectedSkinTone: SetSelectedSkinTone;
	search: string;
	setSearch: SetSearch;
}

const StyledHeader = styled('div')(({ theme }) => ({
	gridArea: 'header',
	display: 'flex',
	alignItems: 'center',
	backgroundColor: theme.background.secondaryAlt,
	boxShadow: theme.elevation.low,
	height: '48px',
	zIndex: 1,
	padding: '8px 16px',
}));

const StyledToneSelector = styled('details')(({ theme }) => ({
	marginLeft: '.5rem',
	overflow: 'hidden',
	cursor: 'pointer',
	userSelect: 'none',

	borderTopLeftRadius: '4px',
	borderTopRightRadius: '4px',

	'&[open] > *': {
		background: theme.background.tertiary,
	},
}));

const StyledToneIcon = styled('span')(({ theme }) => ({
	fontFamily: theme.typography.font.emoji,
	fontSize: '1.25rem',
	padding: '4px',

	'&:hover': {
		backgroundColor: theme.background.modifier.hover,
	},
}));

const StyledOtherTones = styled('div')({
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	borderBottomLeftRadius: '4px',
	borderBottomRightRadius: '4px',
});

const StyledSearch = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	backgroundColor: theme.background.tertiary,
	borderRadius: '4px',
	flex: 1,
	cursor: 'text',

	'&:focus-within': {
		outline: `2px solid ${theme.interactive.focus}`,
	},
}));

const StyledInput = styled('input')(({ theme }) => ({
	background: 'transparent',
	border: 0,
	fontSize: '1rem',
	lineHeight: '32px',
	padding: '0 8px',
	width: '100%',
	color: theme.text.normal,

	'&:focus': {
		outline: 'none',
	},
}));

const StyledIconWrapper = styled('div')({
	margin: '0 16px',
	height: '20px',
});

const StyledXMarkIcon = styled(XMarkIcon)(({ theme }) => ({
	cursor: 'pointer',
	'&:hover': {
		color: theme.interactive.hover,
	},
}));

const SKIN_TONES = ['👏', '👏🏻', '👏🏼', '👏🏽', '👏🏾', '👏🏿'];

export default function Header({
	activeEmoji,
	search,
	setSearch,
	selectedSkinTone,
	setSelectedSkinTone,
}: HeaderProps) {
	return (
		<StyledHeader className={EmojiPickerClasses.header}>
			<SearchInput activeEmoji={activeEmoji} search={search} setSearch={setSearch} />
			<SkinToneSelector
				selectedSkinTone={selectedSkinTone}
				setSelectedSkinTone={setSelectedSkinTone}
			/>
		</StyledHeader>
	);
}

interface SearchInputProps {
	activeEmoji: EmojiType;
	search: string;
	setSearch: SetSearch;
}

function SearchInput({ activeEmoji, search, setSearch }: SearchInputProps) {
	const placeholder = activeEmoji ? emojiNameWithColons(activeEmoji) : 'Find the perfect emoji';
	return (
		<StyledSearch className={EmojiPickerClasses.inputSearch}>
			<StyledInput
				type='text'
				placeholder={placeholder}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<StyledIconWrapper>
				{!search ? <SearchIcon /> : <StyledXMarkIcon onClick={() => setSearch('')} />}
			</StyledIconWrapper>
		</StyledSearch>
	);
}

interface SkinToneSelectorProps {
	selectedSkinTone: number;
	setSelectedSkinTone: SetSelectedSkinTone;
}

function SkinToneSelector({ selectedSkinTone, setSelectedSkinTone }: SkinToneSelectorProps) {
	const selectorRef = useRef<HTMLDetailsElement>(null);
	return (
		<StyledToneSelector ref={selectorRef} className={EmojiPickerClasses.skinToneSelector}>
			<summary style={{ listStyle: 'none', padding: '4px 0' }}>
				<StyledToneIcon>{SKIN_TONES[selectedSkinTone]}</StyledToneIcon>
			</summary>
			<SkinToneList
				selectorRef={selectorRef}
				selectedSkinTone={selectedSkinTone}
				setSelectedSkinTone={setSelectedSkinTone}
			/>
		</StyledToneSelector>
	);
}

interface SkinToneListProps {
	selectorRef: RefObject<HTMLDetailsElement>;
	selectedSkinTone: number;
	setSelectedSkinTone: SetSelectedSkinTone;
}

function SkinToneList({ selectorRef, selectedSkinTone, setSelectedSkinTone }: SkinToneListProps) {
	return (
		<StyledOtherTones>
			{SKIN_TONES.filter((_, i) => i !== selectedSkinTone).map(skinTone => (
				<StyledToneIcon
					className={EmojiPickerClasses.skinToneSelectorItem}
					key={skinTone}
					onClick={() => {
						setSelectedSkinTone(SKIN_TONES.indexOf(skinTone));
						if (selectorRef.current) selectorRef.current.open = false;
					}}
				>
					{skinTone}
				</StyledToneIcon>
			))}
		</StyledOtherTones>
	);
}
