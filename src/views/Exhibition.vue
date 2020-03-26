<template>
  <div class="exhibition">
    <Authentication>
      <EditProductForm title="" detail="" price=0 @click-event="clickEvent" :isNew="true"></EditProductForm>
      <h2>自分の出品一覧</h2>
      <PrivateProductsTable :params="this.$route.query"></PrivateProductsTable>
    </Authentication>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Authentication from '@/components/Authentication.vue'
import EditProductForm from '@/components/parts/EditProductForm.vue'
import PrivateProductsTable from '@/components/PrivateProductsTable.vue'
import API from '@/lib/RestAPI'
import { ProductDetailRequest } from '@/lib/RestAPIProtocol'

@Component({
  components: {
    Authentication, EditProductForm, PrivateProductsTable
  }
})
export default class Exhibition extends Vue {
  private api: API = new API()

  clickEvent (data: ProductDetailRequest) {
    this.api.postProduct(data)
      .then(() => {
        alert('出品完了')
      })
      .catch((e: Error) => alert(e.message))
  }
}
</script>

<style scoped>

</style>
