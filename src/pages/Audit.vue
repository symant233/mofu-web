<template>
  <div>
    <audit-table></audit-table>
    <pagination></pagination>
  </div>
</template>

<script>
import AuditTable from '../components/Audit/AuditTable';
import Pagination from '../components/Audit/Pagination';

export default {
  name: 'mofu-audit',
  components: { Pagination, AuditTable },
  data() {
    return {};
  },
  beforeMount() {
    this.setApiToken(); // mixin
  },
};
</script>

<style></style>
