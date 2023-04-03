<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRoomStore } from '@/stores/room';
import { computed } from '@vue/reactivity';

const { room, loading, success, errors } = storeToRefs(useRoomStore())

const roomStore = useRoomStore()

const route = useRoute()
const id = route.params.id

if (id) {
	roomStore.getRoom(id)
}

const photoFile = ref('')
const photoURL = ref('')

const selectPhoto = (event) => {
	if (event.target.files.length === 0) {

		photoFile.value = photoURL.value = ''
		
		return;
	}

	photoFile.value = event.target.files[0]
}

watch(photoFile, (photoFile) => {
	if (!(photoFile instanceof File)) {
		return;
	}

	let fileReader = new FileReader()

	fileReader.readAsDataURL(photoFile)

	fileReader.addEventListener('load', () => {
		photoURL.value = fileReader.result
	})
})

const photo = computed(()=> {
	return photoURL.value = photoURL.value ? photoURL.value : room.value.photo
})

const updateRoom = () => {
	const data = {...room.value}

	data.photo = photoFile.value

	data._method = 'patch'

	roomStore.updateRoom(id, data)
}
</script>

<template>
	<div class="p-4">
		<div class="container-fluid mx-auto">
			<div class="mb-4 flex justify-between items-center">
				<h1 class="text-2xl">Add Room</h1>
				<RouterLink :to="{ 'name': 'rooms' }"
					class="bg-gray-400 px-2 py-1 rounded hover:text-gray-200 hover:bg-gray-500">Back to Rooms
				</RouterLink>
			</div>

			<div>
				<!-- <div v-show="success" class="text-center bg-green-200 text-green-800 px-3 py-2 rounded mb-3"
					v-text="success"></div> -->
				<ul v-show="errors" class="list-disc list-inside text-red-500 mb-4">
					<li v-for="error in errors">{{ error[0] }}</li>
				</ul>
			</div>
			
			<form @submit.prevent="updateRoom">
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input type="text" v-model="room.name" class="form-control" id="name">
				</div>

				<div class="mb-3">
					<label for="description" class="form-label">Description</label>
					<textarea class="form-control" v-model="room.description" id="description" rows="3"></textarea>
				</div>

				<div class="row">
					<div class="col-md-6">
						<div class="form-group mb-3">
							<label class="form-label" for="size">Size</label>
							<input type="text" v-model="room.size" class="form-control" id="size">
						</div>
					</div>

					<div class="col-md-6">
						<div class="form-group mb-3">
							<label class="form-label" for="maximum-occupancy">Maximum Occupancy</label>
							<input type="text" v-model="room.maximum_occupancy" class="form-control" id="maximum-occupancy">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6">
						<div class="form-group mb-3">
							<label class="form-label" for="price">Price</label>
							<input type="text" v-model="room.price" class="form-control" id="price">
						</div>
					</div>

					<div class="col-md-6">
						<label class="form-label" for="photo">Photo</label>
						<div class="flex items-center gap-2 relative">
							<div class="form-group">
								<input type="file" accept="image/*" @change="selectPhoto" class="form-control" id="photo" placeholder="photo">
							</div>
							<div v-show="photo">
								<img :src="photo" :alt="room.name" class="w-auto h-10 rounded hover:absolute hover:h-auto hover:top-0 hover:left-0 hover:right-0 hover:bottom-0">
							</div>
						</div>
					</div>
				</div>

				<div class="text-center mt-2">
					<button type="reset" class="btn btn-secondary bg-gray-500 mx-2">Reset</button>
					<button type="submit" class="btn btn-primary bg-blue-500 mx-2">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>
