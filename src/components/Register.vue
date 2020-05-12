<template>
  <box class="container">
    <h2 class="title is-3 has-text-centered has-text-weight-bold">Register</h2>

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
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <!-- Password -->
    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" required />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
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
        <button class="button is-link is-fullwidth">Register</button>
      </div>
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
  </box>
</template>

<script>
import axios from 'axios';

export default {
  name: 'mofu-register',
  data() {
    return {};
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
