<template>
  <div class="tables-basic">
    <h2 class="page-title">
      All
      <span class="fw-semi-bold">Users</span>
    </h2>

    <b-row>
      <b-col>
        <Widget>
          <span>
            <router-link to="/app/addnew-user" class="btn btn-primary float-right">Create new user</router-link>
          </span>
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th class="hidden-sm-down">Email</th>
                  <th class="hidden-sm-down">Role</th>
                  <th class="hidden-sm-down">Status</th>
                  <th colspan="2" class="hidden-sm-down">Actions</th>
                </tr>
              </thead>

              <tbody :key="object.id" v-for="object in results">
                <tr>
                  <td>{{object.staff_id}}</td>
                  <td>{{object.first_name}}</td>
                  <td>{{object.last_name}}</td>
                  <td>{{object.email}}</td>
                  <td>{{object.user_type_display}}</td>
                  <td>
                    <span v-if="object.is_active">Active</span>
                    <span v-else>Disabled</span>
                  </td>
                  <td>
                    <router-link :to="object.slug" class="btn btn-primary">
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </router-link>
                  </td>
                  <td>
                    <router-link :to="`/update-user/${object.slug}`" class="btn btn-primary">
                      <i class="fa fa-edit" aria-hidden="true"></i>
                    </router-link>
                  </td>
                  <td>
                    <router-link :to="`/update-user/${object.slug}`" class="btn btn-danger">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import Sparklines from "../../components/Sparklines/Sparklines";
import axios from "axios";
import config from "@/config";

export default {
  name: "Tables",
  components: { Widget, Sparklines },
  data() {
    return {
      results: [],
      loading: false,
    };
  },
  created() {
    axios
      .get(`${config.apiUrl}/user/list/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      })
      .then((response) => {
        this.results = response.data;
      });
  },
  methods: {},
};
</script>

<style src="./Recruitment.scss" lang="scss" scoped />
