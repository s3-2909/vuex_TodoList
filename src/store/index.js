import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [], // 所有任务列表
        inputValue: '', // 文本框内容
        viewKey: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        setInputValue(state, value) {
            state.inputValue = value
        },
        // 添加列表项
        addItem(state) {
            const obj = {
                id: state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 0,
                info: state.inputValue.trim(),
                done: false
            }
            state.list.push(obj)
            state.inputValue = ''
        },
        // 删除列表项
        removeItem(state, id) {
            const i = state.list.findIndex(x => x.id === id)
            if (i !== -1) state.list.splice(i, 1)
        },
        // 修改列表项的选中状态
        changeStatus(state, param) {
            const i = state.list.findIndex(x => x.id == param.id)
            if (i !== -1) state.list[i].done = param.status
        },
        // 清楚已完成的任务
        cleanDone(state) {
            state.list = state.list.filter(x => x.done === false)
        },
        // 状态切换
        changItemStatus(state, status) {
            console.log(state, status)
            state.viewKey = status
        }
    },
    actions: {
        getListAsync({
            commit
        }) {
            axios.get('/apis/list.json').then(({
                data
            }) => {
                commit('initList', data)
            })
        }
    },
    getters: {
        // 统计未完成的任务的条数
        unDoneLength(state) {
            return state.list.filter(x => x.done === false).length
        },
        infoList(state) {
            switch (state.viewKey) {
                case 'all':
                    return state.list
                    break;
                case 'undone':
                    return state.list.filter(x => x.done === false)
                    break;
                case 'done':
                    return state.list.filter(x => x.done === true)
                    break;
                default:
                    break;
            }
        }
    }
})