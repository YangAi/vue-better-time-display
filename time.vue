<template>
    <component :is="tag">
      {{ date }}
      <slot />
    </component>
</template>
<script>
import Time from './time'
export default {
	name: 'Time',
	props: {
		time: {
			type: [Number, Date, String],
			required: true
		},
        tag: {
			type: String,
            default: 'span'
        },
		type: {
			type: String,
			validator (value) {
				return ['relative', 'date', 'datetime'].indexOf(value) > -1
			},
			default: 'relative'
		},
		interval: {
			type: Number,
			default: 60
		}
	},
	mounted () {
		this.setTime();
		this.timer = setInterval(() => {
			this.setTime()
		}, 1000 * this.interval)
	},
	beforeDestroy () {
		if (this.timer) clearInterval(this.timer)
	},
	data () {
		return {
			date: ''
		}
	},
	methods: {
		setTime () {
			const type = typeof this.time
			let time

			if (type === 'number') {
				const timestamp = this.time.toString().length > 10 ? this.time : this.time * 1000
				time = (new Date(timestamp)).getTime()
			} else if (type === 'object') {
				time = this.time.getTime()
			} else if (type === 'string') {
				time = (new Date(this.time.replace(/-/g, "/"))).getTime()
			}

			this.date = Time(time, this.type)

		}
	}
}
</script>
