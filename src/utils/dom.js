
export function isDom(node) {
  return typeof node === 'object' && node.nodeType !== undefined
}

/**
 * @param {HTMLElement|Node} element
 */
export function getStyles(element) {
  return element.currentStyle || document.defaultView.getComputedStyle(element, null)
}

/**
 * @param {HTMLElement|Node} element
 * @param {string} propertyName
 * @param {boolean} prefixVendor
 * @return {string}
 */
export function getStyleProperty(element, propertyName, prefixVendor = false) {
  if (prefixVendor) {
    const prefixes = ['', '-webkit-', '-ms-', 'moz-', '-o-']
    for (let counter = 0; counter < prefixes.length; counter++) {
      const prefixedProperty = prefixes[counter] + propertyName
      const foundValue = getStyleProperty(element, prefixedProperty)

      if (foundValue) {
        return foundValue
      }
    }

    return ''
  }

  let propertyValue = ''

  if (element.currentStyle) {
    propertyValue = element.currentStyle[propertyName]
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    propertyValue = document.defaultView
      .getComputedStyle(element, null)
      .getPropertyValue(propertyName)
  }

  return propertyValue && propertyValue.toLowerCase ? propertyValue.toLowerCase() : propertyValue
}

export function getElementNode(selector, parent = document) {
  const node = isDom(selector) ? selector : (selector && parent.querySelector(selector)) || null
  return node.nodeType === 1 ? node : null
}

export function getElementNodes(selector, parent = document) {
  const nodes = isDom(selector) ?
    [selector] : (selector && Array.prototype.slice.call(parent.querySelectorAll(selector))) || [null]
  return nodes.filter(node => node && node.nodeType === 1)
}

/**
 * @param {HTMLElement|Node} el 
 * @param {string} cName 
 */
export function hasClass(el, cName) {
  return new RegExp('(^|\\s)' + cName + '($|\\s)').test(el.className)
}

/**
 * @param {HTMLElement|Node} el 
 * @param {string} cName 
 */
export function addClass(el, cName) {
  if (!cName || hasClass(el, cName)) {
    return
  }

  const elClass = el.className === '' ? ' ' : el.className
  if (elClass.charAt(elClass.length - 1) === ' ') {
    el.className += cName
  } else {
    el.className += (' ' + cName)
  }
}

/**
 * @param {HTMLElement|Node} el 
 * @param {string} cName 
 */
export function removeClass(el, cName) {
  if (!cName) {
    return ''
  }

  const classList = el.className.split(/\s+/)
  let idx = classList.indexOf(cName)
  if (idx > -1) {
    classList.splice(idx, 1)
    el.className = classList.join(' ')
    return cName
  }

  return ''
}
