import { Wavery } from './wave'

export function waveInit(data) {
  let wavery = new Wavery(data)
  var svg = wavery.generateSvg()
  return svg
}
