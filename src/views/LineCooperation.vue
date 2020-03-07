<template>
  <div class="linecooperation">
    リダイレクトされました
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LineCooperation extends Vue {
  created (): void {
    this.$store.dispatch('lineCooperationSignin', this.$route.query)
      .then(res => alert('Lineでログインしました'))
      .catch(e => alert(e.toString()))
  }
}
</script>
