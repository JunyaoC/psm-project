<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: #e8e8e8;
      "
    >
      <div style="padding: 0.5rem; display: flex; align-items: center">
        <div style="display: flex; align-items: center; width: 100%">
          <span style="font-size: 2rem; font-weight: 900; margin-right: 2rem">{{
            proposal.title
          }}</span>
          <div v-if="proposal.student">
            <it-button
              v-if="proposal.student.uid == $store.state.user.uid"
              style="margin: 0 1rem"
              size="small"
              text
              @click="editProposal()"
              >edit</it-button
            >
          </div>
          <it-tag style="margin-right: 1rem">{{ proposal.type }}</it-tag>
          <it-tag>{{ proposal.status_text }}</it-tag>
        </div>
      </div>

      <div style="display: flex; padding: 0.5rem">
        <div
          v-if="proposal.student"
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-right: 1rem;
          "
        >
          <it-avatar
            :src="proposal.student.avatar"
            style="margin-right: 1rem"
          ></it-avatar>
          <div style="margin-bottom: 0.5rem">
            <span style="font-size: 0.8rem; font-weight: 900">student</span
            ><br />
            <span>{{ proposal.student.name }}</span>
          </div>
        </div>

        <div
          v-if="proposal.supervisor"
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-right: 1rem;
          "
        >
          <it-avatar
            :src="proposal.supervisor.avatar"
            style="margin-right: 1rem"
          ></it-avatar>
          <div style="margin-bottom: 0.5">
            <span style="font-size: 0.8rem; font-weight: 900">supervisor</span
            ><br />
            <span>{{ proposal.supervisor.name }}</span>
          </div>
        </div>

        <div
          v-for="ev of proposal.evaluator"
          :key="ev"
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
          "
        >
          <it-avatar :src="ev.avatar" style="margin-right: 1rem"></it-avatar>
          <div style="margin-bottom: 0.5rem">
            <span style="font-size: 0.8rem; font-weight: 900">evaluator</span
            ><br />
            <span>{{ ev.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 100%; overflow-y: hidden">
      <div
        style="
          width: 100%;
          height:100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        "
      >
        <div style="width: 350px; padding: 0.5rem">
          <div
            style="
              width: 100%;
              background: white;
              border-radius: 0.5rem;
              padding: 0.5rem;
            "
          >
            
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="display:flex;">
                <span style="font-size: 1.2rem; font-weight: 900;margin-right:10px;">Attachments</span>
                <it-button @click="uploadAttModal = true" size="small" outlined round type="success">
                  <it-icon name="add"></it-icon>
                </it-button>
              </div>
              <it-button size="small" text>
                <div style="display:flex;align-items:center;">
                  <it-icon name="download" style="margin-top:5%;margin-right:10px;font-size:1.2rem;"></it-icon>
                  <span>all</span>
                </div>
              </it-button>
            </div>

            <table style="table-layout: fixed; width: 100%;margin-top:1rem;">
              <tr>
                <td style="width:10%;">
                  <RemixIcon
                    class="iconElement"
                    icon="file-word-2-fill"
                    style="
                      fill: rgba(10, 46, 166, 0.6);
                      width: 1.5rem;
                      margin-right: 0.5rem;
                    "
                  ></RemixIcon>
                </td>
                <td style="width:70%;">
                  <span>Proposal Form</span>
                </td>
                <td style="display: flex;width:20%;justify-content:space-between;">
                  <it-button size="small" type="primary" text @click="downloadFile('http://localhost:3000/proposal/' + proposal.uid + '/' + proposal.form_doc)"
                    >
                    <it-icon name="get_app"></it-icon>
                    </it-button
                  >
                  <it-button size="small" type="warning" outlined @click="uploadFormModal = true">
                    <it-icon name="refresh" style="color:#ff9345;"  ></it-icon>
                  </it-button>
                </td>
              </tr>

              <tr v-for="att in proposal.att_list" :key="att">
                <td  style="width:10%;">
                  <RemixIcon
                    class="iconElement"
                    icon="file-fill"
                    style="
                      fill: rgba(10, 46, 166, 0.6);
                      width: 1.5rem;
                      margin-right: 0.5rem;
                    "
                  ></RemixIcon>
                </td>
                <td
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width:70%;
                  "
                >
                  <span>{{ att }}</span>
                </td>
                <td style="display: flex;width:20%;justify-content:space-between;">
                  <it-button size="small" type="primary" text @click="downloadFile('http://localhost:3000/proposal/' + proposal.uid + '/' + att)"
                    >
                    <it-icon name="get_app"></it-icon>
                    </it-button
                  >
                  <it-button size="small" type="danger" outlined @click="removeFile(att)">
                    <it-icon name="delete"></it-icon>
                  </it-button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div style="width:100%;height:100%;padding:0.5rem;background:#d9d5d0;overflow-y:scroll;scroll-behavior: smooth;" id="chatContainer">

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <div style="display:flex;">
                <span style="font-size: 1.4rem; font-weight: 900;margin-right:10px;">Comments</span>
              </div>
              <it-button size="small" @click="addCommentModal = true">
                <div style="display:flex;align-items:center;">
                  <it-icon name="add" style="margin-right:10px;font-size:1.2rem;"></it-icon>
                  <span>post comment</span>
                </div>
              </it-button>
            </div>

          <div v-for="comment of proposal.comment" :key="comment">
            
            <div class="chatDiv" :class="{ self: (comment.author.uid == $store.state.user.uid)}">
              <div class="chatContent">
                <div class="chatHeader">
                  <it-avatar :src="comment.author.avatar"></it-avatar>
                  <div>
                    <span class="headerText">{{comment.author.name}}</span>
                  </div>
                </div>
                <div class="chatBody">
                  <div v-html="comment.content"></div>
                </div>

                <div style="display:flex;background:#f0f0f0;border-radius:0 0 10px 10px;padding:5px;align-items:center;justify-content:space-between;">
                  <span style="font-size:0.8rem;color:rgba(0,0,0,0.5);">{{comment.timestampParsed}}</span>
                    <it-button v-if="comment.author.uid == $store.state.user.uid" type="danger" text size="small" @click="removeComment(comment)" >delete</it-button>
                </div>
                
              </div>
            </div>

            
          </div>


        </div>

      </div>

      <!-- <div v-if="proposal.status <= 2" style="display: flex; align-items: center">
      <span style="margin-right: 1rem"
        >Pending Evaluator Assessment Submission</span
      >

      <it-button
        v-if="
          proposal.supervisor.uid == $store.state.user.uid &&
          proposal.status < 1
        "
        @click="submitForEV()"
        >Submit</it-button
      >
    </div>

    <div v-if="isEvaluator" style="display: flex; align-items: center">
      <it-button-group>
        <it-button text type="danger" @click="evDecision(0, 'Reject Proposal?')"
          >Reject</it-button
        >
        <it-button
          text
          type="primary"
          @click="evDecision(2, 'Accept with Conditions?')"
          >Accept with Conditions</it-button
        >
        <it-button
          text
          type="success"
          @click="evDecision(3, 'Accept Proposal?')"
          >Accept</it-button
        >
      </it-button-group>
    </div> -->

      <!-- <h3>Proposal Form</h3> -->

      <!-- <div>
        <h3>Comments</h3>
        <it-button @click="addCommentModal = true">add comments</it-button>
      </div> -->

      <!-- <div v-for="comment of proposal.comment" :key="comment">
        <div v-html="comment.content"></div>
        <p>Posted by {{ comment.author.name }}</p>
        <it-button
          v-if="$store.state.user.uid == comment.author.uid"
          type="danger"
          @click="removeComment(comment)"
          >remove</it-button
        >
      </div> -->

      <it-modal v-model="uploadAttModal">
        <template #header>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <h3 style="margin: 0">Upload Attachments</h3>
            <it-button type="danger" @click="uploadAttModal = false"
              >Cancel</it-button
            >
          </div>
        </template>

        <template #body>
          <input type="file" multiple @change="selectAttachment" />

          <h4>Files:</h4>
          <ol>
            <li v-for="file in att_upload_files" :key="file">
              {{ file.filename }}
            </li>
          </ol>
        </template>
        <template #actions>
          <it-button type="primary" @click="uploadAttachment()"
            >Upload</it-button
          >
        </template>
      </it-modal>

      <it-modal v-model="uploadFormModal">
        <template #header>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <h3 style="margin: 0">Reupload Proposal Form</h3>
            <it-button type="danger" @click="uploadFormModal = false"
              >Cancel</it-button
            >
          </div>
        </template>

        <template #body>
          <input type="file" @change="selectForm" />

          <h4>New Proposal Form</h4>
          <p v-if="form_upload_file">{{ form_upload_file.name }}</p>
        </template>
        <template #actions>
          <it-button type="primary" @click="reuploadForm()">Upload</it-button>
        </template>
      </it-modal>

      <it-modal width="600px" v-model="selectEvModal">
        <div class="modalWrapper">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span class="modal__title">Assign Evaluator</span>
            <it-button type="danger" @click="selectEvModal = false"
              >close</it-button
            >
          </div>

          <table style="width: 100%; margin-top: 1rem">
            <tr>
              <th colspan="2">Name</th>
              <th>Domain</th>
              <th>Action</th>
            </tr>

            <tr v-for="lect in availableEv" :key="lect">
              <td>
                <it-avatar :src="lect.avatar"></it-avatar>
              </td>
              <td>{{ lect.name }}</td>
              <td style="text-align: center">{{ lect.domain }}</td>
              <td style="display: flex; justify-content: center">
                <it-button @click="assignEv(lect)">Assign</it-button>
              </td>
            </tr>
          </table>
        </div>
      </it-modal>

      <it-modal width="600px" v-model="addCommentModal">
        <div class="modalWrapper">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span class="modal__title">Add Comment</span>
            <it-button type="danger" @click="addCommentModal = false"
              >close</it-button
            >
          </div>
          <Tiptap @update="postContentUpdate($event)"></Tiptap>
          <div
            style="
              width: 100%;
              padding: 10px;
              border-radius: 1rem;
              background: rgba(233, 233, 233, 1);
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 1rem;
            "
          >
            <div style="display: flex; align-items: center">
              <it-avatar
                style="margin-right: 1rem"
                :src="$store.state.user.avatar"
              ></it-avatar>
              <h4>{{ $store.state.user.name }}</h4>
            </div>
            <it-button type="primary" @click="postComment()"
              >Post Comment</it-button
            >
          </div>
        </div>
      </it-modal>

      <it-modal v-model="editProposalModal">
        <template #header>
          <div
            style="
              width: 100%;

              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <h3 style="margin: 0">Edit Proposal</h3>
            <it-button type="danger" @click="editProposalModal = false"
              >Cancel</it-button
            >
          </div>
        </template>

        <template #body>
          <div style="height: 40vh; min-height: 250px">
            <it-input
              label-top="Proposal Name"
              v-model="proposalEdit.title"
            ></it-input>

            <it-select
              label-top="Project Type"
              :options="[
                { name: 'Research', key: 'research' },
                { name: 'Development', key: 'development' },
              ]"
              track-by="key"
              v-model="proposalEdit.type"
            ></it-select>
          </div>
        </template>
        <template #actions>
          <it-button type="primary" @click="submitEditProposal()"
            >Update</it-button
          >
        </template>
      </it-modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modalWrapper {
  width: 100%;
  max-width: 80vw;
  padding: 1rem;
}

.chatDiv{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;

  .chatContent{
    min-width: 20%;
    max-width: 400px;
    text-align: left;
    background:white;
    border-radius: 10px;

    .chatHeader{

      background:rgb(240, 240, 240);
      padding: 10px;
      border-radius: 10px 10px 0 0;

      .headerText {
        margin:0 10px;
      }

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .chatBody{
      padding: 10px;
    }

  }


}

.chatDiv.self{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  .chatContent{
    max-width: 400px;
    text-align: left;
    background:white;
    border-radius: 10px;

    .chatHeader{
      padding: 10px;
      border-radius: 10px 10px 0 0;

      .headerText {
        margin:0 10px;
      }

      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }

    .chatBody{
      padding: 10px;
    }
    
    
  }

}



</style>

<script>
import axios from "axios";
import driver from "../neo4j.js";
import endpoint from "@/endpoint.js";

import Tiptap from "@/components/Tiptap.vue";
import RemixIcon from "@/components/RemixIcon.vue";
import moment from "moment";
import { uid } from "uid";

export default {
  name: "Proposal",
  props: ["proposal_uid"],
  components: {
    Tiptap,
    RemixIcon,
  },
  data() {
    return {
      proposal: {},
      att_upload_files: [],
      form_upload_file: undefined,
      uploadAttModal: false,
      uploadFormModal: false,
      selectEvModal: false,
      addCommentModal: false,
      editProposalModal: false,
      availableEv: [],
      postContent: "",
      isEvaluator: false,
      fullEvaluator: false,
      proposalStatusType: "",
      lastupdated: 0,
      proposalEdit: {
        title: "",
        type: {},
      },
    };
  },
  mounted() {
    this.fetchProposal();
  },
  computed: {},
  methods: {
    fetchProposal() {
      let session1 = driver.session();
      let session2 = driver.session();

      this.proposal.evaluator = [];

      session1
        .run("MATCH p = (prop:Proposal {uid:$p_uid})-[*1..1]-() RETURN p", {
          p_uid: this.proposal_uid,
        })
        .then((result) => {
          result.records.forEach((data) => {
            let path = data.get("p");
            // let c_path = data.get("c_path");

            if (!this.proposal.title) {
              this.proposal = path.start.properties;
            }

            for (let segment of path.segments) {
              switch (segment.relationship.type) {
                case "PROPOSAL_SUBJECT":
                  this.proposal.subject = segment.end.properties;
                  break;

                case "SUPERVISES":
                  this.proposal.supervisor = segment.end.properties;
                  this.proposal.supervisor.avatar = `${endpoint.storage}/media/avatar_${this.proposal.supervisor.uid}.png`;
                  break;

                case "PROPOSAL_OWNER":
                  this.proposal.student = segment.end.properties;
                  this.proposal.student.avatar = `${endpoint.storage}/media/avatar_${this.proposal.student.uid}.png`;
                  break;

                case "EVALUATES":
                  if (!this.proposal.evaluator) {
                    this.proposal.evaluator = [];
                  }

                  this.proposal.evaluator.push({
                    avatar: `${endpoint.storage}/media/avatar_${segment.end.properties.uid}.png`,
                    ...segment.end.properties,
                  });

                  break;
              }
            }
          });

          if (this.proposal.evaluator == undefined) {
            this.proposal.evaluator = [];
          }

          if (this.proposal.evaluator.length == 2) {
            this.fullEvaluator = true;
          }

          for (let i = this.proposal.evaluator.length; i < 2; i++) {
            this.proposal.evaluator.push({
              avatar: "",
              name: "To be assigned",
              uid: false,
            });
          }

          this.isEvaluator = false;

          // console.log(this.$store.state.user.uid,this.proposal.evaluator)

          this.proposal.evaluator.forEach((ev) => {
            if (ev.uid == this.$store.state.user.uid) {
              this.isEvaluator = true;
            }
          });

          session1.close();

          this.proposal = { ...this.proposal };

          switch (this.proposal.status) {
            case 0:
              this.proposal.type_color = "danger";
              this.proposal.status_text = "Rejected";
              break;
            case 1:
              this.proposal.status_text = "Pending Evaluation";
              break;
            case 2:
              this.proposal.type_color = "warning";
              this.proposal.status_text = "Accepted with Condition";
              break;

            case 3:
              this.proposal.type_color = "success";
              this.proposal.status_text = "Accepted";
              break;
          }

          this.fetchFiles();
        });

      session2
        .run(
          "MATCH p = (:Proposal {uid:$p_uid})-[]-(c:Comment)-[]-(u:User) RETURN p",
          {
            p_uid: this.proposal_uid,
          }
        )
        .then((result) => {
          let comments = new Map();

          result.records.forEach((data) => {
            let c_path = data.get("p");

            for (let segment of c_path.segments) {
              switch (segment.relationship.type) {
                case "AUTHOR_OF":
                  let _c = segment.start.properties;
                  let _a = segment.end.properties;

                  delete _a["password"];

                  _c["author"] = _a;
                  _c["timestamp"] = Number(_c["timestamp"])
                  _c["timestampParsed"] = moment(Number(_c["timestamp"])).format("hh:mm A Do MMM YY")
                  _c["author"]["avatar"] = `${endpoint.storage}/media/avatar_${_c["author"].uid}.png`;

                  comments.set(_c.uid, _c);

                  break;
              }
            }
          });

          let commentArr = [];

          comments.forEach((val, key) => {
            commentArr.push({ ...val });
          });

          console.log(commentArr)

          commentArr.sort( (a,b) => (a.timestamp > b.timestamp) ? 1 : -1);

          this.proposal["comment"] = commentArr;

          this.jumpToLatest();

          session2.close();
        });
    },

    fetchFiles() {
      axios
        .get(`${endpoint.storage}/proposal/list/${this.proposal_uid}`)
        .then((res) => {
          let form_doc = res.data.filter((word) => {
            return /form_/g.test(word);
          });

          // console.log(form_doc)
          this.proposal.form_doc = form_doc[0];

          let att_list = res.data.filter((word) => {
            return /att_/g.test(word);
          });

          this.proposal.att_list = att_list;
        });
    },

    removeFile(filename) {
      if (confirm("Remove File? (no undo)")) {
        axios
          .get(`${endpoint.storage}/proposal/remove/${this.proposal.uid}/${filename}`)
          .then((res) => {
            this.$Notification({
              title: "Completed",
              text: "Removed File.",
            });

            this.fetchFiles();
          });
      }
    },

    reuploadForm() {
      this.uploadFormModal = true;
    },

    selectAttachment(event) {
      this.att_upload_files = [];

      for (let _file of event.target.files) {
        // let ext = _file.name.slice((_file.name.lastIndexOf(".") - 1 >>> 0) + 2);
        // let fuid = uid();
        this.att_upload_files.push({
          file: _file,
          filename: "att_" + _file.name,
        });
      }
    },

    selectForm(event) {
      this.form_upload_file = event.target.files[0];
    },

    uploadAttachment() {
      this.$Message({ text: "Uploading Files" });
      this.uploadAttModal = false;

      var formData = new FormData();

      for (let _file of this.att_upload_files) {
        var newFile = new File([_file.file], _file.filename);
        formData.append("proposal_file", newFile);
      }

      formData.append("proposal_uid", this.proposal.uid);

      axios
        .post(`${endpoint.storage}/api/proposal_upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          // console.log(data);
          this.att_upload_files = [];
          this.fetchFiles();
        });
    },

    async reuploadForm() {
      this.$Message({ text: "Reuploading Form" });
      this.uploadFormModal = false;

      var formData = new FormData();

      var newFile = new File(
        [this.form_upload_file],
        "form_" + this.form_upload_file.name
      );

      formData.append("proposal_file", newFile);
      formData.append("proposal_uid", this.proposal.uid);

      await axios.get(
        `${endpoint.storage}/proposal/remove/${this.proposal.uid}/${this.proposal.form_doc}`
      );

      axios
        .post(`${endpoint.storage}/api/proposal_upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          // console.log(data);
          this.att_upload_files = [];
          this.fetchFiles();
        });
    },

    selectEvaluator() {
      this.selectEvModal = true;
      this.fetchEvCandidate();
    },

    fetchEvCandidate() {
      let session = driver.session();
      this.availableEv = [];

      session
        .run(
          "MATCH (u:User),(p:Proposal {uid:$p_uid}) WHERE u.level >=2 AND u.level<=3 AND NOT (u)-[:SUPERVISES]->(p) AND NOT (u)-[:EVALUATES]->(p) RETURN u",
          {
            p_uid: this.proposal_uid,
          }
        )
        .then((result) => {
          result.records.forEach((data) => {
            let lect = data.get("u").properties;
            lect.avatar = `${endpoint.storage}/media/avatar_${lect.uid}.png`;
            // console.log(lect.avatar);
            delete lect["password"];
            this.availableEv.push(lect);
          });
        });
    },

    assignEv(lect) {
      if (confirm(`Assign ${lect.name} as Evaluator?`)) {
        this.selectEvModal = false;

        let session = driver.session();

        session
          .run(
            "MATCH (u:User {uid:$l_uid}),(p:Proposal {uid:$p_uid}) CREATE (u)-[:EVALUATES]->(p)",
            {
              p_uid: this.proposal_uid,
              l_uid: lect.uid,
            }
          )
          .then((result) => {
            this.$Notification({
              title: "Completed",
              text: `Assigned Evaluator`,
            });

            this.fetchProposal();
          });
      }
    },
    removeEv(ev) {
      if (confirm(`Assign ${ev.name} as Evaluator?`)) {
        let session = driver.session();

        session
          .run(
            "MATCH (u:User {uid:$l_uid})-[r:EVALUATES]->(p:Proposal {uid:$p_uid}) DELETE r",
            {
              p_uid: this.proposal_uid,
              l_uid: ev.uid,
            }
          )
          .then((result) => {
            this.$Notification({
              title: "Completed",
              text: `Removed Evaluator`,
            });

            this.fetchProposal();
          });
      }
    },

    postContentUpdate(value) {
      this.postContent = value;
    },

    postComment() {
      if (confirm("Post Comment")) {
        let session = driver.session();

        session
          .run(
            `
          MATCH (p:Proposal {uid:$p_uid}),(u:User {uid:$uuid})
          CREATE (u)-[:AUTHOR_OF]->(c:Comment {
            uid: $c_uid,
            timestamp: $timestamp,
            content: $content,
            author: $uuid
          })-[:COMMENT_FOR]->(p)
          `,
            {
              p_uid: this.proposal_uid,
              uuid: this.$store.state.user.uid,
              timestamp: moment().format("x"),
              content: this.postContent,
              c_uid: uid(),
            }
          )
          .then(() => {
            this.addCommentModal = false;

            this.$Notification({
              title: "Completed",
              text: "Comment Posted",
            });

            this.fetchProposal();
          });
      }
    },
    removeComment(comment) {
      if (confirm("Remove Comment?")) {
        let session = driver.session();

        session
          .run(
            `
          MATCH (c:Comment {uid:$c_uid}) DETACH DELETE c
          `,
            {
              c_uid: comment.uid,
            }
          )
          .then(() => {
            this.$Notification({
              title: "Deleted",
              text: "Wiped the comment",
            });

            this.fetchProposal();
          });
      }
    },
    submitForEV() {
      if (confirm("Submit Proposal for evaluator assessment?")) {
        let session = driver.session();

        session
          .run(
            `
          MATCH (p:Proposal {uid:$uid})
          SET p.status = 1
          `,
            {
              uid: this.proposal_uid,
            }
          )
          .then(() => {
            window.location.reload();
          });
      }
    },

    evDecision(statCode, msg) {
      if (confirm(msg)) {
        let session = driver.session();

        session
          .run(
            `
          MATCH (p:Proposal {uid:$uid})
          SET p.status = ${statCode}
          `,
            {
              uid: this.proposal_uid,
            }
          )
          .then(() => {
            // this.$Notification({
            //   title: "Completed",
            //   text: "Proposal status has been updated.",
            // });

            // this.fetchProposal();
            window.location.reload();
          });
      }
    },

    editProposal() {
      this.proposalEdit.title = this.proposal.title;
      this.proposalEdit.type = this.proposal.type;
      this.editProposalModal = true;
    },
    submitEditProposal() {
      if (typeof this.proposalEdit.type == "object") {
        this.proposalEdit.type = this.proposalEdit.type.key;
      }

      var session1 = driver.session();

      session1
        .run(
          `
          MATCH (p:Proposal {uid:$p_uid})
          SET p.title = $p_title, p.type = $p_type
        `,
          {
            p_uid: this.proposal_uid,
            p_title: this.proposalEdit.title,
            p_type: this.proposalEdit.type,
          }
        )
        .then((result) => {
          session1.close();

          this.editProposalModal = false;

          window.location.reload();
        });
    },
    downloadFile(link){
      window.open(link,'_blank')
    },
    jumpToLatest(){
      setTimeout(() => {
        var container = this.$el.querySelector("#chatContainer");
        container.scrollTop = container.scrollHeight;
        console.log(this.proposal.comment)
      }, 500)
    }
  },
};
</script>