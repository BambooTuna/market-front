<template>
  <div class="edit_product_form">
    <input type="text" v-model="title" placeholder="タイトル"><br>
    <input type="text" v-model="detail" placeholder="商品詳細"><br>
    <input type="number" v-model="price" placeholder="価格"><br>
    <button @click="onClick('open')">出品</button> | <button @click="onClick('draft')">下書き</button><br>
    <button class="delete" v-show="!isNew" @click="onClick('closed')">削除</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { ProductDetailRequest, StateEnum } from '@/lib/RestAPIProtocol'

@Component
export default class EditProductForm extends Vue {
    @Prop()
    private isNew!: boolean

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
  .edit_product_form {
    padding: 0.5em 1em;
    margin: 2em 0;
    font-weight: bold;
    color: #6091d3;/*文字色*/
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/
  }
  .delete {
    color: #ff3504;/*文字色*/
  }
</style>
