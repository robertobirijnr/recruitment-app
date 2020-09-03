<template>
  <div class="tables-basic">
    <b-row>
      <b-col>
        <Widget>
          <span>
            <router-link to="/app/addnew-letter" class="btn btn-primary float-right">New letter</router-link>
          </span>
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">Date Received</th>
                  <th>Received From</th>
                  <th>Letter Date</th>
                  <th class="hidden-sm-down">Subject</th>
                  <th class="hidden-sm-down">Dispatched To</th>
                  <th class="hidden-sm-down">Date Dispatched</th>

                  <th colspan="2" class="hidden-sm-down">Action</th>
                </tr>
              </thead>

              <tbody :key="object.id" v-for="object in results">
                <tr>
                  <td>{{ object.date_received }}</td>
                  <td>{{ object.received_from }}</td>
                  <td>{{ object.letter_date }}</td>
                  <td>{{ object.subject }}</td>
                  <td>{{ object.dispatched_to }}</td>
                  <td>{{ object.date_dispatched }}</td>

                  <td>
                    <router-link :to="`/view-detail/${object.slug}`" class="btn btn-primary">
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </router-link>
                  </td>
                  <td>
                    <div>
                      <b-button
                        id="show-btn"
                        class="btn btn-warning"
                        @click="$bvModal.show('bv-modal-example')"
                      >
                        <i class="fa fa-close" aria-hidden="true"></i>
                      </b-button>

                      <b-modal id="bv-modal-example" hide-footer>
                        <template v-slot:modal-title>Are you sure you want to do this?</template>

                        <b-button
                          class="mt-3 btn btn-success"
                          @click="$bvModal.hide('bv-modal-example')"
                        >Cancel</b-button>
                        <b-button
                          class="mt-3 btn btn-danger"
                          @click="handleSubmit(object.slug)"
                        >Confirm</b-button>
                      </b-modal>
                    </div>
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
import axios from "axios";
import config from "@/config";

export default {
  name: "lettersList",
  components: {
    Widget,
  },
  data() {
    return {
      results: [],
      loading: false,
    };
  },
  created() {
    axios
      .get(`${config.apiUrl}/recruit/letters/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      })
      .then((response) => {
        this.results = response.data;
      });
  },
  methods: {
    handleSubmit(slug) {
      axios
        .delete(`${config.apiUrl}/recruit/sl/${slug}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        })
        .then((response) => {
          this.$toasted.success("action has been completed successfully");
          this.$bvModal.hide("modal-prevent-closing");
          this.$router.push("/app/new-applicant");
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
      // Hide the modal manually
    },
  },
};
</script>

<style lang="scss" scoped></style>
