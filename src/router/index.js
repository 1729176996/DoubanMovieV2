import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MovieList from '@/components/MovieList.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import README from '@/components/README.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MovieList',
      component: MovieList,
      meta: {
        keepAlive: true, //此组件需要被缓存
      }
    },
    {
      path: '/detail',
      name: 'MovieDetail',
      component: MovieDetail,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      }
    },
    {
      path: '/readme',
      name: 'README',
      component: README,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      }
    }
  ]
})
