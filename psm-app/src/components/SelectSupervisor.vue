<template>
  <div>
    <h4 style="margin: 0; padding: 0">STEP 1</h4>
    <h2 style="margin: 0; padding: 0; margin-bottom: 1rem">
      Request Supervisor
    </h2>

    <p>
      Select your preferred supervisor from the provided list. Your selection
      will be reviewed by the PSM committee.
    </p>
  </div>

  <div style="width: 100%; display: flex; justify-content: center">
    <it-avatar
      v-if="$store.state.user.supervisor"
      size="100px"
      :src="$store.state.user.supervisor.avatar"
    ></it-avatar>
    <it-avatar v-if="!$store.state.user.supervisor" size="100px"></it-avatar>
  </div>

  <div
    style="
      padding: 1rem;
      width: 100%;
      border-radius: 15px;
      background: #f7f7f7;
      margin-bottom: 2rem;
    "
  >
    <table style="width: 100%; text-align: left">
      <tr>
        <th>Preferred Supervisor</th>
        <td>
          {{
            $store.state.user.supervisor
              ? $store.state.user.supervisor.name
              : "-"
          }}
        </td>
      </tr>
      <tr>
        <th>Status</th>
        <td>
          <span v-if="$store.state.user.supervisor.status == 'approved'">
            <it-tag filled type="success">Approved</it-tag>
          </span>
          <span v-if="$store.state.user.supervisor.status == 'pending'">
            <it-tag filled type="warning">Pending</it-tag>
          </span>
          <span v-if="$store.state.user.supervisor.status == 'rejected'">
            <it-tag filled type="danger">Rejected</it-tag>
          </span>
          <span v-if="$store.state.user.supervisor.status == '-'">
            <it-tag>Pending Selection</it-tag>
          </span>
        </td>
      </tr>
    </table>
  </div>

  <div style="text-align:left;width:100%;display:flex;justify-content:space-between;align-items:center;margin:1rem 0;">
    <p style="margin-right:2rem;">
    Note: By placing request, you are subjected to agree the Agreement.
  </p>

  <it-button size="small" @click="viewAgreement()">view agreement</it-button>
  

  </div>
  
  <it-button block @click="selectLecturerModal = true" v-if="$store.state.user.supervisor.status != 'approved'" :disabled="$store.state.user.supervisor.status == 'pending'"
      >View and Select</it-button>

  

  <it-modal width="600px" v-model="selectLecturerModal">
    <div class="modalWrapper">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span class="modal__title">Request Preferred Supervisor</span>
        <it-button type="danger" @click="selectLecturerModal = false"
          >close</it-button>
      </div>

      <table style="width: 100%; margin-top: 1rem">
        <tr>
          <th colspan="2">Lecturer Name</th>
          <th>Domain</th>
          <th>Action</th>
        </tr>

        <tr
          v-for="lect in availableSupervisor"
          :key="lect"
          @click="requestSV(lect)"
        >
          <td>
            <it-avatar :src="lect.avatar"></it-avatar>
          </td>
          <td>{{ lect.name }}</td>
          <td style="text-align: center">{{ lect.domain }}</td>
          <td style="display: flex; justify-content: center">
            <it-button>Request</it-button>
          </td>
        </tr>
      </table>
    </div>
  </it-modal>
</template>

<style lang="scss" scoped>
.modalWrapper {
  width: 100%;
  max-width: 80vw;
  padding: 1rem;
}
</style>

<script>
import driver from "../neo4j.js";
import endpoint from "@/endpoint.js";

export default {
  name: "SelectSupervisor",
  emits: ["fetchStudentInfo"],
  data() {
    return {
      selectLecturerModal: false,
      availableSupervisor: [],
    };
  },
  mounted() {
    this.fetchAllSupervisorInfo();
  },
  methods: {
    fetchStudentInfo(){
      this.$emit('fetchStudentInfo',true);
    },
    fetchAllSupervisorInfo() {
      let session = driver.session();

      this.availableSupervisor = [];

      session
        .run(
          "MATCH (lect:User)-[:LECTURER_OF]->(sub:Subject {uid:$s_uid}) return lect",
          {
            uid: this.$store.state.user.uid,
            s_uid: this.$store.state.user.subject.uid,
          }
        )
        .then((result) => {
          result.records.forEach((data) => {
            // this.$store.state.user.session = {...}
            let lect = { ...data.get("lect")["properties"] };
            lect.avatar = `${endpoint.storage}/media/avatar_${lect.uid}.png`;
            this.availableSupervisor.push(lect);
            // this.$store.state.user.subject = {...data.get("allLect")['properties']}
          });

          session.close();
        });
    },
    requestSV(lect) {
      if (confirm("Are you sure?")) {
        console.log(this.$store.state.user.uid);

        if (true) {
          //// check if the user has already made an agreement

          let session = driver.session();

          if (this.$store.state.user.supervisor.status == "rejected") {
            session
              .run(
                `
                  MATCH (lect:User {uid:$lect_uid})-[r1:REJECT_SUPERVISE]->(stud:User {uid:$stu_id}), (newLect:User {uid:$new_uid})
                  CREATE (newLect)<-[:REQUEST_SUPERVISE]-(stud)
                  WITH r1
                  DELETE r1
                `,
                {
                  stu_id: this.$store.state.user.uid,
                  lect_uid: this.$store.state.user.supervisor.uid,
                  new_uid: lect.uid,
                }
              )
              .then((result) => {
                this.$Notification({
                  title: "Success 🎊",
                  text: `Request Sent!`,
                });

                this.selectLecturerModal = false;
                session.close();

                this.fetchStudentInfo();
              });
          } else {
            session
              .run(
                `
            MATCH (lect:User {uid:$lect_uid}),(stu:User {uid:$stu_id})
            CREATE (lect)<-[:REQUEST_SUPERVISE]-(stu)
            `,
                {
                  stu_id: this.$store.state.user.uid,
                  lect_uid: lect.uid,
                }
              )
              .then((result) => {
                this.$Notification({
                  title: "Success 🎊",
                  text: `Request Sent!`,
                });

                this.selectLecturerModal = false;
                session.close();

                this.fetchStudentInfo();
              });
          }
        }
      }
    },
    viewAgreement(){
      window.location.href = endpoint.storage + '/media/agreement.txt'
    }
  },
};
</script>