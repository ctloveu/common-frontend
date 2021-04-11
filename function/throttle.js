/**
 * @module 节流 间隔一定时间执行
    1.鼠标不断点击触发，mousedown(单位时间内只触发一次)。
    2.监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断。
 * @param {Function} fn
 * @param {Number} ms
 */

// 初级节流
// 缺点： 没有处理fn返回值
export function simpleThrottle(fn, ms = 1000) {
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

export default function throttle(fn, ms = 1000) {
    let timer = null
    let args
    let flag = false

    // 这种写法 flag为true  return返回时，会造成调用的地方报错
    // function main(...arg) {
    //     if (flag) {
    //         // 在此处不能清除timer等，因为setTimeout是后触发，此时第一次执行throttle后，setTimeout的内容还未执行
    //         return
    //     }
    //     if (timer) {
    //         cancel()
    //     }

    //     flag =  true
    //     args = arg
    //     return new Promise((resolve, reject) => {
    //         timer = setTimeout(async() => {
    //             try {
    //                 resolve(await fn.apply(this, args))
    //                 cancel()
    //             } catch (error) {
    //                 reject(error)
    //                 cancel()
    //             }
    //         })
    //     })
    // }

    function main(...arg) {
        return new Promise((resolve, reject) => {
            if (flag) {
                return resolve(`${fn}函数${ms}s内只会执行一次`)
            }
            if (timer) {
                cancel()
            }
            flag = true
            args = arg

            timer = setTimeout(async() => {
                try {
                    resolve(await fn.apply(this, args))
                    cancel()
                } catch (error) {
                    reject(error)
                    cancel()
                }
            })
        })
    }

    function cancel() {
        clearTimeout(timer)
        timer = null
        flag = false
    }

    function flush() {
        cancel()
        return fn.apply(this, args)
    }

    main.cancel = function() {
        cancel()
        args = null
    }
    main.flush = flush

    return main
}
