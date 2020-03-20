<template>
  <div class="edit_product_form">
    <input type="text" v-model="title" placeholder="タイトル">
    <input type="text" v-model="detail" placeholder="商品詳細">
    <input type="number" v-model="price" placeholder="価格">
    <button @click="clickEvent('open')">出品</button> | <button @click="clickEvent('draft')">下書き</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import API, { StateEnum } from '../lib/restAPI'

@Component
export default class EditProductForm extends Vue {
    private api = new API()

    @Prop()
    private id?: string

    @Prop()
    private title?: string = ''

    @Prop()
    private detail?: string = ''

    @Prop()
    private price?: number = 0

    @Prop()
    private state: StateEnum = 'open'

    clickEvent (state: StateEnum) {
      this.api.postProduct({
        title: this.title!,
        detail: this.detail!,
        price: this.price!,
        state: this.state
      }).then(() => alert('完了'))
    }
}
</script>

<style scoped>

</style>
