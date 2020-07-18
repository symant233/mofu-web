<template>
  <div id="member-list"></div>
</template>

<script>
export default {
  name: 'member-list',
  props: {
    group: Object,
  },
};
</script>

<style lang="scss">
#member-list {
  height: 100%;
  background-color: #f2f3f5;
}
</style>
