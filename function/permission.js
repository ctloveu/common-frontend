/**
 * @fileOverview 权限 根据1 && 2 && 4判断是否存在权限
 * @author chentao
 */

export default {

    install(Vue, auths) {
        /**
         * 判读模块是否有某个功能权限
         *
         * @param {string} moduleName 模块名
         * @param {string|Array} funName 功能名称 list/add/edit/remove
         *
         * @return {Boolean} 是否具有该权限
         */
        Vue.prototype.hasAuth = function(moduleName, funName) {
            // return true
            if (this.$store.state.userInfo.id === 0) {
                return true
            }
            if (Object.prototype.toString.call(funName) === '[object Array]') {
                const multiPermission = funName.every((item) => {
                    return this.hasAuth(moduleName, item)
                })
                return multiPermission
            }
            const permissions = this.$store.state.userInfo.permissions
            if (!(permissions && Object.keys(permissions).length)) {
                return false
            }
            // 如果存在子菜单没有配置auth的情况, 此时auth会被判断为undfined, 这样所有角色都有此菜单的权限, 因此父菜单需要显示
            if (typeof moduleName === 'undefined') {
                return true
            }
            // 模块名不存在,或者没有配置，视为没有权限
            if (!moduleName || !auths[moduleName]) {
                return 0
            }
            return (permissions[(auths[moduleName]['moduleNumber'])] & auths[moduleName][funName]) > 0
        }

        /**
         * 判读是否拥有参数列表中的权限
         *
         * @param {Array<Object>} authList
         *
         * 例如：
         *
         *   [
         *      {
         *            name: 'user',
         *            auth: 'mod'
         *        },
         *        {
         *            name: 'user',
         *            auth: 'del'
         *        }
         *   ]
         *
         *
         * @return {Boolean} 是否具有该权限
         */
        Vue.prototype.ownAuth = function(authList) {
            // 没有权限列表，返回true
            if (!authList.length) {
                return true
            }
            if (this.$store.state.userInfo.userId === 0) {
                return true
            }
            return authList.some((item) => {
                return this.hasAuth(item.name, item.auth)
            })
        }
    }
}
