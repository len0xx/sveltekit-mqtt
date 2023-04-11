import { browser } from "$app/environment"

if (!browser) {
  globalThis.Buffer = Buffer
  globalThis.window = {}
}

export default globalThis
