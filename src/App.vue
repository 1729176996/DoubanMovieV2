<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
        </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
	margin: 0;
	padding: 0;
}
/**
 * 去掉列表的默认样式
 */
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
}


#main {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 0;
}

/**
 * 顶部的导航栏
 */
.top-nav{
  background-color: #FFFFFF;
  border: 1px #DDDDDD solid;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  width: 100%;
  display: flex;
}
.top-nav .left-btn{
  margin-left: 0.5em;
  width: 5em;
}
.top-nav .title{
  flex: 1;
  text-align: center;
}
.top-nav .right-btn{
  margin-right: 0.5em;
  width: 5em;
}

/**
 * 滚动列表
 */
.wrapper{
  flex:1;
  position: relative;
  overflow: hidden;
}
</style>
