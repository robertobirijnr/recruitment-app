<template>
  <div v-if="renderComponent" class="tables-basic">
    <b-row>
      <b-col>
        <Widget>
           <div>
            <b-button class="btn btn-success float-right" v-b-modal.modal-prevent-closing>New letter</b-button>

            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Add New Letter"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleYes"
            >
              <form ref="form" @submit.stop.prevent="addNewLetter">
                <b-form-group
                  :state="nameState"
                  label="Date Received"
                  
                  label-for="date-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="date-input"
                    v-model="date_received"
                    :state="nameState"
                    type="date"
                    required
                  ></b-form-input>
                </b-form-group>
                 <b-form-group
                  :state="nameState"
                  label="Received From"
                  type="text"
                  label-for="receied_from-input"
                  invalid-feedback="received_from is required"
                >
                  <b-form-input
                    id="first_name-input"
                    v-model="received_from"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
                 <b-form-group
                  :state="nameState"
                  label="Letter Date"
                  type="date"
                  label-for="letter_date-input"
                  invalid-feedback="letter_date is required"
                >
                  <b-form-input
                    id="letter_date-input"
                    v-model="letter_date"
                    :state="nameState"
                    type="date"
                    required
                  ></b-form-input>
                </b-form-group>
                 <b-form-group
                  :state="nameState"
                  label="Subject"
                  type="text"
                  label-for="subject-input"
                  invalid-feedback="subject is required"
                >
                  <b-form-input
                    id="subject-input"
                    v-model="subject"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
                 <b-form-group
                  :state="nameState"
                  label="Dispatched To"
                  type="text"
                  label-for="Dispatched To"
                  invalid-feedback="dispatched_to is required"
                >
                  <b-form-input
                    id="dispatched_to-input"
                    v-model="dispatched_to"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
                 <b-form-group
                  :state="nameState"
                  label="Date Dispatched"
                  type="date"
                  label-for="Dispatched To"
                  invalid-feedback="dispatched_to is required"
                >
                  <b-form-input
                    id="date_dispatched-input"
                    v-model="date_dispatched"
                    type="date"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  :state="nameState"
                  label="Letter Type"
                  label-for="letter_type"
                  invalid-feedback="letter_type is required"
                >
                <b-form-select v-model="letter_type" :state="nameState" :options="options" size="sm" class="mt-3"></b-form-select>
                </b-form-group>
                <b-form-group
                 :state="nameState"
                  label="Upload Letter"
                  label-for="upload file"
                  invalid-feedback="upload is required"
                >
                   <b-form-file
                    v-model="attach"
                    :state="Boolean(attach)"
                     accept=".pdf, .doc"
                    placeholder="Choose a file or drop it here..."
                    
                  ></b-form-file>
                </b-form-group>
              </form>
            </b-modal>
          </div>
          <!-- <span>
            <router-link :to="{name:'newLetter'}" class="btn btn-primary float-right">New letter</router-link>
          </span> -->
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
       name: '',
       nameState: null,
       renderComponent: true,
       date_received: "",
      received_from: "",
      letter_date: "",
      subject: "",
      dispatched_to: "",
      date_dispatched: "",
      success: "",
      letter_type:"",
      attach: null,
      options: [
          { value: "", text: 'Please select an option' },
          { value: 'CG', text: "C-G's Office" },
          { value: 'CL', text: 'Correspondence Request for Payment' },
          { value: 'RP', text: 'Request for payment' }
        ]
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
          this.renderComponent = false;
           this.$nextTick(() => {
          this.renderComponent = true;
        })
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
      // Hide the modal manually
       this.$nextTick(() => {
          this.renderComponent = true;
        })
    },
     checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleYes(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.addNewLetter()
      },
      addNewLetter() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        let formData = new FormData();
      formData.append("date_received", this.date_received),
        formData.append("received_from", this.received_from),
        formData.append("letter_date", this.letter_date),
        formData.append("subject", this.subject),
        formData.append("dispatched_to", this.dispatched_to),
        formData.append("letter_typ", this.letter_type),
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
         this.renderComponent = false;
         this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
          this.renderComponent = true;
        })
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch((error) => {
          this.$toasted.error(error.response.status);
        });
        this.renderComponent = false;
  
        // eslint-disable-next-line no-console
        console.log(this.name)
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
          this.renderComponent = true;
        })
      }
  },
 
};
</script>

<style src="./Recruitment.scss" lang="scss" scoped />
