<template>
  <div id="main">

    <div class="top-nav">
      <div class="left-btn"></div>
      <div class="title">{{nav_now.name}}</div>
      <div class="right-btn" @click="readme">说明</div>
    </div>

    <div class="wrapper" ref="wrapper">
    	<div class="content">

    		<ul>
    			<li v-for="item in list" :id="item.id">
    				<div class="list-item" v-if="item.subject" @click="showDetail(item.subject)">
    					<div class="cover" v-if="item&&item.subject&&item.subject.images&&item.subject.images.small"><img :src="item.subject.images.small" /></div>
    					<div class="flex">
    						<a>{{item.subject.title}}<span v-if="item.subject.title!=item.subject.original_title"> / {{item.subject.original_title}}</span></a>
    						<div>导演:<span v-for="director in item.subject.directors"> {{director.name}}</span></div>
    						<div>主演:<span v-for="cast in item.subject.casts"> {{cast.name}}</span></div>
    						<div>{{item.year}}<span v-for="genre in item.subject.genres"> {{genre}}</span></div>
    					</div>
    				</div>
    				<div class="list-item" v-if="!item.subject" @click="showDetail(item)">
    					<div class="cover" v-if="item&&item.images&&item.images.small"><img :src="item.images.small" /></div>
    					<div class="flex">
    						<a>{{item.title}}<span v-if="item.title!=item.original_title"> / {{item.original_title}}</span></a>
    						<div>导演:<span v-for="director in item.directors"> {{director.name}}</span></div>
    						<div>主演:<span v-for="cast in item.casts"> {{cast.name}}</span></div>
    						<div>{{item.year}}<span v-for="genre in item.genres"> {{genre}}</span></div>
    					</div>
    				</div>
    			</li>
    		</ul>

    	</div>
    </div>

    <div class="navbar">
    	<div class="nav" v-for="nav in navList" :class="{'active':nav.code==nav_now.code}" @click="clickNav(nav)">{{nav.name}}</div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import BScroll from 'better-scroll'
export default {
  name: 'MovieList',
  data:function(){
    return {
      navList:[
        {name:'正在热映',code:'in_theaters'},
        {name:'即将上映',code:'coming_soon'},
        {name:'top250',code:'top250'},
        {name:'口碑榜',code:'weekly'},
        {name:'北美票房榜',code:'us_box'},
        {name:'新片榜',code:'new_movies'}
      ],
      nav_now:{},
      list:[],
      start:0,//查询开始位置
      count:10,//每次查询个数
      scroll:null
    }
  },
  mounted(){
    this.clickNav(this.navList[0]);
  },
  methods:{
    clickNav:function(nav){
      this.nav_now = nav;
      this.getList(true);
    },
    getList:function(initFlag){
    	var _this = this;
      if(initFlag){
      	_this.start = 0;
      	_this.list = [];
      }else{
      	if(_this.nav_now.code=='weekly'||_this.nav_now.code=='us_box'||_this.nav_now.code=='new_movies'){
      		_this.scroll.finishPullUp();
      		_this.scroll.refresh();
      		return;
      	}
      }
    	var start = _this.start;

    	//豆瓣接口apikey
    	var apikey='0df993c66c0c636e29ecbb5344252a4a';
    	var sendObj = {
    		start:start,
    		count:_this.count,
    		apikey:apikey
    	};
    	$.ajax({
    		url:'https://api.douban.com/v2/movie/'+_this.nav_now.code,
    		type:'GET',
    		data:sendObj,
    		dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
    		timeout:8000,
    		success:function(data){
    			console.log(data);

    			if(data&&data.subjects&&data.subjects.length>0){
    				_this.list = _this.list.concat(data.subjects);
    				_this.start= start + _this.count;
    			}
    			_this.$nextTick(() => {
    				if(initFlag){
    					if(_this.scroll){
    						_this.scroll.destroy();
    					}
    					_this.scroll = new BScroll(_this.$refs.wrapper, {
    						//开启点击事件 默认为false
    						click:true,
    						pullUpLoad: {
    							threshold: 50 // 当上拉距离超过50px时触发 pullingUp 事件
    						}
    					})
    					// 触发上拉加载的事件， 调用getList 请求数据
    					_this.scroll.on('pullingUp', () => {
    						console.log('上拉加载')
    						_this.getList(false);
    					})
    				}else{
    					_this.scroll.finishPullUp();
    					_this.scroll.refresh();
    				}
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
    showDetail:function(item){
      localStorage.setItem('MovieId', item.id);
      this.$router.push('/detail');
    },
    readme:function(){
      this.$router.push('/readme');
    }
  }
}
</script>

<style>
  .list-item{
  	width: 100%;
  	height: auto;
  	display: flex;
  }
  .list-item .cover,.list-item .cover img{
  	width: 100px;
  	height: auto;
  }

  /**
   * 底部导航栏
   */
  .navbar{
  	display: flex;
  	background-color: #FFFFFF;
  }
  .nav{
  	flex: 1;
  	text-align: center;
  	padding-top: 1em;
  	padding-bottom: 1em;
  	border: 1px #DDDDDD solid;
  }
  .navbar .active{
  	background-color: #dde7e8 !important;
  }
</style>
