var nodeTypes = {
	'Oscillator': {
		values: {
			frequency: 440,
			detune: 0
		},
		ui: {
			title: {type: 'title', text: 'Oscillator'},
			frequency: {type: 'number', label: 'Frequency', value: 'frequency', min: 20, max: 20000},
			detune: {type: 'number', label: 'Detune', value: 'detune', min: -2400, max: 2400}
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
