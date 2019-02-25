<template>
  <div class="collection-main">
    <itemOption></itemOption>
  </div>
</template>

<script>
  import itemOption from './itemOption.vue'
  export default {
    components: {
      itemOption
    },
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
    },
    computed: {
    },
    activated () {
      //获取案件id
      if(!localStorage.getItem('currentCollectionCase')) {
        this.$router.push('/collection');
      }
    }
  }
</script>

<style lang="scss">
  .collection-main {

  }
</style>
