// Builds the Creatica CLI command that reproduces the wave currently on the
// canvas. SVG Wave ships in Creatica as the `svgwave` generator; see
// https://github.com/anup-a/web-backgrounds/blob/main/docs/CLI.md#svg-wave
export const CREATICA_CLI_URL = 'https://www.npmjs.com/package/@creatica/cli'

export function buildCliCommand({
  wave,
  gradient,
  gradColors,
  bgColor,
  gradAngle,
  invert,
}) {
  const colors = gradient
    ? `${gradColors.colorOne},${gradColors.colorTwo}`
    : bgColor
  const args = [
    'npx @creatica/cli gen svgwave',
    `-w ${wave.width} -h ${wave.height}`,
    `-c "${colors}"`,
    '--bg "#0000"',
    `--set numRows=${wave.layerCount - 1}`,
    `--set numCols=${wave.segmentCount}`,
    `--set shapeHeight=${Math.round(wave.variance * 20) / 2}`,
  ]
  if (gradient) args.push(`--set angle=${gradAngle}`)
  else args.push('--set palette.gradientColor=false')
  if (invert) args.push('--set shapePosition=top')
  args.push('-o wave.svg')
  return args.join(' ')
}
