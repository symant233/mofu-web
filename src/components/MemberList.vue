<template>
  <div id="member-list" ref="member-list">
    <div id="i-info" @click="toogleInfo" class="unselectable">
      <font-awesome-icon icon="info-circle" />
    </div>
    <div id="member-content" :class="showInfo ? 'active' : ''">
      <relation-detail v-if="group && group.dm"></relation-detail>
      <group-members v-else-if="group && !group.dm"></group-members>
    </div>
  </div>
</template>

<script>
import RelationDetail from './MemberList/RelationDetail';
import GroupMembers from './MemberList/GroupMembers';

export default {
  name: 'member-list',
  components: { RelationDetail, GroupMembers },
  data() {
    return {
      showInfo: false,
    };
  },
  methods: {
    toogleInfo() {
      this.showInfo = !this.showInfo;
    },
    handler(e) {
      const el = this.$refs['member-list'];
      if (!el.contains(e.target)) {
        this.showInfo = false;
      }
    },
  },
  watch: {
    showInfo(newV, oldV) {
      if (newV) {
        document.addEventListener('click', this.handler);
      } else {
        document.removeEventListener('click', this.handler);
      }
    },
  },
};
</script>

<style lang="scss">
#member-list {
  #member-content {
    height: 100%;
    background-color: #f2f3f5;
  }
  #i-info {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    margin: 13px;
  }
}
@media screen and (max-width: 925px) {
  #member-list {
    #i-info {
      display: block;
    }
    #member-content {
      position: absolute;
      top: 0;
      right: 0;
      width: 15rem;
      margin-top: 52px;
      height: 93vh;
      display: none;
      &.active {
        display: flex;
      }
    }
  }
}
</style>
