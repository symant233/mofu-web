<template>
  <div id="audit-main">
    <table
      class="table is-striped is-fullwidth is-hoverable"
      id="audit-table"
      v-if="!noLogs"
    >
      <thead>
        <tr style="height:50px;">
          <th class="audit-th" style="width:40px;">序</th>
          <th class="audit-th" style="width:222px;">ID</th>
          <th class="audit-th" style="width:100px;">
            <abbr title="双击屏蔽IP来源">IP地址</abbr>
          </th>
          <th class="audit-th" style="width:40px;">类</th>
          <th class="audit-th" style="width:168px;">描述</th>
          <th class="audit-th">载荷</th>
          <th class="audit-th" style="width:188px;">时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in logs" :key="log._id" :id="'log-' + log._id">
          <td>{{ serial(index) }}</td>
          <td>{{ log._id }}</td>
          <th @dblclick="block(log)">{{ log.ip }}</th>
          <td>{{ log.type }}</td>
          <th>{{ log.description }}</th>
          <td class="audit-td">{{ log.payload }}</td>
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
      try {
        const rs = await api.listAuditLogs(this.page);
        this.logs = rs;
      } catch (err) {
        if (!err.response) return;
        if (err.response.status === 401) {
          this.$toast.error('[401] 没有权限.');
          this.$router.push({ name: 'mofu-auth' });
        }
      }
    },
    serial(index) {
      const offset = (this.page - 1) * 25;
      return index + offset + 1;
    },
    async block(log) {
      try {
        const rs = await api.ipBlock(log.ip, log.description);
        this.$toast.success(`${log.ip}已屏蔽`);
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.error(`${log.ip}不可重复屏蔽`);
        } else {
          this.$toast.error('屏蔽操作失败');
        }
      }
    },
  },
  mounted() {
    this.listAudit();
  },
  watch: {
    async $route(to, from) {
      await this.listAudit();
      await this.$nextTick();
    },
  },
};
</script>

<style lang="scss">
#audit-main {
  padding-bottom: 51px;
  #audit-table {
    margin-bottom: 0px;
    .audit-th {
      padding-top: 12px;
      position: sticky;
      top: 0;
      background: white;
      border: unset;
      &:after {
        content: '';
        position: absolute;
        border-bottom: groove;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
    .audit-td {
      word-break: break-all;
    }
  }
  .audit-wumpus {
    height: 90vh;
    position: fixed;
  }
}
</style>
