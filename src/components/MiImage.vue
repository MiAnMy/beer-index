<script setup lang="ts">
import { ref, type CSSProperties } from "vue";
import MiLoading from "./MiLoading.vue";

type Props = {
  srcImg: string;
  alt: string;
  style?: CSSProperties;
};

defineProps<Props>();
const isLoading = ref(true);

const imageLoaded = () => (isLoading.value = false);
const imageError = () => (isLoading.value = false);
</script>

<template>
  <MiLoading v-if="isLoading" />
  <img
    :src="srcImg"
    :alt="alt"
    @load="imageLoaded"
    @error="imageError"
    :style="style"
  />
</template>
