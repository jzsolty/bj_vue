<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ postTitle }}</h2>
    <p>{{ numWordsInTitle }}</p>
    <button @click="updateTitle('test asd asd asd')">TEST</button>
  </div>
</template>

<script>

import {computed, ref} from "vue";

export default {
  name: 'About',
  components: {},

  // VUE3
  setup() {
    const postTitle = ref('postTitle');
    const numWordsInTitle = computed(() => postTitle.value.split(' ').length);
    const updateTitle = (newValue) => postTitle.value = newValue;

    return { postTitle, numWordsInTitle, updateTitle }
  },

  // VUE2
  // data() {
  //   return {
  //     postTitle: 'a default title',
  //   }
  // },
  // methods: {
  //   updateTitle(newValue) {
  //     this.postTitle = newValue;
  //   }
  // },
  // computed: {
  //   numWordsInTitle() {
  //     return this.postTitle.split(' ').length;
  //   }
  // }
}
</script>