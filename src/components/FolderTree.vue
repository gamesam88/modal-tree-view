<template>
  <ul>
    <TreeNode
      v-for="folder in folders"
      :key="folder.id"
      :folder="folder"
      :selected-folder-id="selectedFolderId"
      @folder-selected="onFolderSelected($event)"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import TreeNode from './TreeNode.vue'
import type Folder from '@/types/Folder'

export default defineComponent({
  name: 'FolderTree',
  components: { TreeNode },
  props: {
    folders: { type: Array as PropType<Folder[]>, required: true },
    selectedFolderId: {
      type: [Number, null] as PropType<number | null>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'folder-selected': (id: number) => true,
  },

  setup(_, { emit }) {
    const onFolderSelected = (id: number): void => {
      emit('folder-selected', id)
    }
    return { onFolderSelected }
  },
})
</script>
