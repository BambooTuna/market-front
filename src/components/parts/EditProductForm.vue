<template>
  <div class="edit_product_form">
    <input type="text" v-model="title" placeholder="タイトル">
    <input type="text" v-model="detail" placeholder="商品詳細">
    <input type="number" v-model="price" placeholder="価格">
    <button @click="onClick('open')">出品</button> | <button @click="onClick('draft')">下書き</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { ProductDetailRequest, StateEnum } from '@/lib/RestAPIProtocol'

@Component
export default class EditProductForm extends Vue {
    @Prop()
    private title!: string

    @Prop()
    private detail!: string

    @Prop()
    private price!: number

    @Emit()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public clickEvent (data: ProductDetailRequest): void {
      // do nothing.
    }

    onClick (state: StateEnum) {
      this.clickEvent({
        title: this.title,
        detail: this.detail,
        price: this.price,
        state: state
      })
    }
}
</script>

<style scoped>

</style>
