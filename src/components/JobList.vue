<template>
  <section class="bg-gray-50 py-8" ref='scrollComponent'>
    <div class="container m-auto">
      <div class="w-10/12 mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4" v-if="posts && posts.length">
          <div v-for="post in posts" :key="post.key"
               class="border rounded bg-white py-12 px-6 m-4 hover:shadow-lg">
            <div class="w-6/12 h-20 mb-4 mx-auto">
              <img v-if="post.employer" :src="post.employer.logoUrl" :alt="post.employer.name"
                   class="h-full w-auto m-auto object-contain"/>
            </div>
            <h1 class="text-base font-bold text-center mb-6">{{ post.title }}</h1>
            <h2 v-if="post.employer" class="text-sm text-gray-400 text-center mb-6">{{ post.employer.name }}</h2>
          </div>
        </div>
        <div :class='loading + " justify-center"'>
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="blue" stroke-width="4"></circle>
            <path class="opacity-75" fill="blue" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {onMounted, onUnmounted, ref} from "vue";
import {jobList} from "@/methods/job/joblist";
import {axiosOld} from "@/axios";

export default {
  name: 'JobList',
  setup() {
    const posts = ref([]);
    const scrollComponent = ref(null);
    const loading = ref('hidden')
    let page = ref(12)

    jobList(posts)

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
      let element = scrollComponent.value,
          bottom = Math.floor(element.getBoundingClientRect().bottom)
      console.log(bottom)
      console.log(window.innerHeight)
      if (bottom <= window.innerHeight) {
        loadMore(page);
      }
    }

    const loadMore = async (page) => {
      loading.value = 'flex'
      let offsetValue = page.value++
      const jobLimit = 12,
          url = `https://api.bestjobs.eu/jobs?offset=${offsetValue}&limit=${jobLimit}`;

      const response = await axiosOld.get(url)

      response.data.forEach(element => {
        posts.value.push(element)
      });
      loading.value = 'hidden'
    }

    return {
      posts,
      scrollComponent,
      page,
      loading,
      loadMore,
    }

  },
}
</script>