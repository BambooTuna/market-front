<template>
  <div class="about">
    <Authentication msg="Welcome to Your Vue.js App" isLogin="false"/>
  </div>
</template>

<script lang="ts">
import Authentication from '@/components/Authentication.vue'

export default {
  name: 'About',
  components: {
    Authentication
  }
}
</script>
