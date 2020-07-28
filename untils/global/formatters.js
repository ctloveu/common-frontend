/**
 * @file  用于格式表格值的 formatter
 */

import { get, map } from 'lodash'
// import formatDate from 'library/functions/formatDate'
// import divide from 'library/functions/divide'

const EMPTY_PLACEHOLDER = '--'

/**
 * 格式化时间
 */
const dateFormatter = (value, mask = 'yyyy/MM/dd') => {
    return value ? formatDate(value, mask) : EMPTY_PLACEHOLDER
}

/**
 * 格式化枚举类型值
 */
const enumFormatter = (value) => {
    return value ? get(value, 'desc', EMPTY_PLACEHOLDER) : EMPTY_PLACEHOLDER
}

/**
 * 格式化类布尔值
 *
 * @param {number} value
 * @param {Array} boolStrs
 *
 * @return {string}
 */
const boolFormatter = (value, boolStrs = ['无', '有']) => {
    return value !== null ? boolStrs[value] : EMPTY_PLACEHOLDER
}

/**
 * 格式化类布尔值
 *
 * @param {number} value
 * @param {Array} boolStrs
 *
 * @return {string}
 */
const validFormatter = (value, boolStrs = ['有效', '无效']) => {
    return boolStrs[value - 1]
}

/**
 * 格式化地址
 */
const addressFormatter = (value) => {
    return value && value.length ? value.join('') : EMPTY_PLACEHOLDER
}

/**
 * 格式化地址
 */
const addressArrayFormatter = (value) => {
    return value && value.length ?
        map(value, 'name').join('') ?
            map(value, 'name').join('') : EMPTY_PLACEHOLDER
        : EMPTY_PLACEHOLDER
}

/**
 * 格式化小数
 */
// const unitFormatter = (value, n = 4) => {
//     return divide(value, Math.pow(10, n))
// }

/**
 * 格式化分钟到小时
 */
// const unitTimeFormatter = (value) => {
//     return parseFloat(divide(value, 60)).toFixed(2)
// }

/**
 * 数组转化成字符串
 */
// const toString = (value, sperator = '/') => {
//     if (value && value.length) {
//         return value.join(sperator)
//     } else {
//         return EMPTY_PLACEHOLDER
//     }
// }

/**
 * 上个月一号时间戳
 */
const previousMonth = () => {
    let y = new Date().getFullYear()
    let m = new Date().getMonth()
    let cur = new Date(String(y + '/' + m + '/' + 1) + ' 00:00:00')
    let month = new Date().getMonth() - 1
    return cur.setMonth(month)
}

/**
 * 本月一号0时0分时间戳
 */
const presentMonth = () => {
    let y = new Date().getFullYear()
    let m = new Date().getMonth()
    let cur = new Date(String(y + '/' + m + '/' + 1) + ' 00:00:00')
    return cur.setMonth(m)
}

/**
 * 数组数值filter
 */
// const arrayFilter = (value, key) => {
//     if (value && value.length) {
//         let res = []
//         value.forEach((val) => {
//             if (val) {
//                 res.push(parseFloat(divide(val, key)).toFixed(2))
//             } else {
//                 res.push(null)
//             }
//         })
//         return res.join('/')
//     }
//     return null

// }

/**
 * 格式化分钟至小时分钟
 * 即 75m  = 1h15m
 */
const prettyTimeFormatter = (value) => {
    let hour = Math.floor(value / 60) ? Math.floor(value / 60) + '小时' : ''
    let min = value % 60 ? value % 60 + '分钟' : ''
    return hour + min
}

// 浮点数相乘
const floatNumberMultiply = (arg1, arg2) => {
    let m = 0
    let s1 = arg1 ? arg1.toString() : '0'
    let s2 = arg2 ? arg2.toString() : '0'
    try {
        m += s1 ? (s1.toString().split('.')[1] ? s1.toString().split('.')[1].length : 0) : 0
    } catch (e) {
        console.error(e)
    }
    try {
        m += s2 ? (s2.toString().split('.')[1] ? s2.toString().split('.')[1].length : 0) : 0
    } catch (e) {
        console.error(e)
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 浮点数除法
function floatNumberDiv(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
        t1 = arg1 ? (arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0) : 0
    }
    catch (e) {
        console.error(e)
    }
    try {
        t2 = arg2 ? (arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0) : 0
    }
    catch (e) {
        console.error(e)
    }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
 * 格式化长数字为可读数字, 即 11090 => ['11', 'K']
 *
 * @param num { Number }
 * @param digits { Number } 指定格式化长度
 *
 */
const humanizeNumber = (num, digits = 2) => {
    const si = [
        { value: 1, symbol: '' },
        { value: 1E4, symbol: '万' },
        { value: 1E6, symbol: '百万' },
        { value: 1E9, symbol: 'G' },
        { value: 1E12, symbol: 'T' },
        { value: 1E15, symbol: 'P' },
        { value: 1E18, symbol: 'E' }
    ]
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let i
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break
        }
    }
    return [
        (num / si[i].value).toFixed(digits).replace(rx, '$1'),
        si[i].symbol
    ]
}

/**
 * 用','格式化数字, 即 1999 => 1,999
 *
 * @param num { Number }
 */
const formatNumber = (num, minimumFractionDigits = 2) => {
    // eslint-disable-next-line no-undefined
    return num.toLocaleString(undefined, { minimumFractionDigits: minimumFractionDigits })
}

/**
 * 保留几位小数
 */
const placeNumber = (decimal, places = 2) => {
    return (Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places)).toFixed(places)
}

export {
    dateFormatter,
    enumFormatter,
    boolFormatter,
    addressFormatter,
    addressArrayFormatter,
    validFormatter,
    // unitFormatter,
    // unitTimeFormatter,
    // toString,
    previousMonth,
    presentMonth,
    // arrayFilter,
    prettyTimeFormatter,
    floatNumberMultiply,
    floatNumberDiv,
    formatNumber,
    humanizeNumber,
    placeNumber
}
