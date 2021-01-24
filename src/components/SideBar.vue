<template>
  <div id="side-bar">
    <side-search></side-search>
    <group-list></group-list>
  </div>
</template>

<script>
import SideSearch from './SideBar/SideSearch';
import GroupList from './SideBar/GroupList';
import api from '../core/api';

export default {
  name: 'side-bar',
  components: { SideSearch, GroupList },
};
</script>

<style lang="scss">
#side-bar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f2f3f5;
}
</style>
