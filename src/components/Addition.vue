<template>
  <div>
    当前最新的count值为: {{ $store.state.count }}
    <br />
    <button @click="btnhandler1">+</button>
    <button @click="btnhandle2">+N</button>
    <button @click="btnhandleAsync">异步+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    btnhandler1() {
      this.$store.commit('add')
    },
    btnhandle2() {
      this.$store.commit('addN', 2)
    },
    btnhandleAsync() {
      this.$store.dispatch('addAsync')
    },
    
  },
}
</script>