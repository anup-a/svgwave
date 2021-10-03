/* bezier-spline.js
 *
 * computes cubic bezier coefficients to generate a smooth
 * line through specified points. couples with SVG graphics
 * for interactive processing.
 *
 * For more info see:
 * http://www.particleincell.com/2012/bezier-splines/
 *
 * Lubos Brieda, Particle In Cell Consulting LLC, 2012
 * you may freely use this algorithm in your codes however where feasible
 * please include a link/reference to the source article
 */
/*computes control points given knots K, this is the brain of the operation*/
export function computeControlPoints(K) {
  let p1 = new Array()
  let p2 = new Array()
  let n = K.length - 1

  /*rhs vector*/
  let a = new Array()
  let b = new Array()
  let c = new Array()
  let r = new Array()

  /*left most segment*/
  a[0] = 0
  b[0] = 2
  c[0] = 1
  r[0] = K[0] + 2 * K[1]

  /*internal segments*/
  for (let i = 1; i < n - 1; i++) {
    a[i] = 1
    b[i] = 4
    c[i] = 1
    r[i] = 4 * K[i] + 2 * K[i + 1]
  }

  /*right segment*/
  a[n - 1] = 2
  b[n - 1] = 7
  c[n - 1] = 0
  r[n - 1] = 8 * K[n - 1] + K[n]

  /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
  for (let i = 1; i < n; i++) {
    let m = a[i] / b[i - 1]
    b[i] = b[i] - m * c[i - 1]
    r[i] = r[i] - m * r[i - 1]
  }

  p1[n - 1] = r[n - 1] / b[n - 1]
  for (let i = n - 2; i >= 0; --i) p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i]

  /*we have p1, now compute p2*/
  for (let i = 0; i < n - 1; i++) p2[i] = 2 * K[i + 1] - p1[i + 1]

  p2[n - 1] = 0.5 * (K[n] + p1[n - 1])

  return { p1: p1, p2: p2 }
}
