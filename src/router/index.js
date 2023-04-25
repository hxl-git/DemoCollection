import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path: '/jwt',
          name: 'jwt',
          title:'jtw-token-解析',
          component: (resolve) => require(['@/views/jwt/index.vue'], resolve),
        },
        {
          path: '/form',
          name: 'form',
          title:'form-表单',
          component: (resolve) => require(['@/views/form/index.vue'], resolve),
        }
      ]
    }
  ]
})
