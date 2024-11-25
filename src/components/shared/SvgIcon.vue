<template>
  <component :is="icon" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const icon = defineAsyncComponent(() => import(`@/icons/${props.name}.svg`))

    return {
      icon,
    }
  },
})
</script>
