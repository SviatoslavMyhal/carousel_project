import { ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from "../utils/debounce.ts"
import { TPosition } from "../types/general.ts";

export function useCarousel() {
  const count = 15
  const scrollDirection = ref<TPosition>('horizontal')
  const containerRef = ref<HTMLElement | null>(null)
  const itemsRefs = ref<HTMLElement[]>([])
  const visibleIndex = ref(0)

  let observer: IntersectionObserver

  function prev() {
    if (visibleIndex.value > 0) {
      itemsRefs.value[visibleIndex.value - 1].scrollIntoView({ behavior: 'smooth' })
    }
  }

  function next() {
    if (visibleIndex.value < itemsRefs.value.length - 1) {
      itemsRefs.value[visibleIndex.value + 1].scrollIntoView({ behavior: 'smooth' })
    }
  }

  function setScrollDirection(direction: TPosition) {
    scrollDirection.value = direction
  }

  const observerCallback = debounce((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = itemsRefs.value.findIndex(el => el.isSameNode(entry.target))
        if (index !== -1) {
          visibleIndex.value = index
        }
      }
    })
  }, 100)

  onMounted(() => {
    observer = new IntersectionObserver(observerCallback, { root: containerRef.value, threshold: 1 })

    itemsRefs.value.forEach(element => observer.observe(element))
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    containerRef,
    itemsRefs,
    visibleIndex,
    count,
    scrollDirection,
    prev,
    next,
    setScrollDirection
  }
}
