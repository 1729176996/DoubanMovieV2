<template>
  <div id="main">

    <div class="top-nav">
      <div class="left-btn">
        <div @click="back"><i class="fa fa-chevron-left" aria-hidden="true"></i>返回</div>
      </div>
      <div class="title">{{detailObj.title}}</div>
      <div class="right-btn"></div>
    </div>

    <div class="wrapper" ref="wrapper">
    	<div class="content">

        <div class="detail-cover" v-if="detailObj&&detailObj.images&&detailObj.images.large">
        	<img :src="detailObj.images.large" />
        </div>
        <div class="detail-item">
        	<b>{{detailObj.title}} <span class="c-grey"> ({{detailObj.year}})</span></b>
        </div>
        <div class="detail-item" v-if="detailObj.title!=detailObj.original_title">
        	<b>{{detailObj.original_title}}</b>
        </div>
        <div class="detail-item">导演: <span v-for="director,index in detailObj.directors"><a v-if="index!=0"> / </a>{{director.name}}</span></div>
        <div class="detail-item">编剧: <span v-for="writer,index in detailObj.writers"><a v-if="index!=0"> / </a>{{writer.name}}</span></div>
        <div class="detail-item">主演: <span v-for="cast,index in detailObj.casts"><a v-if="index!=0"> / </a>{{cast.name}}</span></div>
        <div class="detail-item">类型: <span v-for="genre,index in detailObj.genres"><a v-if="index!=0"> / </a>{{genre}}</span></div>
        <div class="detail-item">制片国家/地区: <span v-for="country,index in detailObj.countries"><a v-if="index!=0"> / </a>{{country}}</span></div>
        <div class="detail-item">语言: <span v-for="language,index in detailObj.languages"><a v-if="index!=0"> / </a>{{language}}</span></div>
        <div class="detail-item">上映日期: <span v-for="pubdate,index in detailObj.pubdates"><a v-if="index!=0"> / </a>{{pubdate}}</span></div>
        <div class="detail-item">片长: <span v-for="duration,index in detailObj.durations"><a v-if="index!=0"> / </a>{{duration}}</span></div>
        <div class="detail-item">又名: <span v-for="ak,index in detailObj.aka"><a v-if="index!=0"> / </a>{{ak}}</span></div>
        <div class="watch-list" v-if="detailObj.videos&&detailObj.videos.length>0">
        	<div class="list-item" style="color: darkorange;">观看:</div>
        	<div class="list-item" v-for="video in detailObj.videos" @click="view(video.sample_link)">
        		<div style="padding-left: 4em;flex: 1;color:chartreuse;">{{video.source.name}}</div>
        		<div style="padding-right: 1em;">{{video.need_pay?'VIP免费观看':'免费观看'}}</div>
        	</div>
        </div>

    	</div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import BScroll from 'better-scroll'
export default {
  name: 'MovieDetail',
  data:function(){
    return {
      detailObj:{},
      scroll:null
    }
  },
  mounted(){
    var MovieId = localStorage.getItem('MovieId');
    this.init(MovieId);
  },
  methods:{
    init:function(movieid){
    	var _this = this;
    	//豆瓣接口apikey
    	var apikey='0df993c66c0c636e29ecbb5344252a4a';
    	var sendObj = {
    		apikey:apikey
    	};
    	$.ajax({
    		url:'https://api.douban.com/v2/movie/subject/'+movieid,
    		type:'GET',
    		data:sendObj,
    		dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
    		timeout:8000,
    		success:function(data){
    			console.log(data);

    			_this.detailObj = data?data:{};

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
    		error:function(xhr, errorType, error,msg){
    			console.log(msg);
    			_this.$nextTick(() => {
    				if(_this.scroll){
    					_this.scroll.finishPullUp();
    					_this.scroll.refresh();
    				}
    			})
    		}
    	})
    },
    view:function(href){
      window.open(href,"_blank");
    },
    back:function(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>
  .detail-cover{
    width: 100%;
    height: auto;
    text-align: center;
  }
  .detail-cover img{
    width: 80%;
    height: auto;
  }

  .detail-item{
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    text-align: left;
  }

  .watch-list{
    margin-top: 1em;
  }
  .watch-list .list-item{
    width: 100%;
    height: 40px;
    display: flex;
    line-height: 40px;
    border: 1px #e1e1e2 solid;
  }


</style>
