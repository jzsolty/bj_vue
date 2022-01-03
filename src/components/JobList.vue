<template>
  <section class="bg-gray-50 py-8" ref='scrollComponent'>
    <div class="container m-auto">
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
    let page = ref(2)

    jobList(posts)

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
      let element = scrollComponent.value,
          bottom = Math.round(element.getBoundingClientRect().bottom)
      if (bottom <= window.innerHeight) {
        loadMore(page);
      }
    }

    const loadMore = async (page) => {
      let pageValue = page.value++
      const jobLimit = 12,
          url = `https://api.bestjobs.eu/jobs?page=${pageValue}?limit=${jobLimit}`;

      const response = await axiosOld.get(url)

      response.data.forEach( element => {
        posts.value.push(element)
      });

    }

    return {
      posts,
      scrollComponent,
      page,
    }

  },
}
</script>