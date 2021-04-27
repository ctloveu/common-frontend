
/**
 *暴露全局功能函数
 @author 陈涛
 */
const requireFun = require.context('./global', false, /\.(js)$/);

var objFun = {}
var isRequired = {} // 用于判断是否注册过相同的组件名

requireFun.keys().forEach(__dirname => {
    // 获取组件的配置
    let _config = requireFun(__dirname)
    _config = _config.default || _config

    Object.keys(_config).forEach(_apiName => {
        if (!isRequired[_apiName]) {
            objFun[_apiName] = _config[_apiName]
            isRequired[_apiName] = {
                isRequired: true,
                __dirname: __dirname
            }
        } else {
            // 给与命名冲突提示
            console.error(`${_config[_apiName]}\n函数命名冲突!\nold_function文件：${isRequired[_apiName].__dirname}\nnew_function：${__dirname}`)
        }
    })
})

isRequired = null // 手动清空变量

module.exports = objFun
