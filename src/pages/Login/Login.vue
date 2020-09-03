<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <img src="@/assets/gra.png" alt="GRA LOGO" />
      </h5>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>GRA RECRUITMENT SYSTEM</h3>"
        customHeader
      >
        <p class="widget-auth-info">Use your email to sign in.</p>
        <div class="mt">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">{{ errorMessage }}</b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              required
              type="email"
              name="email"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              required
              type="password"
              name="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <b-button
            type="submit"
            size="sm"
            class="auth-btn mb-3"
            variant="inverse"
            @click="Signin()"
          >Login</b-button>
        </div>
      </Widget>
    </b-container>
    <footer class="auth-footer">2020 &copy; Ghana Revenue Authority.</footer>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import axios from "axios";
import config from "@/config";

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    Signin() {
      axios
        .post(`${config.apiUrl}/user/login/`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const results = response.data;
          config.set_token(results.token.token);
          config.set_auth(JSON.stringify(results));
          config.set_user(JSON.stringify(results.user));
          this.$root.auth = results;
          this.$router.push("/app/dashboard");
        })
        .catch(({ response }) => {
          // eslint-disable-next-line no-console
          console.log(response);
          this.errorMessage = "Invalid credentials";
        });
    },
  },
};
</script>
