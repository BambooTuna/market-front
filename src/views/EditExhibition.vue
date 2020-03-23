<template>
  <div class="edit_exhibition">
    <EditProductForm :title="title" :detail="detail" :price="price" @clickEvent="clickEvent"></EditProductForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditProductForm from '@/components/EditProductForm.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import API, { ProductDetailResponse, StateEnum } from '../lib/restAPI'

@Component({
  components: {
    EditProductForm, ProductsTable
  }
})
export default class EditExhibition extends Vue {
  private title = ''
  private detail = ''
  private price = 0

  private api: API = new API()

  created (): void {
    this.api
      .getProductDetail(this.$route.params.id)
      .then((res: ProductDetailResponse) => {
        this.title = res.productTitle
        this.detail = res.productDetail
        this.price = res.requestPrice
      })
      .catch((e: Error) => alert(e.message))
  }

  clickEvent (title: string, detail: string, price: number, state: StateEnum) {
    this.api.editProduct(this.$route.params.id, {
      title: title,
      detail: detail,
      price: price,
      state: state
    })
      .then(() => alert('編集完了'))
      .catch((e: Error) => alert(e.message))
  }
}
</script>

<style scoped>

</style>
