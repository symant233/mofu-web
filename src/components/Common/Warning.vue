<template>
  <transition name="bounce">
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
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
