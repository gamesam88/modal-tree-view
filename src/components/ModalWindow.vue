<template>
  <div class="modal">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>

      <div class="modal-body">
        <FolderTree
          :folders="folders"
          :selected-folder-id="selectedFolderId"
          @folder-selected="onFolderSelected"
        />
      </div>

      <div class="modal-footer">
        <button
          type="button"
          @click="onClickOk"
          :class="{
            'modal-button': true,
            'modal-button--disabled': !selectedFolderId,
          }"
          :disabled="!selectedFolderId"
        >
          Ок
        </button>
        <button type="button" @click="$emit('close')" class="modal-button">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type Folder from '@/types/Folder'
import FolderTree from './FolderTree.vue'

export default defineComponent({
  name: 'ModalWindow',
  components: { FolderTree },
  props: {
    title: { type: String, required: true },
    folders: { type: Array as PropType<Folder[]>, required: true },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select: (id: number) => true,
    close: () => true,
  },
  setup(_, { emit }) {
    const selectedFolderId = ref<number | null>(null)

    const onFolderSelected = (id: number): void => {
      selectedFolderId.value = id
    }

    const onClickOk = (): void => {
      if (selectedFolderId.value !== null) {
        emit('select', selectedFolderId.value)
      }
    }

    return { onFolderSelected, onClickOk, selectedFolderId }
  },
})
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  animation: fade-in 0.3s ease-in-out forwards;

  &-body {
    margin: 1.25rem 0;
    overflow: auto;
  }

  &-content {
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    min-width: 20rem;
    overflow: auto;
  }

  &-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-button {
    @include btn;

    &--disabled {
      background-color: gray;
      pointer-events: none;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
