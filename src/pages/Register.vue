<template>
  <div class="g-register">
    <div class="container">
      <form @submit.prevent="register">
        <h2 class="title is-3 has-text-centered has-text-weight-bold">
          Register
        </h2>
        <!-- nickname -->
        <div class="field">
          <label class="label">Nick Name</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Nick"
              v-model="nick"
              required
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="user" />
            </span>
          </div>
        </div>

        <!-- Email -->
        <div class="field">
          <label class="label">Email Address</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Email"
              v-model="email"
              required
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope" />
            </span>
          </div>
        </div>

        <!-- Password -->
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Password"
              v-model="passwd"
              @keyup.enter="register"
              required
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="key" />
            </span>
          </div>
        </div>

        <!-- term -->
        <div class="field">
          <div class="control">
            <label class="checkbox" style="font-size:13px">
              <input type="checkbox" checked />
              I agree to the Terms and Conditions
            </label>
          </div>
        </div>

        <!-- Register Button -->
        <div class="field">
          <div class="control">
            <input
              type="submit"
              class="button is-link is-fullwidth"
              value="Register"
            />
          </div>
          <p class="help is-danger" v-if="error">
            Failed, email may already been registered.
          </p>
        </div>

        <!-- switch -->
        <div class="field">
          <div class="control">
            <label class="content is-small has-text-right">
              <p>
                <span>Already have an account? </span>
                <router-link :to="{ name: 'mofu-login' }">login</router-link>
              </p>
            </label>
          </div>
        </div>
      </form>
      <div class="auth-bg"></div>
    </div>
  </div>
</template>

<script>
import api from '../core/api';

export default {
  name: 'mofu-register',
  data() {
    return {
      nick: '',
      email: '',
      passwd: '',
      error: false,
    };
  },
  methods: {
    len(str) {
      // 英文1字符 中文2字符 返回串长度
      let count = 0;
      for (let i = 0; i < str.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        if ((str.charCodeAt(i) & 0xff00) !== 0) {
          count += 1;
        }
        count += 1;
      }
      return count;
    },
    async register() {
      if (!this.nick || !this.email || !this.passwd) return;
      if (this.len(this.nick) > 16) {
        this.$toast.info('昵称长度不能超过16');
        return;
      }
      try {
        const rs = await api.register(this.nick, this.email, this.passwd);
        localStorage.setItem('token', rs.token);
        api.conf.headers.Authorization = `Bearer ${rs.token}`;
        this.$toast.success('注册成功!');
        this.error = false;
        this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
      } catch (err) {
        this.error = true;
        this.$toast.error('注册失败');
        api.warn(err);
      }
    },
  },
};
</script>

<style scoped>
.g-register {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.container {
  background-color: white;
  border-radius: 5px;
  flex-flow: column wrap;
  font-family: 'Fira Sans', sans-serif;
  margin: auto;
  max-width: 415px;
  overflow-y: hidden;
  padding: 30px 50px;
  box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 20%);
}
.title {
  margin-bottom: 1.5rem;
}
.control span {
  color: black;
}
.auth-bg {
  background: #f2f1f3 url(/static/images/telegram.jpg);
  background-size: 86rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 1;
}
@media screen and (max-width: 401px) {
  .container {
    margin-top: calc(((90vh - 400px)) / 2);
    border-radius: 0px;
  }
}
</style>
