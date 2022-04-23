export type Theme = {
	header: {
		primary: string;
		secondary: string;
	};
	text: {
		normal: string;
		muted: string;
		link: string;
	};
	interactive: {
		normal: string;
		hover: string;
		active: string;
		muted: string;
		focus: string;
	};
	background: {
		primary: string;
		secondary: string;
		secondaryAlt: string;
		tertiary: string;
		accent: string;
		floating: string;
		modifier: {
			hover: string;
			active: string;
			selected: string;
			accent: string;
		};
	};
	elevation: {
		stroke: string;
		low: string;
		medium: string;
		high: string;
	};
	typography: {
		font: {
			primary: string;
			display: string;
			code: string;
			headline: string;
			emoji: string;
		};
	};
};

const dark: Theme = {
	header: {
		primary: '#fff',
		secondary: '#b9bbbe',
	},
	text: {
		normal: '#dcddde',
		muted: '#72767d',
		link: '#00b0f4',
	},
	interactive: {
		normal: '#b9bbbe',
		hover: '#dcddde',
		active: '#fff',
		muted: '#4f545c',
		focus: '#00b0f4',
	},
	background: {
		primary: '#36393f',
		secondary: '#2f3136',
		secondaryAlt: '#292b2f',
		tertiary: '#202225',
		accent: '#4f545c',
		floating: '#18191c',
		modifier: {
			hover: 'rgba(79, 84, 92, 0.4)',
			active: 'rgba(79, 84, 92, 0.6)',
			selected: 'rgba(79, 84, 92, 0.6)',
			accent: 'rgba(79, 84, 92, 0.48)',
		},
	},
	elevation: {
		stroke: '0 0 0 1px rgba(4, 4, 5, 0.15)',
		low: '0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05)',
		medium: '0 4px 4px rgba(0, 0, 0, 0.16)',
		high: '0 8px 16px rgba(0, 0, 0, 0.24)',
	},
	typography: {
		font: {
			primary: 'Whitney, "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
			display: 'Ginto, "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
			code: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
			headline: 'Ginto Nord, Ginto, "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
			emoji:
				'Twemoji, "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", Times, Symbola, serif',
		},
	},
};

const light: Theme = {
	header: {
		primary: '#060607',
		secondary: '#4f5660',
	},
	text: {
		normal: '#2e3338',
		muted: '#747f8d',
		link: '#0067e0',
	},
	interactive: {
		normal: '#4f5660',
		hover: '#2e3338',
		active: '#060607',
		muted: '#c7ccd1',
		focus: '#00b0f4',
	},
	background: {
		primary: '#fff',
		secondary: '#f2f3f5',
		secondaryAlt: '#ebedef',
		tertiary: '#e3e5e8',
		accent: '#747f8d',
		floating: '#fff',
		modifier: {
			hover: 'rgba(116, 127, 141, 0.08)',
			active: 'rgba(116, 127, 141, 0.16)',
			selected: 'rgba(116, 127, 141, 0.24)',
			accent: 'rgba(6, 6, 7, 0.08)',
		},
	},
	elevation: {
		stroke: '0 0 0 1px rgba(6, 6, 7, 0.08)',
		low: '0 1px 0 rgba(6, 6, 7, 0.1), 0 1.5px 0 rgba(6, 6, 7, 0.025), 0 2px 0 rgba(6, 6, 7, 0.025)',
		medium: '0 4px 4px rgba(0, 0, 0, 0.08)',
		high: '0 8px 16px rgba(0, 0, 0, 0.16)',
	},
	typography: {
		font: {
			primary: 'Whitney, "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
			display: 'Ginto, "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
			code: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
			headline: 'Ginto Nord, Ginto, "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
			emoji:
				'Twemoji, "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", Times, Symbola, serif',
		},
	},
};

export const theme: {
	dark: Theme;
	light: Theme;
} = {
	dark,
	light,
};
