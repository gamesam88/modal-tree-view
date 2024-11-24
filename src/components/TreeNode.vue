<template>
  <li class="node">
    <div class="node-content">
      <svg-icon name="folder" width="16" height="16" class="node-icon" />

      <span
        :class="{ 'node-folder': true, 'node-folder--open': isSelected }"
        @click="selectFolder(folder.id)"
      >
        {{ folder.name }}
      </span>

      <button
        v-if="folder.children.length"
        type="button"
        class="node-button"
        @click.stop="toggle"
      >
        <svg-icon
          v-if="isOpen"
          name="minus"
          width="16"
          height="16"
          class="node-icon"
        />

        <svg-icon v-else name="plus" width="16" height="16" class="node-icon" />
      </button>
    </div>

    <ul v-if="isOpen">
      <TreeNode
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        :selected-folder-id="selectedFolderId"
        @folder-selected="selectFolder($event)"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type PropType } from 'vue'
import type Folder from '@/types/Folder'

export default defineComponent({
  name: 'TreeNode',
  props: {
    folder: { type: Object as PropType<Folder>, required: true },
    selectedFolderId: {
      type: [Number, null] as PropType<number | null>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'folder-selected': (id: number) => true,
  },

  setup(props, { emit }) {
    const isOpen = ref(false)

    const isSelected = computed(() => {
      return props.folder.id === props.selectedFolderId
    })

    const toggle = (): void => {
      isOpen.value = !isOpen.value
    }

    const selectFolder = (id: number): void => {
      emit('folder-selected', id)
    }

    return { isOpen, isSelected, toggle, selectFolder }
  },
})
</script>

<style scoped lang="scss">
.node {
  margin: 0.2rem 0 0 1rem;
  position: relative;

  &-button {
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
  }

  &-folder {
    cursor: pointer;

    &--open {
      font-weight: bold;
      color: $primary;
    }
  }
}
</style>
