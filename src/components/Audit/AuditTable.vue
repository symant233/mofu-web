<template>
  <div id="audit-main">
    <table
      class="table is-striped is-fullwidth is-hoverable"
      id="audit-table"
      v-if="!noLogs"
    >
      <thead>
        <tr>
          <!-- <th>
              <abbr title="自增序号(不在数据库中)">序号</abbr>
            </th> -->
          <th style="width:233px">ID</th>
          <th>IP地址</th>
          <th style="width:42px">类</th>
          <th>描述</th>
          <th>载荷</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log._id" :id="'log-' + log._id">
          <td>{{ log._id }}</td>
          <th>{{ log.ip }}</th>
          <td>{{ log.type }}</td>
          <th>{{ log.description }}</th>
          <td>{{ log.payload }}</td>
          <td>
            {{ new Date(log.date).toLocaleString('zh-CN') }}
          </td>
        </tr>
      </tbody>
    </table>
    <wumpus v-show="noLogs" class="audit-wumpus"></wumpus>
  </div>
</template>

<script>
import api from '../../core/api';
import Wumpus from '../Context/Wumpus';

export default {
  name: 'audit-table',
  components: { Wumpus },
  data() {
    return {
      logs: [],
    };
  },
  computed: {
    page() {
      const p = parseInt(this.$route.query.page, 10);
      if (p > 1) return p;
      return 1;
    },
    noLogs() {
      if (this.logs.length > 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async listAudit() {
      const rs = await api.listAuditLogs(this.page);
      this.logs = rs;
    },
  },
  mounted() {
    this.listAudit();
  },
  watch: {
    async $route(to, from) {
      await this.listAudit();
    },
  },
};
</script>

<style lang="scss">
#audit-main {
  padding-bottom: 51px;
  #audit-table {
    margin-bottom: 0px;
  }
  .audit-wumpus {
    height: 90vh;
    position: fixed;
  }
}
</style>
