import * as React from 'react'
import { ScrambleDisplayAttributes } from './display'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'scramble-display': ScrambleDisplayProps
		}
	}
}

interface ScrambleDisplayProps
	extends React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>,
		ScrambleDisplayAttributes {}
