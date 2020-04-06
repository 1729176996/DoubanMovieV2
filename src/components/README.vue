<template>
  <div id="main">

    <div class="top-nav">
      <div class="left-btn">
        <div @click="back"><i class="fa fa-chevron-left" aria-hidden="true"></i>返回</div>
      </div>
      <div class="title">说明</div>
      <div class="right-btn"></div>
    </div>

    <div class="wrapper" ref="wrapper">
    	<div class="content">

        <p>本项目由罗云棋完成</p>
        <p>使用Vue制作</p>
        <p>使用了豆瓣的接口</p>
        <p>完成后上传到Github，可以在Github Page查看</p>

    	</div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import BScroll from 'better-scroll'
export default {
  name: 'README',
  data:function(){
    return {
      scroll:null
    }
  },
  mounted(){
    var _this = this;
    _this.$nextTick(() => {
    	if(_this.scroll){
    		_this.scroll.destroy();
    	}
    	_this.scroll = new BScroll(_this.$refs.wrapper, {
    		//开启点击事件 默认为false
    		click:true
    	})
    })
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>

</style>
