<script setup>
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRoomStore } from '@/stores/room';

const { rooms, loading, error } = storeToRefs(useRoomStore())

const { getRooms, deleteRoom } = useRoomStore()

const success = ref("");

onBeforeMount(() => {
    const route = useRoute()
    const params = route.params.success
    if (params !== undefined) {
        success.value = params
    }
});

getRooms()

const roomDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
        deleteRoom(id)
    }
}
</script>

<template>
    <main class="p-4">
        <div class="container-fluid mx-auto">
            <div class="mb-4 flex justify-between items-center">
                <h1 class="text-2xl">Rooms</h1>
                <RouterLink :to="{ 'name': 'rooms.create' }" class="bg-gray-400 px-2 py-1 rounded hover:text-gray-200 hover:bg-gray-500">Add New Room</RouterLink>
            </div>
            <div>
                <div v-show="success" class="text-center bg-green-200 text-green-800 px-3 py-2 rounded mb-3"
					v-text="success"></div>
            </div>
            <div class="card mb-4">
                <div class="card-header">Rooms</div>
                <div class="card-body">
                    <table id="datatablesSimple" class="w-full">
                        <thead>
                            <tr class="border-y">
                                <th class="p-2">Photo</th>
                                <th class="p-2">Name</th>
                                <th class="p-2">Description</th>
                                <th class="p-2">Size</th>
                                <th class="p-2">Maximum Occupancy</th>
                                <th class="p-2">Price</th>
                                <th class="p-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b" v-for="room in rooms">
                                <td class="p-2">
                                    <img :src="room.photo" :alt="room.name">
                                </td>
                                <td class="p-2">{{ room.name }}</td>
                                <td class="p-2">{{ room.description }}</td>
                                <td class="p-2">{{ room.size }}</td>
                                <td class="p-2">{{ room.maximum_occupancy }}</td>
                                <td class="p-2">{{ room.price }}</td>
                                <td class="p-2">
                                    <RouterLink :to="{ 'name': 'rooms.edit', params: { id: room.id } }" class="bg-gray-400 px-2 py-1 rounded hover:text-gray-200 hover:bg-gray-500 inline-block m-1">Edit</RouterLink>
                                    <button type="button" @click="roomDelete(room.id)" class="bg-gray-400 px-2 py-1 rounded hover:text-gray-200 hover:bg-gray-500 inline-block m-1">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>