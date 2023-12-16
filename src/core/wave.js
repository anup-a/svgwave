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

function createPath(
  xPoints,
  yPoints,
  controlPointsX,
  controlPointsY,
  cornerPoint,
) {
  let path = `M ${cornerPoint.x},${cornerPoint.y} C ${cornerPoint.x},${cornerPoint.y} ${xPoints[0]},${yPoints[0]} ${xPoints[0]},${yPoints[0]} `
  for (let i = 0; i < xPoints.length - 1; i++) {
    path += `C ${controlPointsX.p1[i]},${controlPointsY.p1[i]} ${
      controlPointsX.p2[i]
    },${controlPointsY.p2[i]} ${xPoints[i + 1]},${yPoints[i + 1]} `
  }
  return path
}

function generateClosedPath(
  curvePoints,
  leftCornerPoint,
  rightCornerPoint,
  fillColor,
  strokeColor,
  strokeWidth,
  transform,
  isAnimated,
  ...animationPoints
) {
  const xPoints = curvePoints.map((p) => p.x)
  const yPoints = curvePoints.map((p) => p.y)
  const xControlPoints = computeControlPoints(xPoints)
  const yControlPoints = computeControlPoints(yPoints)

  // Start the path from the left bottom corner
  let path = `M ${leftCornerPoint.x},${leftCornerPoint.y} `

  // Initial line to the first point
  path += `L ${xPoints[0]},${yPoints[0]} `

  // Creating the bezier curve for the rest of the points
  for (let i = 0; i < xPoints.length - 1; i++) {
    path += `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ${
      xControlPoints.p2[i]
    },${yControlPoints.p2[i]} ${xPoints[i + 1]},${yPoints[i + 1]} `
  }

  // Closing the path back to the right bottom corner and then to the left bottom corner
  path += `L ${rightCornerPoint.x},${rightCornerPoint.y} L ${leftCornerPoint.x},${leftCornerPoint.y} Z`

  // Handle the animated path, if applicable
  const animatedPaths = isAnimated
    ? animationPoints.map((points) => {
        const aniXPoints = points.map((p) => p.x)
        const aniYPoints = points.map((p) => p.y)
        const aniXControlPoints = computeControlPoints(aniXPoints)
        const aniYControlPoints = computeControlPoints(aniYPoints)

        let animatedPath = `M ${leftCornerPoint.x},${leftCornerPoint.y} L ${aniXPoints[0]},${aniYPoints[0]} `

        for (let i = 0; i < aniXPoints.length - 1; i++) {
          animatedPath += `C ${aniXControlPoints.p1[i]},${
            aniYControlPoints.p1[i]
          } ${aniXControlPoints.p2[i]},${aniYControlPoints.p2[i]} ${
            aniXPoints[i + 1]
          },${aniYPoints[i + 1]} `
        }

        animatedPath += `L ${rightCornerPoint.x},${rightCornerPoint.y} L ${leftCornerPoint.x},${leftCornerPoint.y} Z`
        return animatedPath
      })
    : undefined

  return {
    fill: fillColor,
    strokeColor,
    strokeWidth,
    d: path,
    transform,
    animatedPath: animatedPaths,
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

    if (this.properties.animated) {
      this.aniPoints = Array.from({ length: 3 }, () =>
        generatePoints(
          this.properties.width,
          this.properties.height,
          this.properties.segmentCount,
          this.properties.layerCount,
          this.properties.variance,
          this.properties.activeMode,
        ),
      )
    }
  }

  generateSvg() {
    const pathList = this.points.map((pointLayer, i) =>
      generateClosedPath(
        pointLayer,
        { x: 0, y: this.properties.height },
        { x: this.properties.width, y: this.properties.height },
        this.properties.fillColor,
        this.properties.strokeColor,
        this.properties.strokeWidth,
        this.properties.transform,
        this.properties.animated,
        ...(this.properties.animated
          ? this.aniPoints.map((aniPoint) => aniPoint[i])
          : []),
      ),
    )

    return {
      svg: {
        width: this.properties.width,
        height: this.properties.height,
        xmlns: svgns,
        path: pathList,
      },
    }
  }
}
