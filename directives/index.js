/**
 * @file 公共库directives出口文件
 * @author 陈涛
 */

const requireComponent = require.context('./', true, /\.(js)$/)

export default requireComponent;