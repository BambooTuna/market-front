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
import API, { StateEnum } from '../lib/restAPI'

@Component
export default class EditProductForm extends Vue {
    private api = new API()

    @Prop()
    private id?: string

    @Prop()
    private title!: string

    @Prop()
    private detail!: string

    @Prop()
    private price!: number

    @Emit()
    public clickEvent (title: string, detail: string, price: number, state: StateEnum): void {
    }

    onClick (state: StateEnum) {
        this.clickEvent(this.title, this.detail, this.price, state)
    }
}
</script>

<style scoped>

</style>
