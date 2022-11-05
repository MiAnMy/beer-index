<script setup lang="ts">
import MiPagination from "@/components/MiPagination.vue";
import fetchData from "@/modules/axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import type { Beer } from "@/types/types";
import MiBeersContainer from "@/components/MiBeersContainer.vue";
import MiBeerNav from "@/components/MiBeerNav.vue";
import MiBeerForm from "@/components/MiBeerForm.vue";
const MAX_PAGES = +import.meta.env.VITE_MAX_PAGE;
const router = useRouter();
const route = useRoute();
const beers = ref<Beer[] | null>(null);
const fetchMessage = ref<string>();
const activePage = computed<number>(() => {
  let active = +route.query.page! || 1;
  if (active > MAX_PAGES || active <= 0) active = 1;
  return active;
});

const updateUrl = (page: number) => {
  router.push({
    name: "beers",
    query: {
      page: page,
    },
  });
};

const fetchBeers = async (query: string) => {
  beers.value = null;
  const data = await fetchData<Beer[]>(`/beers${query}`);
  if (typeof data === "string") {
    fetchMessage.value = data;
  } else {
    beers.value = data;
  }
};

const onSubmit = async (query: string) => fetchBeers(query);

const onReset = () => onPageChange(1);

const onPageChange = (page: number) => {
  const query = `?page=${page}`;
  updateUrl(page);
  fetchBeers(query);
};

onMounted(() => {
  onPageChange(activePage.value);

  window.onpopstate = () => {
    onPageChange(activePage.value);
  };
});
</script>

<template>
  <main>
    <MiBeerNav>
      <MiBeerForm
        :onSubmit="(query) => onSubmit(query)"
        :onReset="() => onReset()"
      />
    </MiBeerNav>
    <div class="container">
      <MiBeersContainer :beers="beers" />
      <MiPagination
        class="d-flex flex-column align-items-end"
        :activePage="activePage"
        :numberPages="MAX_PAGES"
        :onPageChange="(page) => onPageChange(page)"
      />
    </div>
  </main>
</template>
