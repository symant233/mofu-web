<template>
  <nav class="pagination" id="audit-navbar">
    <router-link class="pagination-previous" :to="turn(-1)">
      上一页
    </router-link>
    <router-link class="pagination-next" :to="turn(1)">
      下一页
    </router-link>
    <ul class="pagination-list">
      <li>
        <router-link class="pagination-link" :to="turn(0)">
          ❮
        </router-link>
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-if="page > 1">
        <router-link class="pagination-link" :to="turn(-1)">
          {{ page - 1 }}
        </router-link>
      </li>
      <li>
        <a class="pagination-link is-current">{{ page }}</a>
      </li>
      <li>
        <router-link class="pagination-link" :to="turn(1)">
          {{ page + 1 }}
        </router-link>
      </li>
      <li>
        <router-link class="pagination-link" :to="turn(2)">
          {{ page + 2 }}
        </router-link>
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  computed: {
    page() {
      const p = parseInt(this.$route.query.page, 10);
      if (p > 1) return p;
      return 1;
    },
  },
  methods: {
    turn(plus) {
      if (plus === 0) {
        // 参数0仅用于导航到第一页
        return { name: 'mofu-audit', query: { page: 1 } };
      }
      return { name: 'mofu-audit', query: { page: this.page + plus } };
    },
  },
};
</script>

<style lang="scss">
#audit-navbar {
  background: white;
  z-index: 99;
  bottom: 3px;
  left: 4px;
  width: 100%;
  position: fixed;
  padding: 2px;
  border-top: ridge;
}
</style>
