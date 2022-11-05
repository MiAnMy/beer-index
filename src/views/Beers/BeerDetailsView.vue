<script setup lang="ts">
import MiAlert from "@/components/MiAlert.vue";
import MiImage from "@/components/MiImage.vue";
import MiLoading from "@/components/MiLoading.vue";
import fetchData from "@/modules/axios";
import type { Beer } from "@/types/types";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

type Props = {
  id: number;
};

const router = useRouter();
const props = defineProps<Props>();
const beer = ref<Beer>();
const fetchMessage = ref<string>();

onMounted(async () => {
  const data = await fetchData<Beer[]>(`/beers/${props.id}`);
  if (typeof data === "string") {
    fetchMessage.value = data;
  } else {
    beer.value = data[0];
  }
});
</script>

<template>
  <main class="container mt-3">
    <MiAlert v-if="fetchMessage" :message="fetchMessage" type="danger" />
    <template v-else>
      <div class="row gy-3" v-if="beer">
        <div class="col-lg-4">
          <div class="row justify-content-center">
            <MiImage
              :src-img="beer.image_url"
              :alt="beer.name"
              style="width: auto; max-height: 500px"
            />
          </div>
          <div class="row mt-3">
            <h4>Food pairing</h4>
            <ul class="list-group list-group-flush px-3">
              <li
                class="list-group-item"
                v-for="food in beer.food_pairing"
                :key="food"
              >
                {{ food }}
              </li>
            </ul>
          </div>
          <div class="row">
            <p>
              Author:
              <strong>{{ beer.contributed_by }}</strong>
            </p>
          </div>
        </div>
        <div class="col">
          <h2>{{ beer.name }}</h2>
          <p class="d-flex justify-content-between">
            <span>
              {{ beer.tagline }}
            </span>
            <span> IBU: {{ beer.ibu }} ABV: {{ beer.abv }} </span>
          </p>
          <p class="text-justify">{{ beer.description }}</p>
        </div>
      </div>
      <MiLoading
        class="d-flex align-items-center justify-content-center"
        v-else
      />
    </template>
    <button
      class="btn btn-primary float-end"
      @click="router.push({ name: 'beers' })"
    >
      Back
    </button>
  </main>
</template>
