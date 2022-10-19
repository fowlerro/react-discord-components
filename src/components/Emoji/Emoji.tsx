import React from 'react';
import styled from 'styled-components';

import { getCustomEmoji } from '../../utils/discordEndpoints';
import { getTwemojiURL, isCustomEmoji, isDefaultEmoji } from '../../utils/utils';

import type { EmojiProps } from './Emoji.types';

export const EmojiClasses = {
	root: 'RDC-Emoji',
};

const StyledEmoji = styled.img({
	width: '48px',
	height: '48px',
	padding: 0,
	background: 'none',
	border: 0,
	outline: 0,
	display: 'inline-block',
	cursor: 'default',
});

export const Emoji = React.forwardRef<HTMLImageElement, EmojiProps>(
	({ emoji, className, ...props }, ref) => {
		const classes = className ? `${EmojiClasses.root} ${className}` : EmojiClasses.root;

		if (typeof emoji === 'string' || isDefaultEmoji(emoji)) {
			const emojiChar = isDefaultEmoji(emoji) ? emoji.char : emoji;
			return (
				<StyledEmoji
					{...props}
					ref={ref}
					className={classes}
					src={getTwemojiURL(emojiChar)}
					alt={emojiChar}
				/>
			);
		}

		if (isCustomEmoji(emoji))
			return (
				<StyledEmoji
					{...props}
					ref={ref}
					className={classes}
					src={getCustomEmoji(emoji.id, emoji.animated)}
					alt={emoji.name}
				/>
			);

		return (
			<StyledEmoji {...props} ref={ref} className={classes} src={getTwemojiURL('😄')} alt={'😄'} />
		);
	}
);

Emoji.displayName = 'Emoji';
