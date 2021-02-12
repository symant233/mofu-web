<template>
  <div id="group-title">
    <span>{{ title || '&nbsp;' }}</span>
    <div id="info-icon">
      <font-awesome-icon icon="info-circle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'group-title',
  computed: {
    title() {
      let t;
      if (this.group !== undefined) {
        if (this.group.dm) {
          t = this.group.users.nick;
        } else {
          t = this.group.name;
        }
      }
      return t;
    },
  },
};
</script>

<style lang="scss">
#group-title {
  padding: 13px;
  font-weight: bold;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
}
#info-icon {
  float: right;
  color: #b5b5b5;
}
</style>
