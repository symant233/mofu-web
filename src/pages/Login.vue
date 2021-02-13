<template>
  <div class="container">
    <h2 class="title is-3 has-text-centered has-text-weight-bold">Sign In</h2>
    <form @submit.prevent="login">
      <!-- Email -->
      <div class="field">
        <label class="label">Email Address</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="Email"
            required
            v-model="email"
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
            required
            v-model="passwd"
            @keyup.enter="login"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="key" />
          </span>
        </div>
      </div>

      <!-- Remember Me -->
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" checked />
            Remember me
          </label>
        </div>
      </div>

      <!-- Login Button -->
      <div class="field">
        <div class="control">
          <input
            type="submit"
            class="button is-primary is-fullwidth"
            value="Login"
          />
        </div>
        <p class="help is-danger" v-if="invalid">
          Login failed, check your email or password.
        </p>
      </div>

      <!-- switch -->
      <div class="field">
        <div class="control">
          <label class="content is-small has-text-right">
            <p>
              <span>Don't have an account? </span>
              <router-link :to="{ name: 'mofu-register' }"
                >register</router-link
              >
            </p>
          </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../core/api';

export default {
  name: 'mofu-login',
  data() {
    return {
      invalid: false,
      email: '',
      passwd: '',
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.passwd) return;
      try {
        const rs = await api.login(this.email, this.passwd);
        localStorage.setItem('token', rs.token);
        api.conf.headers.Authorization = `Bearer ${rs.token}`;
        this.$toast.success('登陆成功!');
        this.invalid = false;
        this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
      } catch (err) {
        this.invalid = true;
        this.$toast.error('登陆失败.');
        api.warn(err);
      }
    },
  },
};
</script>

<style scoped>
/* Overall Form Set-Up */
.container {
  height: 95vh;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-flow: column wrap;
  font-family: 'Fira Sans', sans-serif;
  justify-content: center;
  margin: auto;
  max-width: 415px;
  overflow-y: hidden;
  padding: 30px 50px;
}
/* Form Header */
.title {
  margin-bottom: 1.5rem;
}
/* Password reset text */
.control span {
  color: black;
}
</style>
