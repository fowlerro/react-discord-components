import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { EmojiPicker, DefaultEmoji, CustomEmoji, Emoji } from '../dist';

import './styles.css';

const StyledEmoji = styled(Emoji)({
	padding: '5px',
	borderRadius: '5px',
	cursor: 'pointer',

	'&:hover': {
		backgroundColor: 'rgba(255,255,255,.2)',
	},
});

const Switch = styled.div<{ val: boolean }>(({ val }) => ({
	backgroundColor: '#555',
	borderRadius: '50px',
	width: '60px',
	height: '30px',
	marginInline: 'auto',
	marginBottom: '1rem',
	position: 'relative',
	cursor: 'pointer',

	'::before': {
		content: '" "',
		display: 'block',
		width: '25px',
		height: '25px',
		borderRadius: '50%',
		backgroundColor: val ? '#222' : '#fff',
		position: 'absolute',
		top: '50%',
		left: 0,
		transform: `translate(${val ? '2px' : '33px'}, -50%)`,
		transitionProperty: 'transform color',
		transitionDuration: '.125s',
	},
}));

const App = () => {
	const [open, setOpen] = React.useState(false);
	const [emoji, setEmoji] = React.useState<DefaultEmoji | CustomEmoji>();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

	const handleEmojiClick = (emoji: DefaultEmoji | CustomEmoji) => {
		setEmoji(emoji);
		setOpen(false);
	};

	return (
		<div>
			<h1>React Discord Components</h1>
			<section>
				<h2>Emoji Picker</h2>
				<div>
					<p>Theme</p>
					<Switch
						val={theme === 'dark'}
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					/>
				</div>
				<StyledEmoji ref={setAnchorEl} onClick={() => setOpen(!open)} emoji={emoji} />
				<EmojiPicker
					theme={theme}
					open={open}
					anchorEl={anchorEl}
					onEmojiClick={handleEmojiClick}
					placementOffsets={[10, 10]}
					customEmojis={[
						{
							name: 'Custom Emojis',
							iconURL: 'https://cdn.discordapp.com/emojis/821498020851875920.png',
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
					]}
				/>
			</section>
			<footer style={{ position: 'absolute', top: '10px' }}>
				<a href='https://github.com/fowlerro/react-discord-components'>
					<img src={require('./GithubLogo.png')} alt='Github repository' />
				</a>
			</footer>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
