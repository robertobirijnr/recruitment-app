<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <Widget>
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th>Referred by</th>
                  <th>First Name</th>
                  <th class="hidden-sm-down">Last Name</th>
                  <th class="hidden-sm-down">Role</th>
                  <th class="hidden-sm-down">Phone Numbe</th>
                  <th class="hidden-sm-down">Email</th>
                  <th class="hidden-sm-down">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row ,index) in results" :key="index">
                  <td>{{ row.referred_by }}</td>
                  <td>{{ row.first_name }}</td>
                  <td>{{ row.last_name }}</td>
                  <td class="text-semi-muted">{{ row.possible_position }}</td>
                  <td class="text-semi-muted">{{ row.phone_number }}</td>
                  <td class="text-semi-muted">{{ row.email }}</td>
                  <td class="width-150">
                    <router-link :to="row.slug" class="btn btn-primary text-white">
                      <i class="fa fa-eye" aria-hidden="true"></i>
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
  name: "RecruitsList",
  components: {
    Widget,
    Sparklines,
  },
  data() {
    return {
      results: [],
      loading: false,
    };
  },
  created() {
    axios
      .get(`${config.apiUrl}/recruit/recruits/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      })
      .then((response) => {
        this.results = response.data;
      });
  },
};
</script>

<style src="./Recruitment.scss" lang="scss" scoped />
