<template>
  <div id="wumpus" v-if="wumpus">
    <div id="wumpus-image"></div>
  </div>
</template>

<script>
export default {
  props: {
    wumpus: Boolean,
  },
};
</script>

<style lang="scss">
#wumpus {
  display: flex;
  background-color: white;
  position: relative;
  margin-top: 2px;
  width: 100%;
  height: 100%;
  #wumpus-image {
    flex: 0 1 auto;
    width: 421px;
    height: 218px;
    margin: auto;
    background-image: url('/static/images/wumpus.svg');
  }
}
</style>
