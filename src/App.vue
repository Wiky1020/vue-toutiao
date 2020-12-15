<template>
  <div id="app">
<!-- 路由出口 -->
    <router-view/>
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-lishi"></i>
      <van-button type="primary">主要按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="less">
</style>
