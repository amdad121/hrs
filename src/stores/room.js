import axios from 'axios'
import { defineStore } from 'pinia'
import router from '@/router'
import { useAlertStore } from '@/stores/alert';

export const useRoomStore = defineStore({
	id: 'room',
	state: () => ({
		rooms: {},
		room: {
			name: '',
			description: '',
			size: '',
			maximum_occupancy: '',
			price: '',
			photo: '',
		},
		loading: false,
    	success: '',
    	errors: {}
	}),
	getters: {},
	actions: {
		async getRooms() {
			this.loading = true
			try {
				var reaponse = await axios.get('rooms')
				this.rooms = reaponse.data
			} catch (errors) {
				this.errors = errors.response ? errors.response.data.errors : ''
			} finally {
				this.loading = false
			}
		},
		async storeRoom(params) {
			this.loading = true
			try {
				var reaponse = await axios.post('rooms', params, {
					headers: { "Content-Type": "multipart/form-data"}
				})
				this.room = reaponse.data
				this.errors = ''
				router.push({ name: 'rooms', params: { success: 'Room successfully added.' } })
			} catch (errors) {
				this.errors = errors.response ? errors.response.data.errors : ''
			} finally {
				this.loading = false
			}
		},
		async getRoom(id) {
			this.loading = true
			try {
				var reaponse = await axios.get('rooms/' + id)
				this.room = reaponse.data
				// console.log(room);
				this.errors = ''
				// router.push({ name: 'rooms', params: { success: 'Room successfully added.' } })
			} catch (errors) {
				this.errors = errors.response ? errors.response.data.errors : ''
			} finally {
				this.loading = false
			}
		},
		async updateRoom(id, params) {
			this.loading = true
			try {
				var response = await axios.post('rooms/' + id, params, {
					headers: { "Content-Type": "multipart/form-data" }
				})
				this.room = response.data
				this.errors = ''
				router.push({ name: 'rooms', params: { success: 'Room successfully updated.' } })
			} catch (errors) {
				this.errors = errors.response ? errors.response.data.errors : ''
				// console.log(errors.response.data);
				// const alertStore = useAlertStore();
                // alertStore.error(errors)
			} finally {
				this.loading = false
			}
		},
		async deleteRoom(id) {
			this.loading = true
			try {
				var reaponse = await axios.delete('rooms/' + id)
				if (reaponse) {
					alert('Room Successfully Deleted.')
					this.getRooms()
				}
			} catch (errors) {
				this.errors = errors.response ? errors.response.data.errors : ''
			} finally {
				this.loading = false
			}
		},
	}
})
