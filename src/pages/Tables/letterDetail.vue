<template>
  <div class="tables-basic">
    <b-row>
      <b-col class="grey-text" lg="10">
        <Widget>
          <h3 class="text-center p-3 mb-2 bg-primary text-white">
            <span class="fw-semi-bold">Details</span>
          </h3>

          <table class="table table-borderless">
            <tbody>
              <tr>
                <td class="text-center">Date Recieved</td>
                <td class="text-center">{{results.date_received}}</td>
              </tr>
              <tr>
                <td class="text-center">Received From</td>
                <td class="text-center">{{results.received_from}}</td>
              </tr>
              <tr>
                <td class="text-center">Letter Date</td>
                <td class="text-center">{{results.letter_date}}</td>
              </tr>
              <tr>
                <td class="text-center">Subject</td>
                <td class="text-center">{{results.subject}}</td>
              </tr>
              <tr>
                <td class="text-center">Dispatched To</td>
                <td class="text-center">{{results.dispatched_to}}</td>
              </tr>
              <tr>
                <td class="text-center">Date Dispatche</td>
                <td class="text-center">{{results.date_dispatched}}</td>
              </tr>
              <tr>
                <td class="text-center">Letter</td>
                <td class="text-center">
                  <a
                    :href="results.attach"
                    download="results.full_name"
                    class="btn btn-outline-primary"
                  >Download letter</a>
                </td>
              </tr>
            </tbody>
          </table>
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
  name: "letterDetail",
  components: { Widget, Sparklines },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    this.created();
  },
  methods: {
    created() {
      let slug = this.$route.params.slug;
      axios
        .get(`${config.apiUrl}/recruit/sl/${slug}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        })
        .then((response) => {
          this.results = response.data;
        });
    },
  },
};
</script>

<style src="./Recruitment.scss" lang="scss" scoped />