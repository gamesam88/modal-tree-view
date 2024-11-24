<template>
  <div class="app">
    <button class="app-button" @click="isModalOpen = true">Открыть</button>

    <ModalWindow
      v-if="isModalOpen"
      title="Выберите папку"
      :folders="mockFolders"
      @close="isModalOpen = false"
      @select="onSelectFolder"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { mockFolders } from './mockData'
import ModalWindow from '@/components/ModalWindow.vue'

export default {
  components: { ModalWindow },
  setup() {
    const isModalOpen = ref(false)

    const onSelectFolder = (folderId: number) => {
      console.log('Selected Folder ID:', folderId)
      isModalOpen.value = false
    }

    return { isModalOpen, onSelectFolder, mockFolders }
  },
}
</script>

<style lang="scss">
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text;
  background-color: $bg-grey;
  height: 100vh;

  &-button {
    @include btn;

    font-size: 1.5rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>
