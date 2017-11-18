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
			cvIn: {type: 'bus-in', label: 'CV In'},
			audioOut: {type: 'bus-out', label: 'Audio Out'},
			frequency: {type: 'number', label: 'Frequency', value: 'frequency', min: 20, max: 20000},
			detune: {type: 'number', label: 'Detune', value: 'detune'},
			phase: {type: 'number', label: 'Phase', value: 'phase', min: 0, max: 360},
			waveform: {type: 'dropdown', label: 'Waveform', value: 'type', options: [
				{label: 'Sine', value: 'sine'},
				{label: 'Square', value: 'square'},
				{label: 'Sawtooth', value: 'sawtooth'},
				{label: 'Triangle', value: 'triangle'}
			]}
		},
		css: {
			'background-color': 'white'
		}
	},
	'Amplitude Envelope': {
		values: {
			attack: 0.1,
			decay: 0.2,
			sustain: 0.8,
			release: 0.5
		},
		ui: {
			title: {type: 'title', text: 'Amplitude Envelope'},
			audiIn:  {type: 'bus-in', label: 'Audio In'},
			audioOut: {type: 'bus-out', label: 'Audio Out'},
			attack: {type: 'number', label: 'Attack', value: 'attack', min: 0, step: 0.01},
			decay: {type: 'number', label: 'Decay', value: 'decay', min: 0, step: 0.01},
			sustain: {type: 'number', label: 'Sustain', value: 'sustain', min: 0, step: 0.01},
			release: {type: 'number', label: 'Release', value: 'release', min: 0, step: 0.01}
		},
		css: {
			'background-color': '#2b1246',
			'color': '#e8e8e8'
		}
	}
}
