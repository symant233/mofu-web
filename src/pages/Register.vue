<template>
  <div class="container">
    <h2 class="title is-3 has-text-centered has-text-weight-bold">Register</h2>
    <form @submit.prevent="register">
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
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>

      <!-- Username/Email -->
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
            v-model="passwd"
            @keyup.enter="register"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>

      <!-- term -->
      <div class="field">
        <div class="control">
          <label class="checkbox">
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
    async register() {
      if (!this.nick || !this.email || !this.passwd) return;
      try {
        const rs = await api.register(this.nick, this.email, this.passwd);
        localStorage.setItem('token', rs.token);
        console.info('-> register succeed, cookie set.');
        this.error = false;
        this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
      } catch (err) {
        this.error = true;
        api.warn(err);
      }
    },
  },
  beforeCreate() {
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
  margin-top: 15vh;
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
