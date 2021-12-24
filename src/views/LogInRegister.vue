<template>
  <div class="login-register min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="h4 mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back!
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to your account.
        </p>
      </div>
      <form class="mt-8 space-y-6" v-on:submit.prevent="submitForm">
        <input type="hidden" name="remember" value="true"/>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="form.email"
                   id="email-address" name="email" type="email" autocomplete="email" required=""
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Email address"/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="form.password"
                   id="password" name="password" type="password" autocomplete="current-password" required=""
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Password"/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
            </span>
            Sign in
          </button>
        </div>
      </form>
      <button :onclick="increment">TEST</button>
    </div>
  </div>
</template>

<script>

import axios from "@/axios";

export default {
  name: 'LogInRegister',
  data() {
    return {
      form: {
        password: '',
        email: '',
      },
    }
  },
  methods: {
    increment() {
      console.log(this.$st)
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    async submitForm() {

      //TEST***********************************************************************************************************
      // user: szilard@neogen.biz
      // pass: szilard
      let token = '13b20c0b0e9890b594e1c15f7c747d048ca11406ce2f1b68f2033f92e5c821229'
      //***************************************************************************************************************


      const authenticate_response = await axios.post('openapi_authenticate', this.form);
      // console.log(authenticate_response);

      if(authenticate_response && authenticate_response.headers['x-apikey']){
        token = authenticate_response.headers['x-apikey'];
        // localStorage.setItem('token', token)
      }
      // console.log(token)

      const user_response = await axios.get('own-resume-detail', {
        headers: {
          'Authorization': token
        }
      })
      // console.log(user_response)

      if(user_response && user_response.data.privateInformation){
        let user_name = user_response.data.privateInformation.email;
        if(user_response.data.privateInformation.name){
          user_name = user_response.data.privateInformation.name;
        }
        // localStorage.setItem('user', user_name)
        console.log(user_name)
      }

      // this.$router.push('/');

    }
  }
}
</script>