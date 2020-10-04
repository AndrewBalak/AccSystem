<template>
  <div>
    <v-row v-for="n in 6" :key="n" class="mb-8 mt-8">
      <v-col>
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>
