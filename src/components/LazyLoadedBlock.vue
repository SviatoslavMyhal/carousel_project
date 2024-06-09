<template>
  <div class="w-full">
    <h2 class="font-semibold md:text-xl text-sm mb-[10px]">{{ item.name }}</h2>

    <img
      :src="fileUrl"
      :alt="item.name"
      loading="lazy"
      class="shadow-lg w-full max-h-[462px] h-full object-cover rounded-md"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IUser } from "../types/general.ts"

const props = defineProps<{
  item: IUser
}>()

const fileUrl = ref(props.item.imageUrl)
</script>
