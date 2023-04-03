<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <component :is="this.$route.meta.layout || 'div'">
        <RouterView />
    </component>
</template>

<style scoped>
</style>
