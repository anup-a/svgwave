const defaultOptions = {}
const svgns = 'http://www.w3.org/2000/svg'
import { computeControlPoints } from './bezier-spline'

// Yeah... cyclohexane
const conformations = {
  classic: {},
  chairLeft: {
    delta: 75,
  },
  chairRight: {
    delta: -75,
    offsetY: true,
  },
  boat: {
    startY: 1,
    endY: 1,
  },
  invertedBoat: {
    startY: 0,
    endY: 0,
  },
}

// layercount is default to 2. Increasing the number would stack up n-1 waves.
function generatePoints(
  width,
  height,
  segmentCount,
  layerCount,
  variance,
  activeMode,
) {
  const cellWidth = width / segmentCount
  const cellHeight = height / layerCount
  const moveLimitX = cellWidth * variance * 0.5
  const moveLimitY = cellHeight * variance

  const points = []
  let layrIdx = 1
  const mode = conformations[activeMode]

  let y = moveLimitY + (mode.offsetY ? (layerCount - 1) * 75 : 0)

  while (layrIdx < layerCount) {
    let pointsPerLayer = []
    let level = 0
    pointsPerLayer.push({
      x: 0,
      y: mode.startY !== undefined ? mode.startY * height : Math.floor(y),
    })

    for (let x = cellWidth; x < width; x += cellWidth) {
      //@anup: this decides whether a segment is crest or trough
      const varietalY = y - moveLimitY / 2 + Math.random() * moveLimitY + level

      const varietalX = x - moveLimitX / 2 + Math.random() * moveLimitX
      pointsPerLayer.push({
        x: Math.floor(varietalX),
        y: Math.floor(varietalY),
      })
      if (mode.delta) {
        level += mode.delta
      }
    }
    pointsPerLayer.push({
      x: width,
      y: mode.endY !== undefined ? mode.endY * height : Math.floor(y + level),
    })

    points.push(pointsPerLayer)
    y += cellHeight
    layrIdx += 1
  }
  return points
}

function generateClosedPath(
  curvePoints,
  leftCornerPoint,
  rightCornerPoint,
  filleColor,
  strokeColor,
  strokeWidth,
  transform,
  isAnimated,
  aniPoints,
  aniPoints1,
  aniPoints2,
) {
  const xPoints = curvePoints.map((p) => p.x)
  const yPoints = curvePoints.map((p) => p.y)

  const xControlPoints = computeControlPoints(xPoints)
  const yControlPoints = computeControlPoints(yPoints)
  const animatedPathList = isAnimated ? [] : undefined

  let path =
    `M ${leftCornerPoint.x},${leftCornerPoint.y} ` +
    `C ${leftCornerPoint.x},${leftCornerPoint.y} ` +
    `${xPoints[0]},${yPoints[0]} ` +
    `${xPoints[0]},${yPoints[0]} `

  for (let i = 0; i < xPoints.length - 1; i++) {
    path +=
      `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ` +
      `${xControlPoints.p2[i]},${yControlPoints.p2[i]} ` +
      `${xPoints[i + 1]},${yPoints[i + 1]} `
  }

  path +=
    `C ${xPoints[xPoints.length - 1]},${yPoints[xPoints.length - 1]} ` +
    `${rightCornerPoint.x},${rightCornerPoint.y} ` +
    `${rightCornerPoint.x},${rightCornerPoint.y} Z`

  const animationPoints = [aniPoints, aniPoints1, aniPoints2]

  if (isAnimated) {
    animationPoints.forEach((points) => {
      const aniYPoints = points.map((p) => p.y)
      const aniXPoints = points.map((p) => p.x)

      const [aniXControlPoints, aniYControlPoints] = [
        computeControlPoints(aniXPoints),
        computeControlPoints(aniYPoints),
      ]

      let animatedPath =
        `M ${leftCornerPoint.x},${leftCornerPoint.y} ` +
        `C ${leftCornerPoint.x},${leftCornerPoint.y} ` +
        `${aniXPoints[0]},${aniYPoints[0]} ` +
        `${aniXPoints[0]},${aniYPoints[0]} `

      for (let i = 0; i < xPoints.length - 1; i++) {
        animatedPath +=
          `C ${aniXControlPoints.p1[i]},${aniYControlPoints.p1[i]} ` +
          `${aniXControlPoints.p2[i]},${aniYControlPoints.p2[i]} ` +
          `${aniXPoints[i + 1]},${aniYPoints[i + 1]} `
      }

      animatedPath +=
        `C ${aniXPoints[xPoints.length - 1]},${
          aniYPoints[xPoints.length - 1]
        } ` +
        `${rightCornerPoint.x},${rightCornerPoint.y} ` +
        `${rightCornerPoint.x},${rightCornerPoint.y} Z`

      animatedPathList.push(animatedPath)
    })
  }

  return {
    fill: filleColor,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth,
    d: path,
    transform: transform,
    animatedPath: animatedPathList,
  }
}

export class Wavery {
  constructor(properties) {
    this.properties = { ...defaultOptions, ...properties }
    this.points = generatePoints(
      this.properties.width,
      this.properties.height,
      this.properties.segmentCount,
      this.properties.layerCount,
      this.properties.variance,
      this.properties.activeMode,
    )
    //TODO: refactor repetitive code
    this.aniPoints = [
      this.properties.animated &&
        generatePoints(
          this.properties.width,
          this.properties.height,
          this.properties.segmentCount,
          this.properties.layerCount,
          this.properties.variance,
          this.properties.activeMode,
        ),
      this.properties.animated &&
        generatePoints(
          this.properties.width,
          this.properties.height,
          this.properties.segmentCount,
          this.properties.layerCount,
          this.properties.variance,
          this.properties.activeMode,
        ),
      this.properties.animated &&
        generatePoints(
          this.properties.width,
          this.properties.height,
          this.properties.segmentCount,
          this.properties.layerCount,
          this.properties.variance,
          this.properties.activeMode,
        ),
    ]
  }

  generateSvg() {
    const pathList = []
    // Append layer of a wave
    for (let i = 0; i < this.points.length; i++) {
      const pathData = generateClosedPath(
        this.points[i],
        { x: 0, y: this.properties.height },
        { x: this.properties.width, y: this.properties.height },
        this.properties.fillColor,
        this.properties.strokeColor,
        this.properties.strokeWidth,
        this.properties.transform,
        this.properties.animated,
        //TODO: refactor repetitive code
        this.properties.animated ? this.aniPoints[0][i] : null,
        this.properties.animated ? this.aniPoints[1][i] : null,
        this.properties.animated ? this.aniPoints[2][i] : null,
      )
      pathList.push(pathData)
    }

    const svgData = {
      svg: {
        width: this.properties.width,
        height: this.properties.height,
        xmlns: svgns,
        path: pathList,
      },
    }

    return svgData
  }
}
