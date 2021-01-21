<template>
  <transition name="fade">
    <div class="modal is-active" v-if="showModal">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-content" :style="{ maxWidth: maxWidth + 'px' }">
        <slot></slot>
      </div>
    </div>
  </transition>
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
      // 发送更新事件, 需要使用修饰符.sync
      // :show-modal.sync="" 来进行 props 双向绑定
      this.$emit('update:showModal', !this.showModal);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
