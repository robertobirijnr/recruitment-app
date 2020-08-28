/* eslint-disable no-console */
<template>
  <div>
    <h2 class="page-title">
      Create
      <span class="fw-semi-bold">User</span>
    </h2>
    <div class="b-row">
      <div class="b-col-8">
        <Widget>
          <table class="table table-borderless">
            <tbody>
              {{userDetails}}
              <tr>
                <td class="text-center">First Name</td>
                <td class="text-center">{{userDetails.first_name}}</td>
              </tr>
              <tr>
                <td class="text-center">Last Name</td>
                <td class="text-center">{{userDetails.last_name}}</td>
              </tr>
              <tr>
                <td class="text-center">Posible Position</td>
                <td class="text-center">{{userDetails.role}}</td>
              </tr>
              <tr>
                <td class="text-center">Email Address</td>
                <td class="text-center">{{userDetails.email}}</td>
              </tr>
              <tr>
                <td class="text-center">Email Address</td>
                <td class="text-center">{{userDetails.status}}</td>
              </tr>
            </tbody>
          </table>
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
  name: "NewUser",
  components: { Widget },
  data() {
    return {
      userDetails: [],
      msg: "",
      errors: {},
      formloading: false,
    };
  },
  methods: {
    details() {
      this.loading = true;
      const id = this.$route.params.userId;
      axios
        .get(`${config.apiUrl}/user/u/${id}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        })
        .then((res) => {
          const results = res.data;
          this.userDetails = results.object;
          this.logs = results.logs;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(res);
        });
    },
  },
};
</script>
