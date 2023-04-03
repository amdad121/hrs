import axios from 'axios'
import { defineStore } from 'pinia'
import router from '@/router'

export const useDashboardStore = defineStore({
	id: 'dashboard',
	state: () => ({
		user: {},
		loading: false,
    	error: ''
	}),
	getters: {},
	actions: {
		async getUser() {
			this.loading = true
			try {
				var user = await axios.get('user')
				this.user = user.data
			} catch (error) {
				if (error.response.data.message == 'Unauthenticated.') {
					localStorage.removeItem('token')
					router.push({ name: 'login' })
				}
				this.error = error
			} finally {
				this.loading = false
			}
		},
	}
})
