<template>
  <div class="container">
    <h2 class="title is-3 has-text-centered has-text-weight-bold">Sign In</h2>

    <!-- Username/Email -->
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
          <i class="fas fa-envelope"></i>
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
          <i class="fas fa-key"></i>
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
        <button class="button is-primary is-fullwidth" @click="login">
          Login
        </button>
      </div>
      <p class="help is-danger" v-if="invalid">
        Login failed, check your email or password.
      </p>
    </div>

    <div class="field">
      <div class="control">
        <label class="content is-small has-text-right">
          <p>
            <span>Don't have an account? </span>
            <router-link :to="{ name: 'mofu-register' }">register</router-link>
          </p>
        </label>
      </div>
    </div>
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
        // document.cookie = `token=${rs.token}`;
        this.$cookie.set('token', rs.token);
        console.info('-> login succeed, cookie set.');
        this.invalid = false;
        this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
      } catch (err) {
        this.invalid = true;
        api.warn(err);
      }
    },
  },
  mounted() {
    const fontAwesome = document.createElement('script');
    fontAwesome.setAttribute(
      'src',
      'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
    );
    document.head.appendChild(fontAwesome);
  },
};
</script>

<style scoped>
/* Set Page Properties */
html,
body {
  background-color: #3273dc;
  box-sizing: border-box;
  margin: 0;
}

/* Overall Form Set-Up */
.container {
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-flow: column wrap;
  font-family: 'Fira Sans', sans-serif;
  justify-content: center;
  margin: auto;
  margin-top: 20vh;
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
