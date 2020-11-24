<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      @change="handleInputChange"
      :value="inputValue"
      class="my_ipt"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            (e) => {
              cbStatusChanged(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="() => removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button @click="() => changeList('all')" :type="viewKey === 'all' ? 'primary' : 'default'"
            >全部</a-button
          >
          <a-button @click="() => changeList('undone')" :type="viewKey === 'undone' ? 'primary' : 'default'"
            >未完成</a-button
          >
          <a-button @click="() => changeList('done')" :type="viewKey === 'done' ? 'primary' : 'default'"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['inputValue','viewKey']),
    ...mapGetters(['unDoneLength','infoList'])
  },
  created() {
    this.$store.dispatch('getListAsync')
  },
  methods: {
    // 监听文本框内容变化
    handleInputChange(e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 像列表新增item 项
    addItemToList() {
      if (this.inputValue.trim().length <= 0)
        return this.$message.warning('文本框内容不能为空！')

      this.$store.commit('addItem')
    },
    // 删除 item 项
    removeItemById(id) {
      this.$store.commit('removeItem', id)
    },
    clean() {
      this.$store.commit('cleanDone')
    },
    cbStatusChanged(e, id) {
      const param = {
        id: id,
        status: e.target.checked,
      }
      this.$store.commit('changeStatus', param)
    },
    changeList(status) {
      console.log(status)
      this.$store.commit('changItemStatus',status)
    }
  },
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
