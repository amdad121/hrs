<script setup>
const name = app_name

const year = new Date().getFullYear()

const token = localStorage.getItem('token')
</script>

<template>
    <header class="bg-white border-b">
        <div class="container mx-auto flex justify-between items-center py-2">
            <div>
                <h2 class="text-2xl font-semibold">
                    <a href="#">{{ name }}</a>
                </h2>
            </div>
            <nav>
                <RouterLink :to="{ 'name': 'home' }" class="p-2 inline-block hover:bg-blue-100">Home</RouterLink>
                <RouterLink v-if="token" :to="{ 'name': 'admin' }" class="p-2 inline-block hover:bg-blue-100">Dashboard</RouterLink>
                <RouterLink v-else :to="{ 'name': 'login' }" class="p-2 inline-block hover:bg-blue-100">Login</RouterLink>
            </nav>
        </div>
    </header>
    <main>
        <div class="container mx-auto py-4">
            <slot />
        </div>
    </main>
    <footer class="bg-white border-t py-2">
        <div class="container mx-auto flex justify-between">
            <p>Copyright &copy; {{ year }} {{ name }}. All Rights Reserved.</p>
            <p>Made with <span class="text-red-500">&hearts;</span> by <a href="http://fb.me/amdad121" target="_blank" rel="noopener noreferrer">Amdadul Haq</a></p>
        </div>
    </footer>
</template>

<style scoped>
</style>