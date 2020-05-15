<template>
  <div id="side-bar">
    <side-search></side-search>
  </div>
</template>

<script>
import SideSearch from './SideBar/SideSearch';

export default {
  name: 'side-bar',
  components: { SideSearch },
};
</script>

<style>
#side-bar {
  height: 100%;
  float: left;
  background-color: #f2f3f5;
  width: 25%;
}
</style>
