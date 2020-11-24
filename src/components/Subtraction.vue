<template>
  <div>
    当前最新的count值为:{{ count }}
    <br />
    <button @click="jian1">-</button>
    <button @click="jianN">-N</button>
    <button @click="jianAsync">异步-</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['count']),
  },
  methods: {
    ...mapMutations(['subtrac', 'subtracN']),
    ...mapActions(['subAsync']),
    jian1() {
      this.subtrac()
    },
    jianN() {
      this.subtracN(3)
    },
    jianAsync() {
      this.subAsync(3)
    },
  },
}
</script>