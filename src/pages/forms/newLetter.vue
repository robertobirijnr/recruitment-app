<template>
  <div>
    <div class="b-row">
      <div class="col-11">
        <Widget>
          <div class="form">
            <div class="form-group">
              <label for="referred">Date Received</label>
              <input type="date" class="form-control" v-model="date_received" />
            </div>
          </div>
          <div class="form-group">
            <label for="first_name">Received From</label>
            <input
              type="text"
              name="received_from"
              v-model="received_from"
              class="form-control"
              placeholder="Received from"
              required
            />
          </div>
          <div class="form-group">
            <label for="last_name">Letter Date</label>
            <input
              type="date"
              name="letter_date"
              v-model="letter_date"
              class="form-control"
              placeholder="Enter first name"
              required
            />
          </div>
          <div class="form-group">
            <label for="position">Subject</label>
            <input
              type="text"
              class="form-control"
              v-model="subject"
              placeholder="Enter subject"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone_numbe">Dispatched To</label>
            <input
              type="text"
              name="dispatched_to"
              v-model="dispatched_to"
              class="form-control"
              placeholder="dispatched to"
              required
            />
          </div>
          <div class="from-group">
            <label for="email">Date Dispatched</label>
            <input
              type="date"
              v-model="date_dispatched"
              class="form-control"
              placeholder="Enter date dispatched"
              required
            />
          </div>
          <br />
          <div class="form-group">
            <label for="attach">Attach Letter</label>
            <input
              type="file"
              id="file"
              ref="file"
              class="form-control"
              accept=".pdf, .doc"
              @change="handleFileUpload()"
            />
          </div>
          <button class="btn btn-lg btn-primary pull-right" @click="submitForm">Add new letter</button>
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
  name: "newLetter",
  components: { 
    Widget 
    },
  data() {
    return {
      date_received: "",
      received_from: "",
      letter_date: "",
      subject: "",
      dispatched_to: "",
      date_dispatched: "",
      success: "",
      attach: "",
    };
  },

  methods: {
    submitForm() {
      let formData = new FormData();
      formData.append("date_received", this.date_received),
        formData.append("received_from", this.received_from),
        formData.append("letter_date", this.letter_date),
        formData.append("subject", this.subject),
        formData.append("dispatched_to", this.dispatched_to),
        formData.append("date_dispatched", this.date_dispatched),
        formData.append("attach", this.attach);
      axios
        .post(`${config.apiUrl}/recruit/letters/`, formData, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$toasted.success("File created successfull");
          // eslint-disable-next-line no-console
          this.$router.push("/app/letter");
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
    },
    handleFileUpload() {
      this.attach = this.$refs.file.files[0];
    },
  },
};
</script>
