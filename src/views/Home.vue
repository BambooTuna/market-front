<template>
  <div class="home">
    <Authentication isLogin="false"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Authentication from '@/components/Authentication.vue'

export default {
  name: 'Home',
  components: {
    Authentication
  }
}
</script>
