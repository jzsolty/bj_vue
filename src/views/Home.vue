<template>
  <div class="home">
    <JobList/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import JobList from "@/components/JobList";

export default {
  name: 'Home',
  components: {
    JobList,
    HelloWorld,
  },
}
</script>