<template>
  <div class="authentication">
    <section class="signup" v-if="!isLogin()">
      <h5>新規登録</h5>
      <p><input type="email" v-model="mail" placeholder="メールアドレス"></p>
      <p><input type="password" v-model="pass" placeholder="パスワード"></p>
      <div class="links">
        <a @click="signupEvent()" class="button--signup">新規登録</a>
      </div>
    </section>
    <section class="signin" v-if="!isLogin()">
      <h5>ログイン</h5>
      <p><input type="email" v-model="mail" placeholder="メールアドレス"></p>
      <p><input type="password" v-model="pass" placeholder="パスワード"></p>
      <div class="links">
        <a @click="signinEvent()" class="button--signin">ログイン</a>
      </div>
    </section>
    <section class="cooperation" v-if="!isLogin()">
      <h5>SNS連携</h5>
      <div class="links">
        <a @click="lineCooperationEvent()" class="button--cooperation">Line</a>
      </div>
    </section>
    <section class="logout" v-if="isLogin()">
      <h5>ログイン中です</h5>
      <div class="links">
        <a @click="logoutEvent()" class="button--logout">ログアウト</a>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Authentication extends Vue {
    private mail?: string;
    private pass?: string;

    created () {
      this.$store.dispatch('load')
      this.init()
    }

    isLogin (): boolean {
      return this.$store.state.isLogin
    }

    init () {
      this.mail = ''
      this.pass = ''
    }

    signupEvent () {
      this.$store.dispatch('signup', { mail: this.mail || '', pass: this.pass || '' })
      this.init()
    }

    signinEvent () {
      this.$store.dispatch('signin', { mail: this.mail || '', pass: this.pass || '' })
      this.init()
    }

    logoutEvent () {
      this.$store.dispatch('logout')
    }

    lineCooperationEvent () {
      this.$store.dispatch('fetchLineCooperationUrl').then((redirectUri: string) => {
        window.location.replace(redirectUri)
      })
    }
}
</script>

<style scoped>

</style>
