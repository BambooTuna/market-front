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
import API, { StateEnum } from '../lib/restAPI'

@Component({
  components: {
    Authentication, ProductsTable
  }
})

export default class Home extends Vue {
  public productList: Array<{
      id: string;
      productTitle: string;
      productDetail: string;
      requestPrice: number;
      presenterId: string;
      state: StateEnum;
  }> = []

  created (): void {
    new API()
      .getProducts(this.$route.query)
      .then(r => {
        this.productList = r
      })
  }
}
</script>
