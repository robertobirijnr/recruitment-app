/* eslint-disable no-console */
<template>
  <div>
    <div class="b-row">
      <div class="b-col-8">
        <Widget>
          <div class="form">
            <div class="form-group">
              <label for="staffid">Staff ID</label>
              <input type="text" v-model="staff_id" class="form-control" placeholder="Staff ID" />
            </div>
            <div class="form-group">
              <label for="Firstname">First Name</label>
              <input type="text" v-model="first_name" class="form-control" placeholder="First Name" />
            </div>
          </div>
          <div class="form-group">
            <label for="Lastname">Last Name</label>
            <input
              type="text"
              v-model="last_name"
              name="name"
              class="form-control"
              placeholder="Last Name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              name="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label for="Role">Role</label>
            <select name="role" v-model="role" id="role" class="form-control">
              <option value>select role</option>
              <option value="RO">Recruitment Officer</option>
              <option value="RH">Recruitment Admin</option>
              <option value="AD">Administrator</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="pass1"
              name="spassword"
              class="form-control"
              placeholder="password"
            />
          </div>
          <div class="from-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              v-model="pass2"
              class="form-control"
              placeholder="confirm password"
            />
          </div>
          <br />

          <button @click="handleformsubmit" class="btn btn-lg btn-primary pull-right">create user</button>
        </Widget>
      </div>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import axios from "axios";
import config from "@/config";

export default {
  name: "addNewUser",
  components: { Widget },
  data() {
    return {
      first_name: "",
      last_name: "",
      staff_id: "",
      email: "",
      role: "",
      pass1: "",
      pass2: "",
      msg: "",
      errors: {},
      formloading: false,
    };
  },
  methods: {
    validPassword() {
      if (this.pass1 !== this.pass2) {
        this.msg = "Passwords do not match";
        return false;
      }
      this.msg = "";
      return true;
    },
    handleformsubmit() {
      if (this.validPassword()) {
        this.formloading = true;
        axios
          .post(
            `${config.apiUrl}/user/new/`,
            {
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              user_type: this.role,
              password: this.pass2,
              staff_id: this.staff_id,
            },
            {
              headers: {
                Authorization: `JWT ${config.get_token()}`,
              },
            }
          )
          .then((response) => {
            this.formloading = false;
            this.$toasted.success("user created successfull");
            // eslint-disable-next-line no-console
            console.log(response);
            this.$router.push("/app/users");
          })
          .catch(({ response }) => {
            this.formloading = false;
            // this.$toasted.error("something  bad occur");
            // eslint-disable-next-line no-console
            console.log(response);
            this.errors = response.data;
          });
      }
    },
  },
  watch: {
    pass2(value) {
      this.pass2 = value;
      this.validPassword();
    },
  },
};
</script>
