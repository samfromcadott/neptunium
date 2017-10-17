var nodeTypes = {
	'Oscillator': {
		values: {
			type: 'sine',
			frequency: 440,
			detune: 0,
			phase: 0
		},
		ui: {
			title: {type: 'title', text: 'Oscillator'},
			frequency: {type: 'number', label: 'Frequency', value: 'frequency', min: 20, max: 20000},
			detune: {type: 'number', label: 'Detune', value: 'detune', min: -2400, max: 2400},
			phase: {type: 'knob', label: 'Phase', value: 'phase', min: 0, max: 360},
			waveform: {type: 'dropdown', label: 'Waveform', value: 'type', options: [
				{label: 'Sine', value: 'sine'},
				{label: 'Square', value: 'square'},
				{label: 'Sawtooth', value: 'sawtooth'},
				{label: 'Triangle', value: 'triangle'}
			]}
		},
		css: {
			'background-color': 'green'
		}
	},
	'Amplitude Envelope': {
		ui: {
			title: {type: 'title', text: 'Amplitude Envelope'}
		},
		css: {}
	}
}
