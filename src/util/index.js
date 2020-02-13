export function debounce(delay, callback) {
  let lastTime
  return function () {
    clearTimeout(lastTime)
    const [that, args] = [this, arguments]
    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  const observer = new MutationObserver(callback)
  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
  return observer
}