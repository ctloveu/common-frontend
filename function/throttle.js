/**
 * @module 节流 间隔一定时间执行
    1.鼠标不断点击触发，mousedown(单位时间内只触发一次)。
    2.监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断。
 * @param {Function} fn
 * @param {Number} ms
 */

export default function throttle(fn, ms = 1000) {
    let isContinue = true
    return function(...args) {
        if (!isContinue) return
        isContinue = false
        setTimeout(() => {
            fn.apply(this, args)
            isContinue = true
        }, ms)
    }
}
