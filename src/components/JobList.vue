<template>
  <section class="bg-gray-50 py-8" ref='scrollComponent'>
    <div class="container m-auto">
      <div class="w-10/12 mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4" v-if="posts && posts.length">
          <div v-for="post in posts" :key="post.key"
               class="flex flex-col justify-around border rounded bg-white p-6 m-4 hover:shadow-lg">
            <div class="w-6/12 h-20 mb-4 mx-auto">
              <img v-if="post.employer" :src="post.employer.logoUrl" :alt="post.employer.name"
                   class="h-full w-auto m-auto object-contain"/>
            </div>
            <h1 class="text-base font-bold text-center break-words mb-0 truncate-2-lines">{{ post.title }}</h1>
            <h2 v-if="post.employer" class="text-xs text-gray-400 text-center mb-6">{{ post.employer.name }}</h2>
            <div class="flex items-center justify-center mb-6">
              <div class="relative mr-2">
                <div class="flex"><i v-for="index in 5" :key="index" class="far fa-star text-gray-500"></i></div>
                <div class="overflow-hidden flex absolute top-0 text-gray-500"
                     :style="{width: post.employer.ratingsAverage * 20 + '%'}"><i
                    v-for="index in 5" :key="index" class="fas fa-star"></i></div>
              </div>
              <span class="text-xs">{{ post.employer.ratingsAverage }}</span>
            </div>
            <div class="grid grid-cols-2">
              <div v-if="post.locations.length > 0">
                <span class="text-gray-500 font-bold text-xs">LOCATION:</span>
                <div class="flex flex-wrap">
                  <div class="" v-for="(address, index) in post.locations" v-bind:key="address">
                    <div class="text-xs text-gray-500" v-if="index < 2"><span
                        v-if="index != 0 && index < 2">, </span>{{ address.city.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!post.salaryConfidential" class="text-right">
                <span class="text-gray-500 font-bold text-xs">SALARY:</span>
                <div class="text-xs">{{ post.netSalaryMin }}-{{ post.netSalary }}</div>
              </div>
            </div>
          </div>
        </div>
        <div :class='loading + " justify-center"'>
          <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="blue" stroke-width="4"></circle>
            <path class="opacity-75" fill="blue"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

    const flot2int = (floatvalue) => {
      return Math.floor(floatvalue)
    }


    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      // flot2int()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
      let element = scrollComponent.value,
          bottom = Math.floor(element.getBoundingClientRect().bottom)

      // console.log(bottom)
      // console.log(window.innerHeight)
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
      flot2int,
    }

  },
}
</script>