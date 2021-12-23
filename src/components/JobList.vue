<template>
  <section class="bg-gray-50 py-8">
    <div class="container m-auto">
      <div class="grid grid-cols-2 md:grid-cols-4" v-if="posts && posts.length">
        <div v-for="post in posts" :key="post.key"
             class="border rounded bg-white py-12 px-6 m-4 hover:shadow-lg">
          <div class="w-6/12 h-20 mb-4 mx-auto">
<!--            <img :src="post.employer.logoUrl" :alt="post.employer.name"-->
<!--                 class="h-full w-auto m-auto object-contain"/>-->
          </div>
          <h1 class="text-base font-bold text-center mb-6">{{ post.title }}</h1>
<!--          <h2 class="text-sm text-gray-400 text-center mb-6">{{ post.employer.name }}</h2>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios, {token} from '@/axios';

export default {
  name: 'JobList',
  data() {
    return {
      posts: [],
      next: [],
      errors: [],
    }
  },
  // async created() {
  //   const jobLimit = 12,
  //         url = `job-operation/list?limit=${jobLimit}`;
  //
  //   const response = await axios.get(url, {
  //     headers: {
  //       'Authorization': token,
  //     }
  //   })
  //   this.posts = response.data
  //   console.log(response);
  // }
}
</script>