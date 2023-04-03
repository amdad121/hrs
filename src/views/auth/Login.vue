<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

const user = reactive({ email: '', password: '' })

const login = () => {
    return auth.loginUser(user.email, user.password)
}

const errors = computed(() => {
    user.email = user.password = ''
    return auth.error
})
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-14">
                    <div class="card-header">
                        <h3 class="text-center font-weight-light py-3 text-2xl font-semibold">Login</h3>
                    </div>
                    <div class="card-body">
                        <!-- <div v-show="success" class="text-center bg-green-200 text-green-800 px-3 py-2 rounded mb-3"
                            v-text="success"></div> -->
                        <ul v-show="errors" class="list-disc list-inside text-red-500 mb-4">
                            <li v-for="error in errors">{{ error[0] }}</li>
                        </ul>
                        <form @submit.prevent="login()">
                            <div class="form-floating mb-3">
                                <input class="form-control" id="inputEmail" type="email" v-model="user.email"
                                    placeholder="name@example.com" />
                                <label for="inputEmail">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="inputPassword" type="password" v-model="user.password"
                                    placeholder="Password" />
                                <label for="inputPassword">Password</label>
                            </div>
                            <!-- <div class="form-check mb-3">
                                <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                            </div> -->
                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <a class="small" href="password.html">Forgot Password?</a>
                                <button type="submit" class="btn btn-primary bg-blue-500">Login</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center py-3">
                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>