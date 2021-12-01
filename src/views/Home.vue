<template>
  <div class="home">
    <img class="mx-auto" alt="Vue logo" src="../assets/logo.png">
    <Hero/>
    <hr class="my-10">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Hero from "@/components/hero";

export default {
  name: 'Home',
  components: {
    Hero,
    HelloWorld,
  }
}
</script>