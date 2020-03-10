<template>
  <div class="linecooperation">
    リダイレクトされました
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LineCooperation extends Vue {
  created (): void {
    this.$store.dispatch('lineCooperationSignin', this.$route.query)
      .then(() => {
        window.location.href = '/'
        alert('Lineでログインしました')
      })
      .catch(e => {
        window.location.href = '/'
        alert(e.toString())
      })
  }
}
</script>
