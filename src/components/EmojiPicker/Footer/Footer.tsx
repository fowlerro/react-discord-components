import React from 'react';
import styled from 'styled-components';

import { getCustomEmoji } from '../../../utils/discordEndpoints';

import { emojiNameWithColons, getEmojiCharacter } from '../../../utils/utils';
import { EmojiPickerClasses } from '../EmojiPickerContext';
import { CustomCategory, EmojiType } from '../EmojiPicker.types';

interface FooterProps {
	activeEmoji: EmojiType;
	selectedSkinTone: number;
	customCategories: CustomCategory[];
}

const StyledFooter = styled('div')(({ theme }) => ({
	gridArea: 'footer',
	backgroundColor: theme.background.secondaryAlt,
	height: '48px',
	display: 'flex',
	alignItems: 'center',
	padding: '0 16px',
	gap: '.5rem',
	pointerEvents: 'none',
	userSelect: 'none',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	textAlign: 'left',
}));

const StyledEmoji = styled('span')(({ theme }) => ({
	fontSize: '1.75rem',
	fontFamily: theme.typography.font.emoji,
}));

const TextWrapper = styled('div')(({ theme }) => ({
	fontFamily: theme.typography.font.primary,
	color: theme.text.normal,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
}));

const StyledNames = styled('span')(({ theme }) => ({
	fontFamily: theme.typography.font.primary,
	color: theme.text.normal,
	fontWeight: 500,
	fontSize: '16px',
	lineHeight: '20px',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
}));

const ServerName = styled('span')(({ theme }) => ({
	fontFamily: theme.typography.font.primary,
	color: theme.interactive.normal,
	fontSize: '11px',
	lineHeight: '16px',
}));

const ServerIcon = styled('img')({
	marginLeft: 'auto',
	borderRadius: '8px',
});

export default function Footer({ activeEmoji, selectedSkinTone, customCategories }: FooterProps) {
	const emoji = activeEmoji
		? 'id' in activeEmoji
			? getCustomEmoji(activeEmoji.id, activeEmoji.animated)
			: getEmojiCharacter(activeEmoji, selectedSkinTone)
		: null;

	const category =
		activeEmoji &&
		'id' in activeEmoji &&
		customCategories.find(category => category.name === activeEmoji.serverName);

	return (
		<StyledFooter className={EmojiPickerClasses.footer}>
			{emoji && (
				<StyledEmoji className={EmojiPickerClasses.footerEmoji}>
					{activeEmoji && 'id' in activeEmoji ? <img src={emoji} width={28} height={28} /> : emoji}
				</StyledEmoji>
			)}
			<TextWrapper className={EmojiPickerClasses.footerEmojiText}>
				<StyledNames>{activeEmoji ? emojiNameWithColons(activeEmoji) : null}</StyledNames>
				{category && (
					<ServerName>
						from <strong style={{ fontWeight: 800 }}>{category.name}</strong>
					</ServerName>
				)}
			</TextWrapper>
			{category && (
				<ServerIcon
					className={EmojiPickerClasses.footerEmojiServerIcon}
					src={category.iconURL}
					width={32}
					height={32}
				/>
			)}
		</StyledFooter>
	);
}
