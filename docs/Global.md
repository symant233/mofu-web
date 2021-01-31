全局 Mixin:
```js
this.channel // 计算属性-路由params
this.setApiToken() // 从 localStorage 设置 api 的 token
```

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