export const highlightCode = (codeStr) => {
  const re_svg = /svg/gi
  const re_path = /path/gi

  const re_symbols = /[<>\/]/gi
  const re_values = /="(.*?)"/gi
  const re_keys = /([a-zA-Z]*?)=/gi

  var newStr = ''
  var i = 0 //initial tracker
  var j = 1 //end tracker

  while (j < codeStr.length) {
    let current = codeStr.slice(i, j)
    if (re_symbols.test(current)) {
      newStr += `<span classname="highlight-symbol">"${current}"</span>`
      i = j
      j = j + 1
    } else if (re_svg.test(current)) {
      newStr += `<span classname="highlight-svg">"${current}"</span>`
      i = j
      j = j + 1
    } else if (re_path.test(current)) {
      newStr += `<span classname="highlight-path">"${current}"</span>`
      i = j
      j = j + 1
    } else if (re_values.test(current)) {
      newStr += `<span classname="highlight-value">"${current}"</span>`
      i = j
      j = j + 1
    } else if (re_keys.test(current)) {
      newStr += `<span classname="highlight-key">"${current}"</span>`
      i = j
      j = j + 1
    } else {
      j++
    }
  }

  return newStr
}
