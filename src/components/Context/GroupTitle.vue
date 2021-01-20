<template>
  <div id="group">
    <span>{{ group ? group.name : '@me' }}</span>
  </div>
</template>

<script>
export default {
  name: 'group-title',
  props: {
    group: Object,
  },
};
</script>

<style lang="scss">
#group {
  padding: 13px;
  font-weight: bold;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
}
</style>
