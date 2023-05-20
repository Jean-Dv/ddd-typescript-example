import { MoocBackendApp } from "./MoocBackendApp"

try {
  new MoocBackendApp().start()
} catch (e) {
  console.error(e)
  process.exit(1)
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err)
  process.exit(1)
})
