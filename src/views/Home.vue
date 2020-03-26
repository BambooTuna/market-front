<template>
  <div class="home">
    <Authentication></Authentication>
    <PublicProductsTable :params="this.$route.query"></PublicProductsTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Authentication from '@/components/Authentication.vue'
import PublicProductsTable from '@/components/PublicProductsTable.vue'
@Component({
  components: {
    Authentication, PublicProductsTable
  }
})

export default class Home extends Vue {
}
</script>
