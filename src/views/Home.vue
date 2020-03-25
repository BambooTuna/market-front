<template>
  <div class="home">
    <Authentication></Authentication>
    <ProductsTable :items="productList"></ProductsTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Authentication from '@/components/Authentication.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import API from '@/lib/RestAPI'
import { ProductDetailResponse } from '@/lib/RestAPIProtocol'

@Component({
  components: {
    Authentication, ProductsTable
  }
})

export default class Home extends Vue {
    private api: API = new API()
    public productList: Array<ProductDetailResponse> = []

    created (): void {
      this.api
        .getProducts(this.$route.query)
        .then(r => {
          this.productList = r
        })
    }
}
</script>
