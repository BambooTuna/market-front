<template>
  <div class="exhibition">
    <EditProductForm></EditProductForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditProductForm from '@/components/EditProductForm.vue'

@Component({
  components: {
    EditProductForm
  }
})
export default class Exhibition extends Vue {
}
</script>

<style scoped>

</style>
