<template>
  <div class="products_table">
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>タイトル</th>
        <th>価格</th>
        <th>状態</th>
      </tr>
      </thead>
      <WaitLoading :loading_flag="loadingFlag">
        <tbody>
        <tr v-for="row in items" :key="row.id">
          <td>{{row.id}}</td>
          <td>{{row.productTitle}}</td>
          <td>{{row.requestPrice}}</td>
          <td>{{row.state}}</td>
        </tr>
        </tbody>
      </WaitLoading>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProductDetailResponse } from '@/lib/RestAPIProtocol'
import WaitLoading from '@/components/parts/WaitLoading.vue'

@Component({
  components: {
    WaitLoading
  }
})
export default class ProductsTable extends Vue {
    @Prop()
    private items!: Array<ProductDetailResponse>;

    @Prop()
    private loadingFlag?: boolean = true
}
</script>

<style scoped>

</style>
