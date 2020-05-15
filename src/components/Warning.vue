<template>
  <transition name="fade">
    <div class="mofu-warning" v-if="show">
      <article class="message is-danger">
        <div class="message-body message-content">
          🔥 Error occurs: <br />
          {{ warn }}
        </div>
      </article>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    warn: String,
  },
};
</script>

<style>
.mofu-warning {
  position: absolute;
  right: 0px;
  top: 60px;
  max-width: 19%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
