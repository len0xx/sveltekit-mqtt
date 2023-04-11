<script lang="ts">
    import { browser } from '$app/environment'
	import { value } from '$lib/stores'
	import mqtt, { Client } from 'mqtt'
    import { writable } from 'svelte/store'

	const STORAGE_NAME = 'mqtt-test'
	const client = writable<Client | null>(null)

	if (browser) {
		$client = mqtt.connect('ws://test.mosquitto.org:8080')
		$client.on('connect', () => {
			$client!.subscribe(STORAGE_NAME, (err) => {
				if (!err) {
					$client!.publish(STORAGE_NAME, $value.toString())
				}
			})
		})

		$client.on('message', (_topic, message) => {
			$value = +(message.toString())
		})
	}

	const update = (event: Event) => {
		const newValue = (event.target as HTMLInputElement).value
		$client!.publish(STORAGE_NAME, newValue.toString())
	}
</script>

<h1>Power</h1>
<input type="range" name="range" id="range" value={ $value } on:change={ update } />
<p>Value: { $value }</p>
