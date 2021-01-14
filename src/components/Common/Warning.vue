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
  data() {
    return {
      show: false, // 提示框是否显示
      timeout: 0,
    };
  },
  methods: {
    setWarn(message) {
      this.$store.dispatch('common/setWarn', String(message));
    },
  },
  watch: {
    warn(newValue, oldValue) {
      if (newValue === '') {
        // 新值为空字串, 隐藏提示框
        this.show = false;
      } else {
        // 非空 显示提示框并延时关闭
        this.show = true;
        this.timeout = setTimeout(() => {
          // 超时后设置 warnMessage 为空字符串
          this.setWarn('');
        }, 5600);
      }
      this.setWarn(newValue);
    },
  },
  computed: {
    warn() {
      // return this.$store.state.common.warnMessage;
      return this.$store.getters['common/getWarn'];
    },
  },
};
</script>

<style>
.mofu-warning {
  position: absolute;
  right: 0px;
  top: 60px;
  width: 15rem;
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
