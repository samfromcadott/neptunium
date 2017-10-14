var nodeTypes = {
	'Oscillator': {
		values: {
			frequency: 440,
			detune: 0
		},
		ui: {
			title: {type: 'title', text: 'Oscillator'},
			frequency: {type: 'knob', label: 'Frequency', value: 'frequency', min: 20, max: 20000}
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
