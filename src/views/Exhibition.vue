<template>
  <div class="exhibition">
    <EditProductForm title="" detail="" price=0 @clickEvent="clickEvent"></EditProductForm>
    <h2>自分の出品一覧</h2>
    <ProductsTable :items="productList"></ProductsTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditProductForm from '@/components/EditProductForm.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import API, { StateEnum } from '../lib/restAPI'

@Component({
  components: {
    EditProductForm, ProductsTable
  }
})
export default class Exhibition extends Vue {
  private api: API = new API()
  public productList: Array<{
      id: string;
      productTitle: string;
      productDetail: string;
      requestPrice: number;
      presenterId: string;
      state: StateEnum;
  }> = []

  created (): void {
    this.api
      .getMyProducts(this.$route.query)
      .then(r => {
        this.productList = r
      })
  }

  clickEvent (title: string, detail: string, price: number, state: StateEnum) {
    this.api.postProduct({
      title: title,
      detail: detail,
      price: price,
      state: state
    })
      .then(() => alert('出品完了'))
      .catch((e: Error) => alert(e.message))
  }
}
</script>

<style scoped>

</style>
