import React from 'react';
import styled from 'styled-components';
import { getCustomEmoji } from '../../utils/discordEndpoints';
import { EmojiType } from '../EmojiPicker/EmojiPicker.types';

export type EmojiProps = {
	emoji: EmojiType | string;
} & React.ComponentPropsWithRef<'span'>;

export const EmojiClasses = {
	root: 'RDC-Emoji',
};

const StyledEmoji = styled.span<{ customEmoji?: string }>(({ customEmoji }) => ({
	width: '48px',
	height: '48px',
	padding: 0,
	background: 'none',
	border: 0,
	outline: 0,
	position: 'relative',
	lineHeight: '48px',
	fontSize: '48px',
	verticalAlign: 'bottom',
	fontFamily: 'Twemoji',
	margin: '.1rem',
	display: 'inline-block',
	cursor: 'default',
	...(customEmoji && {
		backgroundImage: `url(${customEmoji})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	}),
}));

export const Emoji = React.forwardRef<HTMLSpanElement, EmojiProps>(
	({ emoji, className, ...props }, ref) => {
		const classes = className ? `${EmojiClasses.root} ${className}` : EmojiClasses.root;
		if (emoji) {
			if (typeof emoji === 'string')
				return (
					<StyledEmoji ref={ref} className={classes} {...props}>
						{emoji}
					</StyledEmoji>
				);

			if ('char' in emoji)
				return (
					<StyledEmoji ref={ref} className={classes} {...props}>
						{emoji.char}
					</StyledEmoji>
				);

			if ('id' in emoji)
				return (
					<StyledEmoji
						ref={ref}
						className={classes}
						{...props}
						customEmoji={getCustomEmoji(emoji.id, emoji.animated)}
					/>
				);
		}

		return (
			<StyledEmoji ref={ref} className={classes} {...props}>
				😄
			</StyledEmoji>
		);
	}
);

Emoji.displayName = 'Emoji';
