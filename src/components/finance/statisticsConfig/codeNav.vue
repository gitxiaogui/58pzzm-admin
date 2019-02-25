<template>
  <el-row class="code-nav">
    <a @click="navClick(item)" v-for="(item, index) in navArray" :key="index" href="javascript:;">{{ item.data.name }}</a>
  </el-row>
</template>

<script>
  import Bus from '@/eventBus'
  export default {
    props: ['dataToChild'],
    data() {
      return {
        navArray: [
          {
            level: 0,
            data: {
              name: '统计'
            }
          }
        ]
      }
    },
    methods: {
      navClick(item) {
        this.navArray = this.navArray.slice(0, item.level + 1)
        Bus.$emit('codeNav-codeMain', item);
      }
    },
    activated() {
      this.navArray = [
        {
          level: 0,
          data: {
            name: '统计'
          }
        }
      ]
    },
    watch: {
      'dataToChild' : function () {
        if(!!this.dataToChild.length) {
          this.navArray.push(this.dataToChild[0])
        }
      }
    },
    mounted() {
      console.log(this.dataToChild)
    }
  }
</script>

<style lang="scss" scoped>
  .code-nav {
    a {
      color: #314257;
      text-decoration: none;
      &::after {
        content: ' / ';
      }
      &:last-child {
        cursor: default;
        color: #999;
        &::after {
          content: '';
        }
      }
    }
  }
</style>
