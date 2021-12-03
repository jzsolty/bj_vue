<template>
  <div class="bg-gray-50">
    <div class="container m-auto">
      <div class="grid grid-cols-2 md:grid-cols-4" v-if="posts && posts.length">
        <div v-for="post in posts" :key="post.key" class="border rounded bg-white p-4 m-4">
          <div class="w-full h-20 mb-4">
            <img :src="post.employer.logoUrl" :alt="post.employer.name" class="h-full w-auto m-auto object-contain"/>
          </div>
          <h1 class="text-base font-bold text-center">{{ post.title }}</h1>
          <h2 class="text-sm text-gray-400 text-center">{{ post.employer.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JobList',
  data() {
    return {
      posts: [],
      next: [],
      errors: [],
    }
  },
  created() {
    axios.get(`https://api.bestjobs.eu/jobs?limit=24`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
  }
}
</script>