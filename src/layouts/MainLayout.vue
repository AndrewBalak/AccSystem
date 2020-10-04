<template>
  <div>

    <Navbar />

    <v-main>
      <v-container class="pa-5">
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer />

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
