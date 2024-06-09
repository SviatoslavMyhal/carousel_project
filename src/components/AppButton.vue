<template>
  <div
    class="text-lg p-[15px] flex items-center justify-center rounded bg-orange-500 cursor-pointer"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>
