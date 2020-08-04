/**
 * @file 公共库全局组件出口文件
 * @author 陈涛
 */

/*
    require.context(arg1, arg2, arg3)
        arg1 - 读取文件的路径
        arg2 - 是否遍历文件的子目录
        arg3 - 匹配文件的正则
 */

const requireComponent = require.context('./', true, /\.(vue)$/)

export default requireComponent;