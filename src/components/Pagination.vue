<template>
  <div class="px-6 text-right py-2 bg-orange-500 text-2xl rounded">
    {{ visibleIndex + 1 }} / {{ dataLength }}
  </div>
</template>
<script setup lang="ts">
defineProps<{
  visibleIndex: number
  dataLength: number
}>()
</script>
