<template>
  <div id="wumpus" v-if="wumpus">
    <div class="wumpus-image" style=""></div>
  </div>
</template>

<script>
export default {
  props: {
    wumpus: Boolean,
  },
};
</script>

<style>
#wumpus {
  background-color: white;
  position: relative;
  margin-top: 2px;
  width: 100%;
  height: calc(100% - 60px);
  padding-top: 30%;
}

.wumpus-image {
  flex: 0 1 auto;
  width: 421px;
  height: 218px;
  margin: auto;
  background-image: url('/static/images/wumpus.svg');
}
</style>
