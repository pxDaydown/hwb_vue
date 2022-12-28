import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import eventlist from '@/components/EventList'
import notice from '@/components/Notice'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: login
		},
		{
			path: '/eventlist',
			name: 'eventlist',
			component: eventlist
		},
		{
			path: '/notice',
			name: 'notice',
			component: notice
		}
	]
})
