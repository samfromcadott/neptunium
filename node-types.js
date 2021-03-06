var nodeTypes = {
	'Input Note': {
		ui: {
			title: {type: 'title', text: 'Input Note'},
			noteOut: {type: 'bus-out', label: 'Value'}
		},
		css: {
			'background-color': 'white'
		}
	},
	'Oscillator': {
		values: {
			type: 'sine',
			frequency: 440,
			detune: 0,
			phase: 0
		},
		ui: {
			title: {type: 'title', text: 'Oscillator'},
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
		},
		component: Tone.Oscillator
	},
	'Mixer': {
		ui: {
			title: {type: 'title', text: 'Mixer'},
			audioIn: {type: 'bus-in', label: 'Audio In'}
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
		},
		component: Tone.AmplitudeEnvelope
	},
	'LFO': {
		values: {
			type: 'sine',
			min: 0,
			max: 1,
			frequency: 10,
			amplitude: 1,
			phase: 0
		},
		ui: {
			title: {type: 'title', text: 'Low Frequency Oscillator'},
			signalOut: {type: 'bus-out', label: 'Signal Out'},
			frequency: {type: 'number', label: 'Frequency', value: 'frequency', min: 0.1, max: 20, step: 0.1},
			amplitude: {type: 'number', label: 'Amplitude', value: 'amplitude', min: 0, max: 1, step: 0.01},
			phase: {type: 'number', label: 'Phase', value: 'phase', min: 0, max: 360},
			waveform: {type: 'dropdown', label: 'Waveform', value: 'type', options: [
				{label: 'Sine', value: 'sine'},
				{label: 'Square', value: 'square'},
				{label: 'Sawtooth', value: 'sawtooth'},
				{label: 'Triangle', value: 'triangle'}
			]},
			min: {type: 'number', label: 'Minimum', value: 'min', step: 0.1},
			max: {type: 'number', label: 'Maximum', value: 'max', step: 0.1},
		},
		css: {
			'background-color': 'white'
		},
		component: Tone.LFO
	}
}
