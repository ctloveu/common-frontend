/**
 * @module 防抖 一段时间内只执行一次
    1.search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
    2.window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次。
 * @param {Function} fn
 * @param {Number} ms
 */
export default function debounce(fn, ms = 500) {
    let timer
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, ms)
    }
}
