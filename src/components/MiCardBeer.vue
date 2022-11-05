<script setup lang="ts">
import { RouterLink } from "vue-router";

type Props = {
  id: number;
  name: string;
  ibu: number | string;
  foodPairing: string[];
};

defineProps<Props>();
</script>

<template>
  <div class="card" style="width: 100%">
    <div class="card-header">
      <h5 class="card-title">{{ name }}</h5>
    </div>
    <div class="card-body">
      <p class="card-text">IBU: {{ ibu }}</p>
      <!-- <p class="card-text">Food paring: {{ foodPairing.join(", ") }}</p> -->
      <ul class="list-group list-group-flush">
        <span class="mb-2">Food paring:</span>
        <li class="list-group-item" v-for="foodP in foodPairing" :key="foodP">
          {{ foodP }}
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <RouterLink :to="{ name: 'beerDetails', params: { id } }">
        Read more
      </RouterLink>
    </div>
  </div>
</template>
