import React from 'react';

export default function LeftArrowIcon(props: React.SVGAttributes<SVGSVGElement>): JSX.Element {
	return (
		<svg width='20' height='20' viewBox='0 0 24 24' {...props}>
			<path
				fill='currentColor'
				fillRule='evenodd'
				clipRule='evenodd'
				d='M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z'
			></path>
		</svg>
	);
}
