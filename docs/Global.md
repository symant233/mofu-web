Methods:

```js
// UI发送错误信息
setWarn(message) {
  this.$store.dispatch('common/setWarn', String(message));
},
```

Components:

```html
<modal :show-modal.sync="showModal" :max-width="430">内加想要放的组件</modal>
```