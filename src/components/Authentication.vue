<template>
  <div class="authentication">
    <WaitLoading :loading_flag="loadingFlag">
      <section class="signup" v-if="!isLogin">
        <h5>新規登録</h5>
        <p><input type="email" v-model="mail" placeholder="メールアドレス"></p>
        <p><input type="password" v-model="pass" placeholder="パスワード"></p>
        <div class="links">
          <button @click="signupEvent()" class="button--signup">新規登録</button>
        </div>
      </section>
      <section class="signin" v-if="!isLogin">
        <h5>ログイン</h5>
        <p><input type="email" v-model="mail" placeholder="メールアドレス"></p>
        <p><input type="password" v-model="pass" placeholder="パスワード"></p>
        <div class="links">
          <button @click="signinEvent()" class="button--signin">ログイン</button>
        </div>
      </section>
      <section class="cooperation" v-if="!isLogin">
        <h5>SNS連携</h5>
        <div class="links">
          <button @click="lineCooperationEvent()" class="button--cooperation">Line</button>
        </div>
      </section>
      <section class="logout" v-if="isLogin">
        <h5>ログイン中です</h5>
        <div class="links">
          <button @click="logoutEvent()" class="button--logout">ログアウト</button>
        </div>
      </section>
    </WaitLoading>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WaitLoading from '@/components/parts/WaitLoading.vue'
import API from '@/lib/RestAPI'

@Component({
  components: {
    WaitLoading
  }
})
export default class Authentication extends Vue {
    private api: API = new API()

    private mail?: string
    private pass?: string

    private isLogin?: boolean = false
    private loadingFlag?: boolean = true

    async created () {
      await this.api
        .health()
        .then(() => {
          this.isLogin = true
        })
        .catch(() => {
          this.isLogin = false
        }).finally(() => {
          this.loadingFlag = false
        })
      this.init()
    }

    init () {
      this.mail = ''
      this.pass = ''
    }

    async signupEvent () {
      await this.api
        .signup({ mail: this.mail || '', pass: this.pass || '' })
        .then(() => {
          this.isLogin = true
        })
        .catch((e: Error) => alert(e.message))
      this.init()
    }

    async signinEvent () {
      await this.api
        .signin({ mail: this.mail || '', pass: this.pass || '' })
        .then(() => {
          this.isLogin = true
        })
        .catch((e: Error) => alert(e.message))
      this.init()
    }

    async logoutEvent () {
      await this.api
        .logout()
        .then(() => {
          this.isLogin = false
        })
        .catch((e: Error) => alert(e.message))
      this.init()
    }

    async lineCooperationEvent () {
      await this.api.generateLineCooperationUrl()
        .then((redirectUri: string) => {
          window.location.replace(redirectUri)
        })
        .catch((e: Error) => alert(e.message))
    }
}
</script>

<style scoped>

</style>
