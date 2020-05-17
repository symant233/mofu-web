<template>
  <div id="side-search">
    <router-link :to="{name: 'mofu-chat', params: {channel: '@me'}}">
    <span>{{ user.nick || '&nbsp;' }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'side-search',
  props: {
    user: Object,
  },
};
</script>

<style>
#side-search {
  padding: 13px;
  font-weight: bold;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
}
</style>
