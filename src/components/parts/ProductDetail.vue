<template>
  <div class="product-detail">
    <table>
      <thead>
      <tr>
        <th>タイトル</th>
        <th>価格</th>
        <th>詳細</th>
      </tr>
      </thead>
      <WaitLoading :loading_flag="loadingFlag">
        <tbody>
        <tr>
          <td>{{item.productTitle}}</td>
          <td>{{item.requestPrice}}</td>
          <td>{{item.productDetail}}</td>
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
export default class ProductDetail extends Vue {
    @Prop()
    private item!: ProductDetailResponse;

    @Prop()
    private loadingFlag!: boolean
}
</script>

<style scoped>

</style>
