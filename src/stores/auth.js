import axios from 'axios'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		token: localStorage.getItem('token'),
		error: '',
		loading: false
	}),
	getters: {},
	actions: {
		async loginUser(email, password) {
			try {
				await axios.get(api_url + '/sanctum/csrf-cookie')

				this.loginSubmit(email, password)

			} catch (error) {
				if (error.response) {
					this.error = error.response.data.errors
				}
				return error
			}
		},
		async loginSubmit(email, password) {
			try {
				var response = await axios.post('login', { email, password })

				this.token = response.data.split("|")[1]

				localStorage.setItem('token', this.token)

				axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token

				router.push({ name: 'admin' })
			} catch (error) {
				if (error.response) {
					this.error = error.response.data.errors
				}
				return error
			}
		},
		async logout() {
			try {
				var response = await axios.post('logout')

				if (response) {
					localStorage.removeItem('token')
					
					router.push({ name: 'home', params: { success: response.data.message } })
				}

			} catch (error) {
				if (localStorage.getItem('token')) {
					localStorage.removeItem('token')
					router.push({ name: 'login' })
				}
				if (error.response) {
					this.error = error.response.data
				}
				return error
			}
		},
	}
})
