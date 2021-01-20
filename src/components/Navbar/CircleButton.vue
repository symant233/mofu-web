<template>
  <div class="u-add-icon image is-48x48" tabindex="-1"></div>
</template>

<script>
export default {
  name: 'circle-button',
};
</script>

<style lang="scss">
.u-add-icon {
  margin: 7px auto;
  background-image: url('/static/images/add-icon.svg');
  &:focus {
    outline: 0px;
  }
}
</style>
