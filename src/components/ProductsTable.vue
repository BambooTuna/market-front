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

      <tbody>
      <tr v-for="row in items" :key="row.id">
        <td>{{row.id}}</td>
        <td>{{row.productTitle}}</td>
        <td>{{row.requestPrice}}</td>
        <td>{{row.state}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProductsTable extends Vue {
    @Prop()
    private items!: Array<{
        id: string;
        productTitle: string;
        productDetail: string;
        requestPrice: string;
        presenterId: string;
        state: string;
    }>;
}
</script>

<style scoped>

</style>
