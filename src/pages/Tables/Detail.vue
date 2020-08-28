<template>
  <div class="tables-basic">
    <h2 class="page-title"></h2>

    <b-row>
      <b-col lg="8">
        <Widget>
          <h3 class="text-center p-3 mb-2 bg-primary text-white">
            {{results.first_name}} {{results.last_name}}
            <span class="fw-semi-bold">Details</span>
          </h3>

          <table class="table table-borderless">
            <tbody>
              <tr>
                <td class="text-center">Refered By</td>
                <td class="text-center">{{results.referred_by}}</td>
              </tr>
              <tr>
                <td class="text-center">First Name</td>
                <td class="text-center">{{results.first_name}}</td>
              </tr>
              <tr>
                <td class="text-center">Last Name</td>
                <td class="text-center">{{results.last_name}}</td>
              </tr>
              <tr>
                <td class="text-center">Posible Position</td>
                <td class="text-center">{{results.possible_position}}</td>
              </tr>
              <tr>
                <td class="text-center">Email Address</td>
                <td class="text-center">{{results.email}}</td>
              </tr>
              <tr>
                <td class="text-center">Curriculum vitae</td>
                <td class="text-center">
                  <a
                    :href="results.cv"
                    download="results.full_name"
                    class="btn btn-outline-primary"
                  >Download cv</a>
                </td>
              </tr>
              <tr></tr>
              <tr class="text-right">
                <div class="mt-5 pl-5">
                  <b-button
                    class="btn bg-primary text-white btn-lg"
                    v-b-modal.modal-prevent-closing
                  >Schedule Interview Date</b-button>

                  <b-modal
                    id="modal-prevent-closing"
                    ref="modal"
                    title="Schedule Interview "
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
                  >
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                      <b-form-group
                        :state="nameState"
                        label="Interviewer Name"
                        label-for="name-input"
                        invalid-feedback="Name is required"
                      >
                        <b-form-input
                          id="name-input"
                          v-model="interviewer"
                          :state="nameState"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        :state="nameState"
                        label="Interview Date"
                        label-for="date-input"
                        invalid-feedback="Date is required"
                      >
                        <b-form-input
                          type="date"
                          v-model="interview_date"
                          class="form-control"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </form>
                  </b-modal>
                </div>
              </tr>
              <!-- Modal -->
            </tbody>
          </table>
        </Widget>
      </b-col>
      <b-col lg="4">
        <h3 class="text-center p-3 mb-2 bg-primary text-white">
          Recruit Comments
          <span class="fw-semi-bold">Section</span>
        </h3>
        <!--Display comments here-->
        <div class="list-group" v-if="results.comments.length > 0">
          <a
            href="#"
            class="list-group-item list-group-item-action flex-column align-items-start"
            :key="comment.id"
            v-for="comment in results.comments"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{comment.created_by.full_name}}</h5>
              <small class="text-muted">{{format_date(comment.created_at)}}</small>
            </div>
            <p class="mb-1">{{comment.text}}</p>
            <!-- <small class="text-muted">Donec id elit non mi porta.</small> -->
          </a>
        </div>
        <span v-else>No comments!</span>
        <b-form-textarea
          type="text"
          id="textarea-rows"
          v-model="text"
          placeholder="comment here...."
          rows="8"
        ></b-form-textarea>
        <div class="pt-3 text-center">
          <b-button @click="handleComment" block variant="primary">Send</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import Sparklines from "../../components/Sparklines/Sparklines";
import axios from "axios";
import config from "@/config";
import moment from "moment";

export default {
  name: "recruitsDetails",
  components: { Widget, Sparklines },
  data() {
    return {
      results: [],
      interviewer: "",
      interview_date: "",
      nameState: null,
      submittedNames: [],
      text: "",
    };
  },
  mounted() {
    this.created();
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    },
    created() {
      let slug = this.$route.params.slug;
      axios
        .get(`${config.apiUrl}/recruit/rd/${slug}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        })
        .then((response) => {
          this.results = response.data;
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      let slug = this.$route.params.slug;
      axios
        .post(
          `${config.apiUrl}/recruit/ri/${slug}/`,
          {
            name: this.interviewer,
            date: this.interview_date,
          },
          {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }
        )
        .then((response) => {
          this.$toasted.success("File created successfull");
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    handleComment() {
      let slug = this.$route.params.slug;
      axios
        .post(
          `${config.apiUrl}/recruit/rc/${slug}/`,
          {
            text: this.text,
          },
          {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }
        )
        .then((response) => {
          this.$toasted.success("comment sent successfull");
          this.created();
          (this.text = ""),
            // eslint-disable-next-line no-console
            console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
    },
  },
};
</script>

<style src="./Recruitment.scss" lang="scss" scoped />