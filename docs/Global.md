Methods:

```js
// UI发送错误信息
setWarn(message) {
  this.$store.dispatch('common/setWarn', String(message));
},
```