<script setup lang="ts">
import MiCardBeer from "./MiCardBeer.vue";
import MiAlert from "./MiAlert.vue";
import MiLoading from "./MiLoading.vue";
import type { Beer } from "@/types/types";
type Props = {
  beers: Beer[] | null;
};

defineProps<Props>();
</script>

<template>
  <div class="row">
    <template v-if="beers">
      <MiAlert
        v-if="beers.length === 0"
        class="mt-3"
        type="info"
        message="No beers found!"
      />
      <div
        v-else
        v-for="{ id, name, ibu, food_pairing } in beers"
        :key="id"
        class="col-lg-4 d-flex align-items-stretch py-2"
      >
        <MiCardBeer
          :id="id"
          :name="name"
          :ibu="ibu ? ibu : 'missing'"
          :foodPairing="food_pairing"
        />
      </div>
    </template>
    <MiLoading class="mt-3" v-else />
  </div>
</template>
