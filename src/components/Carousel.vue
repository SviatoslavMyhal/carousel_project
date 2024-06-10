<template>
  <main class="h-screen w-screen flex flex-col items-center justify-center bg-gray-300">
    <!-- Horizontal Scroll Button -->
    <div class="flex gap-[40px]">
      <AppButton
        :class="{'active-button-state': scrollDirection === 'horizontal'}"
        @click="setScrollDirection('horizontal')"
      >
        <span>Horizontal ←→</span>
      </AppButton>

      <AppButton
        :class="{'active-button-state': scrollDirection === 'vertical'}"
        @click="setScrollDirection('vertical')"
      >
        <span>Vertical ↑↓</span>
      </AppButton>
    </div>

    <div class="flex items-center gap-[10px] py-10">
      <AppButton @click="prev">
        <span>←</span>
      </AppButton>

      <div
        :class="scrollDirection === 'horizontal'
          ? 'flex snap-x overflow-x-auto overflow-y-hidden'
          : 'flex flex-col snap-y overflow-y-auto overflow-x-hidden'
        "
        class="md:w-[560px] md:h-[560px] h-[250px] w-[230px] items-center p-6 gap-6 snap-mandatory"
        ref="containerRef"
      >
        <div
          v-for="(item, index) in data"
          :ref="el => setItemRef(el as HTMLElement, index)"
          :key="item.name"
          class="snap-center md:min-h-[560px] min-h-[250px] w-full flex-shrink-0 flex flex-col p-[25px]
            bg-white text-gray-900 rounded-md"
        >
          <LazyLoadedBlock v-if="isVisible(index)" :item />
        </div>
      </div>

      <AppButton @click="next">
        <span>→</span>
      </AppButton>
    </div>
   <Pagination :dataLength="data.length" :visibleIndex />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { faker } from '@faker-js/faker'
import { useCarousel } from "../composables/useCarousel.ts"
import { IUser } from "../types/general.ts"
import LazyLoadedBlock from "./LazyLoadedBlock.vue"
import Pagination from "./Pagination.vue"
import AppButton from "./AppButton.vue"

// Using useScroll composable
const { containerRef, itemsRefs, visibleIndex, count, scrollDirection, setScrollDirection, prev, next } = useCarousel()

// Function to create a user object with fake data
const createUser = (): IUser => ({
  name: faker.person.fullName(),
  imageUrl: faker.image.avatar()
})

// Generating an array of fake users
const data: IUser[] = faker.helpers.multiple(createUser, { count })

// Computed property to determine if an item is visible
const isVisible = computed(() => (index: number) =>
  visibleIndex.value === index || visibleIndex.value === index + 1 || visibleIndex.value === index - 1
)

function setItemRef(el: HTMLElement | null, index: number) {
  if (el) itemsRefs.value[index] = el
}
</script>
<style lang="scss">
.active-button-state {
  @apply bg-black text-white
}
</style>
