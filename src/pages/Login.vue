<template>
  <div class="g-login">
    <div class="container">
      <form @submit.prevent="login">
        <h2 class="title is-3 has-text-centered has-text-weight-bold">
          Sign In
        </h2>
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

        <!-- test demo -->
        <div class="field">
          <div class="control">
            <label class="content is-small has-text-right">
              <p>
                <span>不想注册? 用演示账号</span>
                <a style="color: #ff8a00" @click="demoLogin()">一键登录</a>
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
        this.$toast.error('登陆失败');
        api.warn(err);
      }
    },
    async demoLogin() {
      try {
        const rs = await api.login('test@gmail.com', '12345678');
        localStorage.setItem('token', rs.token);
        api.conf.headers.Authorization = `Bearer ${rs.token}`;
        this.$toast.success('登陆成功!');
        this.invalid = false;
        this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
      } catch (err) {
        this.invalid = true;
        this.$toast.error('登陆失败');
        api.warn(err);
      }
    },
  },
};
</script>

<style scoped>
.g-login {
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
  padding: 45px 40px 30px 40px;
  box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 20%);
}
.container:before {
  content: '';
  width: 100%;
  height: 7px;
  background-image: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkUwRkJENzk1QTlEMTFFQjlFNzBFOTU2QjQ5QTczMEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkUwRkJEN0E1QTlEMTFFQjlFNzBFOTU2QjQ5QTczMEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRTBGQkQ3NzVBOUQxMUVCOUU3MEU5NTZCNDlBNzMwQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRTBGQkQ3ODVBOUQxMUVCOUU3MEU5NTZCNDlBNzMwQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAgGBgYGBggGBggMCAcIDA4K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);
  background-color: #33553c;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.title {
  margin-bottom: 1.5rem;
}
.control span {
  color: black;
}
.auth-bg {
  background: #f2f1f3 url(/static/images/floor-tile.png);
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
