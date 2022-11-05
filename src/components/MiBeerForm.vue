<script setup lang="ts">
import { reactive } from "vue";
import type { IBUFilter } from "@/types/types";
type Form = {
  name?: string;
  ibu?: number;
  filter: IBUFilter;
};

type Emits = {
  (e: "submit", query: string): void;
  (e: "reset"): void;
};

type ParamBuilder = Partial<Record<IBUFilter, string> & { beer_name: string }>;

const emit = defineEmits<Emits>();

const form = reactive<Form>({
  filter: "ibu_gt",
});

const serachParamsBuilder = () => {
  const params: ParamBuilder = {};
  if (form.name) params.beer_name = form.name.trim().replace(/\s/g, "_");
  if (form.ibu) params[form.filter] = form.ibu.toString();
  return new URLSearchParams(params).toString();
};

const onSubmit = () => {
  let query = serachParamsBuilder();
  if (query === "") return;

  emit("submit", `?${query}`);
};

const onReset = () => {
  form.name = undefined;
  form.ibu = undefined;
  form.filter = "ibu_gt";

  emit("reset");
};
</script>

<template>
  <form
    class="d-flex flex-wrap gap-2 flex-md-nowrap"
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
  >
    <input
      class="form-control"
      type="search"
      placeholder="Search by name"
      v-model="form.name"
      data-test="beer-name"
    />
    <div class="input-group">
      <select class="input-group-text" v-model="form.filter">
        <option value="ibu_gt">GT</option>
        <option value="ibu_lt">LT</option>
      </select>
      <input
        class="form-control"
        title="only numbers"
        placeholder="IBU index"
        min="0"
        type="number"
        v-model.number="form.ibu"
        data-test="beer-ibu"
      />
    </div>

    <button class="btn btn-outline-primary" type="submit">Search</button>
    <button class="btn btn-outline-secondary" type="reset">Reset</button>
  </form>
</template>
