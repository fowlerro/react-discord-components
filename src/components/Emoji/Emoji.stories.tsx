import React from 'react';
import { Story, Meta } from '@storybook/react';

import Twemoji from '../../assets/TwemojiMozilla.ttf';

import { Emoji, EmojiProps } from '.';

const meta: Meta<EmojiProps> = {
	title: 'Emoji',
	component: Emoji,
};

export default meta;

const Template: Story<EmojiProps> = args => {
	return (
		<div style={{ margin: '1rem' }}>
			<style>
				{`@font-face {
					font-family: 'Twemoji';
					src: url(${Twemoji});
				}
				`}
			</style>
			<Emoji {...args} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	emoji: '😄',
};

export const EmojiObject = Template.bind({});
EmojiObject.args = {
	emoji: {
		name: 'smiley',
		char: '😄',
	},
};

export const CustomEmoji = Template.bind({});
CustomEmoji.args = {
	emoji: {
		id: '821498020851875920',
		name: 'pepeGood',
		animated: false,
	},
};

export const AnimatedEmoji = Template.bind({});
AnimatedEmoji.args = {
	emoji: {
		id: '454432821713567744',
		name: 'dance',
		animated: true,
	},
};
