<script setup lang="ts">
type Props = {
  type: "danger" | "warning" | "info";
  message: string;
};

defineProps<Props>();
</script>
<template>
  <div :class="'alert alert-' + type">{{ message }}</div>
</template>
