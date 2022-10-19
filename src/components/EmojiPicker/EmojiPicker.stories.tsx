import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import Twemoji from '../../assets/TwemojiMozilla.ttf';

import { EmojiPicker, EmojiPickerProps } from '.';
import type { EmojiType } from '../Emoji';

import { Emoji } from '../Emoji/Emoji';

const meta: Meta<EmojiPickerProps> = {
	title: 'Emoji Picker',
	component: EmojiPicker,
};

export default meta;

const Template: Story<EmojiPickerProps> = args => {
	const [emoji, setEmoji] = useState<EmojiType | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
	const [open, setOpen] = useState(false);
	return (
		<div style={{ margin: '1rem' }}>
			<style>
				{`@font-face {
					font-family: 'Twemoji';
					src: url(${Twemoji});
				}`}
			</style>
			<Emoji ref={setAnchorEl} onClick={(): void => setOpen(!open)} emoji={emoji ?? '😄'} />
			<EmojiPicker {...args} anchorEl={anchorEl} open={open} onEmojiClick={setEmoji} />
		</div>
	);
};

export const Primary = Template.bind({});

export const WithCustomEmojis = Template.bind({});
WithCustomEmojis.args = {
	customEmojis: [
		{
			name: 'Your Server',
			iconURL: 'https://cdn.discordapp.com/embed/avatars/4.png',
			emojis: [
				{
					id: '454432821713567744',
					animated: true,
					name: 'dance',
				},
				{
					id: '723109632599523358',
					animated: true,
					name: 'pepoArriveFinger',
				},
				{
					id: '821498020860002315',
					animated: false,
					name: 'Sadge',
				},
			],
		},
	],
};

export const WithCustomCategoryNames = Template.bind({});
WithCustomCategoryNames.args = {
	categoryNames: {
		people: 'Osoby',
		frequentlyUsed: 'Często używane',
		nature: 'Natura',
		food: 'Jedzenie',
		activities: 'Aktywności',
		travel: 'Podróże',
		objects: 'Obiekty',
		symbols: 'Symbole',
		flags: 'Flagi',
	},
};
