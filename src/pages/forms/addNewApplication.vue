<template>
  <div>
    <h2 class="page-title">
      Recruit
      <span class="fw-semi-bold">Form</span>
    </h2>
    <div class="b-row">
      <div class="col-11">
        <Widget>
          <div class="form">
            <div class="form-group">
              <label for="referred">Referred by</label>
              <input type="text" class="form-control" v-model="referred" />
            </div>
          </div>
          <div class="form-group">
            <label for="first_name">first Name</label>
            <input
              type="text"
              name="name"
              v-model="first_name"
              class="form-control"
              placeholder="Enter first name"
              required
            />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              name="name"
              v-model="last_name"
              class="form-control"
              placeholder="Enter first name"
              required
            />
          </div>
          <div class="form-group">
            <label for="received">Received</label>
            <input
              type="text"
              name="received"
              v-model="received"
              class="form-control"
              placeholder="received"
              required
            />
          </div>
          <div class="form-group">
            <label for="position">Position</label>
            <input
              type="text"
              class="form-control"
              v-model="position"
              placeholder="Enter position"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone_numbe">Phone Numbe</label>
            <input
              type="text"
              name="phone_number"
              v-model="phone_number"
              class="form-control"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div class="from-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Enter email address"
              required
            />
          </div>
          <br />
          <div class="form-group">
            <label for="cv">Carriculum vitae</label>
            <input
              type="file"
              id="file"
              ref="file"
              class="form-control"
              accept=".pdf, .doc"
              @change="handleFileUpload()"
            />
          </div>
          <button class="btn btn-lg btn-primary pull-right" @click="submitForm">Send</button>
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
  name: "NewApplicants",
  components: { Widget },
  data() {
    return {
      referred: "",
      first_name: "",
      last_name: "",
      received: "",
      position: "",
      phone_number: "",
      email: "",
      success: "",
      cv: "",
    };
  },

  methods: {
    submitForm() {
      let formData = new FormData();
      formData.append("referred", this.referred),
        formData.append("first_name", this.first_name),
        formData.append("last_name", this.last_name),
        formData.append("position", this.position),
        formData.append("received", this.received),
        formData.append("phone_number", this.phone_number),
        formData.append("email", this.email),
        formData.append("cv", this.cv);
      axios
        .post(`${config.apiUrl}/recruit/nr/`, formData, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$toasted.success("File created successfull");
          // eslint-disable-next-line no-console
          this.$router.push("/app/recruits");
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
    },
    handleFileUpload() {
      this.cv = this.$refs.file.files[0];
    },
  },
};
</script>
