<template>
  <div>
    <!--  -->
    <h1>{{ $store.getters.showNum }}</h1>
    <Addition></Addition>

    <p>------------------------------------------</p>

    <Subtraction></Subtraction>
  </div>
</template>

<script>
import Addition from './components/Addition'
import Subtraction from './components/Subtraction'
export default {
  data() {
    return {}
  },
  components: {
    Addition,
    Subtraction,
  },
}
</script>