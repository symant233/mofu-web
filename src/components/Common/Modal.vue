<template>
  <div class="modal is-active" v-if="showModal">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-content" :style="{ maxWidth: maxWidth + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import api from '../../core/api';

export default {
  name: 'modal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      required: true,
    },
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style></style>
