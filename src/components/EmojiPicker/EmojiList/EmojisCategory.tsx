import React, { useState } from 'react';
import styled from 'styled-components';
import { getCustomEmoji } from '../../../utils/discordEndpoints';
import { getEmoji } from '../../../utils/utils';
import {
	CategoryNames,
	CategoryRefs,
	EmojiCategory,
	OnEmojiClick,
	SetActiveEmoji,
} from '../EmojiPicker.types';
import { useEmojiPickerContext, EmojiPickerClasses } from '../EmojiPickerContext';
import EmojiCategoryHeader from './EmojiCategoryHeader';

import type { EmojiType } from '../../Emoji';

interface EmojiCategoryProps {
	refs: CategoryRefs;
	onEmojiClick?: OnEmojiClick;
	emojiCategory: EmojiCategory;
	search: string;
	selectedSkinTone: number;
	setActiveEmoji: SetActiveEmoji;
	categoryNames: CategoryNames;
}

const StyledEmojiCategoryContainer = styled('div')({
	width: '100%',
	flex: 1,
});

const StyledEmojiCategory = styled('ul')(({ theme }) => ({
	listStyle: 'none',
	padding: 0,
	margin: 0,
	marginLeft: '4px',
	marginBottom: '12px',
	overflowX: 'auto',

	display: 'grid',
	gridTemplateColumns: 'repeat(9, 40px)',

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

const StyledEmojiGroupItem = styled('li')({
	padding: 0,
	margin: 0,
});

const StyledEmoji = styled('button')(({ theme }) => ({
	width: '40px',
	height: '40px',
	fontSize: '28px',
	fontFamily: theme.typography.font.emoji,
	background: 'none',
	border: 0,
	borderRadius: '4px',
	cursor: 'pointer',
	padding: 0,
	margin: 0,

	'&:hover': {
		backgroundColor: theme.background.accent,
	},
}));

function EmojisCategory({
	refs,
	onEmojiClick,
	emojiCategory,
	search,
	selectedSkinTone,
	setActiveEmoji,
	categoryNames,
}: EmojiCategoryProps): JSX.Element {
	const [expanded, setExpanded] = useState(true);
	const { setFrequentlyUsed } = useEmojiPickerContext();

	const filteredEmojis = emojiCategory.emojis.filter(emoji => filterEmojis(emoji, search));

	const handleClick = (emoji: EmojiType) => {
		const emojiToSave: EmojiType = {
			...emoji,
			...('id' in emoji && { serverName: emojiCategory.name }),
		};
		setFrequentlyUsed(emojis => {
			if (emojis.find(e => e.name === emojiToSave.name))
				return [
					emojiToSave,
					...emojis.filter(e => {
						if ('id' in emoji) return !('id' in e) || e.id !== emoji.id;
						return e.name !== emoji.name;
					}),
				];

			return [emojiToSave, ...emojis].splice(0, 18);
		});
		onEmojiClick?.(emojiToSave);
	};

	const handleHover = (emoji: EmojiType) => {
		setActiveEmoji({
			...emoji,
			...('id' in emoji && !emoji.serverName ? { serverName: emojiCategory.name } : null),
		});
	};

	if (!filteredEmojis.length) return <></>;

	return (
		<StyledEmojiCategoryContainer
			className={EmojiPickerClasses.emojiListGroup}
			ref={element => {
				if (refs.current) refs.current[emojiCategory.name] = element;
			}}
		>
			<EmojiCategoryHeader
				expanded={expanded}
				setExpanded={setExpanded}
				emojiCategory={emojiCategory}
				categoryNames={categoryNames}
			/>
			{expanded ? (
				<StyledEmojiCategory>
					{filteredEmojis.map(item => {
						const emoji = 'id' in item ? item : getEmoji(item, selectedSkinTone);

						return (
							<StyledEmojiGroupItem
								key={emoji.name}
								className={EmojiPickerClasses.emojiListGroupItem}
								onMouseEnter={() => handleHover(emoji)}
								onClick={() => handleClick(emoji)}
							>
								{'id' in emoji ? (
									<StyledEmoji>
										<img src={getCustomEmoji(emoji.id, emoji.animated)} width={32} height={32} />
									</StyledEmoji>
								) : (
									<StyledEmoji>{emoji.char}</StyledEmoji>
								)}
							</StyledEmojiGroupItem>
						);
					})}
				</StyledEmojiCategory>
			) : null}
		</StyledEmojiCategoryContainer>
	);
}

export default EmojisCategory;

const filterEmojis = (emoji: EmojiType, search: string): boolean =>
	emoji.name.split(' ').some(name => `:${name}:`.includes(search));
