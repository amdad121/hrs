import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'

import './assets/all'
import './assets/bootstrap.bundle.min'
// import './assets/scripts'

import './assets/styles.css'
import './style.css'

window.axios = axios

const app_name = 'HRS'
const api_url = 'http://hrs-api.test'

window.app_name = app_name
window.api_url = api_url

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/';
} else {
	axios.defaults.baseURL = api_url + '/api/'
}

axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
