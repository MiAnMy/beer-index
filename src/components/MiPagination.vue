<script setup lang="ts">
type Props = {
  numberPages: number;
  activePage: number;
};

type Emits = {
  (e: "pageChange", page: number): void;
};

defineProps<Props>();
const emits = defineEmits<Emits>();

const changePage = (page: number) => {
  emits("pageChange", page);
};
</script>

<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" v-for="i in numberPages" :key="i">
        <button
          class="page-link"
          :class="activePage === i && 'active'"
          :onclick="() => changePage(i)"
        >
          {{ i }}
        </button>
      </li>
    </ul>
  </nav>
</template>
