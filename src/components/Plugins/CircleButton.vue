<template>
  <div class="circleIconButton" tabindex="-1">
    <svg class="circleIcon" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'circle-button',
};
</script>

<style lang="scss" scoped>
.circleIcon {
  width: 24px;
  height: 24px;
}
.circleIconButton {
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  -webkit-transition: color 0.15s ease-out, background-color 0.15s ease-out;
  transition: color 0.15s ease-out, background-color 0.15s ease-out;
  color: #43b581;
  background-color: var(--background-primary);
}
svg:not(:root) {
  overflow: hidden;
}
</style>
