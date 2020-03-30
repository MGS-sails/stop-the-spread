<template>
  <div class="home">
    <HomeContent @reportSymptoms="reportSymptoms" @medicChat="medicChat"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from '@/components/HomeContent.vue'

export default {
  name: 'Home',
  components: {
    HomeContent
  },
  methods: {
    reportSymptoms() {
      this.$emit('reportSymptoms');
    },
    medicChat() {
      this.$emit('medicChat');
    }
  }
}
</script>
