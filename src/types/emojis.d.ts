import type { Emojis } from '../components/EmojiPicker/EmojiPicker.types';

declare module 'emojis.json' {
	const value: Emojis;
	export default value;
}
