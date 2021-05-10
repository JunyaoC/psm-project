<template>
  <div class="page-wrapper">
    <div style="display: flex; align-items: center; padding: 1rem 0">
      <h1 style="margin: 0; padding: 0; margin-right: 1rem">Proposals</h1>

      <it-toggle v-model="viewMode" :options="['Grid', 'List']" />
    </div>

    <div v-if="viewMode == 'Grid'" class="proposalWrapper">
      <div
        v-for="proposal in proposals"
        :key="proposal"
        @click="viewProposal(proposal)"
        class="proposalDiv"
      >
        <div
          style="
            display: flex;
            width: 100;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            padding-top: 1rem;
          "
        >
          <span style="font-weight: 900; font-size: 1.2rem">{{
            proposal.title
          }}</span>
          <it-tag>{{ proposal.type }}</it-tag>
        </div>

        <span style="font-size: 0.8rem; padding: 0 0.5rem">{{
          proposal.subject ? proposal.subject.name : "-"
        }}</span>

        <div
          style="
            padding: 1rem 0.5rem 0 0.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          "
        >
          <div
          v-if="proposal.status == 0"
            style="
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              background: #ff4f4f;
              margin-right: 0.5rem;
            "
          ></div>

          <div
          v-if="proposal.status == 2"
            style="
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              background: #4f55ff;
              margin-right: 0.5rem;
            "
          ></div>

          <div
          v-if="proposal.status == 3"
            style="
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              background: #55cf73;
              margin-right: 0.5rem;
            "
          ></div>

          <div
          v-if="proposal.status == 1"
            style="
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              background: #ffd059;
              margin-right: 0.5rem;
            "
          ></div>

          


          <span style="font-size: 0.8rem; font-weight: 900">{{
            proposal.status_text
          }}</span>
        </div>

        <div
          style="
            width: 100%;
            padding: 5px;
            border-radius: 10px;
            background: #f0f0f0;
            margin: 1rem 0;
          "
        >
          <table style="width: 100%; table-layout: fixed">
            <tr>
              <td style="font-size: 0.8rem">student</td>
              <td style="font-size: 0.8rem">supervisor</td>
              <td style="font-size: 0.8rem" colspan="2">evaluator</td>
            </tr>

            <tr>
              <td style="padding: 0 20px 0 0" v-if="proposal.owner">
                <it-tooltip
                  :content="
                    proposal.owner.name +
                    ' (Sem' +
                    proposal.owner.semester +
                    ')'
                  "
                  placement="top"
                >
                  <it-avatar
                    size="30px"
                    :src="proposal.owner.avatar"
                  ></it-avatar>
                </it-tooltip>
              </td>
              <td style="padding: 0 20px 0 0" v-if="proposal.supervisor">
                <it-tooltip :content="proposal.supervisor.name" placement="top">
                  <it-avatar
                    size="30px"
                    :src="proposal.supervisor.avatar"
                  ></it-avatar>
                </it-tooltip>
              </td>
              <td
                style="
                  padding: 0 20px 0 0;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                "
              >
                <it-tooltip
                  :content="ev.name"
                  placement="top"
                  v-for="ev in proposal.evaluator"
                  :key="ev"
                  style="flex-shrink: 0; margin-right: 15px"
                >
                  <it-avatar size="30px" :src="ev.avatar"></it-avatar>
                </it-tooltip>
              </td>
            </tr>
          </table>
        </div>

        <!-- <div
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
          "
        >
          <it-icon name="forum" style="margin-right: 1rem"></it-icon>
          <span
            >{{ proposal.commentCount }}
            {{ proposal.commentCount > 1 ? "Comments" : "Comment" }}</span
          >
        </div> -->

        <div
          style="
            text-align: right;
            font-weight: 900;
            font-size: 0.8rem;
            color: rgba(0, 0, 0, 0.5);
          "
        >
          <span>Click to View</span>
        </div>
      </div>
    </div>

    <div v-if="viewMode == 'List'">
      <table class="mainTable">
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Subject</th>
          <th>Student</th>
          <th>Session</th>
          <th>Semester</th>
          <th>Supervisor</th>
          <th>Evaluators</th>
        </tr>

        <tr
          v-for="proposal in proposals"
          :key="proposal"
          @click="viewProposal(proposal)"
        >
          <td>{{ proposal.title }}</td>
          <td>{{ proposal.type }}</td>
          <td>{{ proposal.subject ? proposal.subject.name : "-" }}</td>
          <td>{{ proposal.owner ? proposal.owner.name : "-" }}</td>
          <td>{{ proposal.session ? proposal.session.name : "-" }}</td>
          <td>{{ proposal.owner ? proposal.owner.semester : "-" }}</td>
          <td>{{ proposal.supervisor ? proposal.supervisor.name : "-" }}</td>
          <td>-</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .proposalWrapper{
//   width: 100%;
//   height: 100%;
//   padding: 2rem;

// }

.page-wrapper {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 1rem;
}

.mainTable {
  width: 100%;
  text-align: center;
}

.proposalWrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.proposalDiv {
  padding: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  border-radius: 10px;
  margin: 1rem;
  width: 24%;
  flex-shrink: 0;
  background: white;
  transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  cursor: pointer;
}

.proposalDiv:hover {
  transform: scale(1.1);
}
</style>

<script>
import driver from "../neo4j.js";
const endpoint = "http://localhost:3000";

export default {
  name: "ProposalList",
  mounted() {
    this.fetchProposals();
  },
  data() {
    return {
      proposals: [],
      viewMode: "Grid",
    };
  },
  methods: {
    fetchProposals() {
      let session = driver.session();

      let proposalMap = new Map();

      // console.log(this.$store.state.user.level);

      if (this.$store.state.user.level == 3) {
        session
          .run(
            "MATCH p = (:Proposal)-[*1..1]-(), p2 = (:Proposal)<-[:PROPOSAL_OWNER]-()-[:STUDENT_OF]->(:Session) RETURN p, p2",
            {
              uid: this.$store.state.user.uid,
            }
          )
          .then((result) => {
            let proposalObj;

            result.records.forEach((data) => {
              let path = data.get("p");

              if (proposalMap.has(path.start.properties.uid)) {
                proposalObj = proposalMap.get(path.start.properties.uid);
              } else {
                proposalObj = { ...path.start.properties };
              }
              path.segments.forEach((segment) => {
                if (segment.relationship.type == "SUPERVISES") {
                  proposalObj["supervisor"] = segment.end.properties;
                  delete proposalObj["supervisor"]["password"];
                  proposalObj.supervisor.avatar = `${endpoint}/media/avatar_${proposalObj.supervisor.uid}.png`;
                }

                if (segment.relationship.type == "EVALUATES") {
                  if (!proposalObj.evaluator) {
                    proposalObj.evaluator = [];
                  }

                  let evExist = false;

                  for (let ev of proposalObj.evaluator) {
                    if (ev.uid == segment.end.properties.uid) {
                      evExist = true;
                    }
                  }

                  if (!evExist) {
                    let evObj = segment.end.properties;
                    delete evObj["password"];
                    evObj.avatar = `${endpoint}/media/avatar_${evObj.uid}.png`;
                    proposalObj.evaluator.push(evObj);
                  }
                }

                if (segment.relationship.type == "PROPOSAL_SUBJECT") {
                  proposalObj["subject"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint}/media/avatar_${proposalObj.owner.uid}.png`;
                }
              });

              data.get("p2").segments.forEach((segment) => {
                if (segment.relationship.type == "STUDENT_OF") {
                  proposalObj["session"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint}/media/avatar_${proposalObj.owner.uid}.png`;
                }
              });

              proposalMap.set(path.start.properties.uid, proposalObj);
            });

            proposalMap.forEach((val, key) => {
              switch (val.status) {
                case 0:
                  val.type_color = "danger";
                  val.status_text = "Rejected";
                  break;
                case 1:
                  val.status_text = "Pending Evaluation";
                  break;
                case 2:
                  val.type_color = "warning";
                  val.status_text = "Accepted with Condition";
                  break;

                case 3:
                  val.type_color = "success";
                  val.status_text = "Accepted";
                  break;
              }

              this.proposals.push({ ...val });
            });

            console.log(this.proposals);

            session.close();
          });
      }

      if (this.$store.state.user.level == 2) {
        session
          .run(
            "MATCH self_p = (u:User {uid:$uid})-[]-(proposal:Proposal), p = (proposal)-[*1..1]-(), p2 = (proposal:Proposal)<-[:PROPOSAL_OWNER]-()-[:STUDENT_OF]->(:Session), return self_p,p,p2",
            {
              uid: this.$store.state.user.uid,
            }
          )
          .then((result) => {
            let proposalObj;

            result.records.forEach((data) => {
              let path = data.get("p");

              if (proposalMap.has(path.start.properties.uid)) {
                proposalObj = proposalMap.get(path.start.properties.uid);
              } else {
                proposalObj = { ...path.start.properties };
              }

              path.segments.forEach((segment) => {

                if (segment.relationship.type == "SUPERVISES") {
                  proposalObj["supervisor"] = segment.end.properties;
                  delete proposalObj["supervisor"]["password"];
                  proposalObj.supervisor.avatar = `${endpoint}/media/avatar_${proposalObj.supervisor.uid}.png`;
                }

                if (segment.relationship.type == "PROPOSAL_SUBJECT") {
                  proposalObj["subject"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint}/media/avatar_${proposalObj.owner.uid}.png`;
                }

                if (segment.relationship.type == "EVALUATES") {                 

                  if (!proposalObj.evaluator) {
                    proposalObj.evaluator = [];
                  }

                  let evExist = false;

                  for (let ev of proposalObj.evaluator) {
                    if (ev.uid == segment.end.properties.uid) {
                      evExist = true;
                    }
                  }

                  if (!evExist) {
                    let evObj = segment.end.properties;
                    delete evObj["password"];
                    evObj.avatar = `${endpoint}/media/avatar_${evObj.uid}.png`;
                    proposalObj.evaluator.push(evObj);
                  }
                }
                
              });

              data.get("p2").segments.forEach((segment) => {
                if (segment.relationship.type == "STUDENT_OF") {
                  proposalObj["session"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint}/media/avatar_${proposalObj.owner.uid}.png`;
                }
              });

              let self_p = data.get("self_p");

              self_p.segments.forEach((segment) => {

                if (segment.relationship.type == "SUPERVISES") {
                  proposalObj["supervisor"] = segment.start.properties;
                  delete proposalObj["supervisor"]["password"];
                  proposalObj.supervisor.avatar = `${endpoint}/media/avatar_${proposalObj.supervisor.uid}.png`;
                }

                if (segment.relationship.type == "EVALUATES") {                 

                  if (!proposalObj.evaluator) {
                    proposalObj.evaluator = [];
                  }

                  let evExist = false;

                  for (let ev of proposalObj.evaluator) {
                    if (ev.uid == segment.start.properties.uid) {
                      evExist = true;
                    }
                  }

                  if (!evExist) {
                    let evObj = segment.start.properties;
                    delete evObj["password"];
                    evObj.avatar = `${endpoint}/media/avatar_${evObj.uid}.png`;
                    proposalObj.evaluator.push(evObj);
                  }
                }


              });



              proposalMap.set(path.start.properties.uid, proposalObj);
            });

            proposalMap.forEach((val, key) => {
              switch (val.status) {
                case 0:
                  val.type_color = "danger";
                  val.status_text = "Rejected";
                  break;
                case 1:
                  val.status_text = "Pending Evaluation";
                  break;
                case 2:
                  val.type_color = "warning";
                  val.status_text = "Accepted with Condition";
                  break;

                case 3:
                  val.type_color = "success";
                  val.status_text = "Accepted";
                  break;
              }

              this.proposals.push({ ...val });
            });

            // console.log(this.proposals);

            session.close();
          });
      }
    },

    viewProposal(proposal) {
      this.$router.push("detail?proposal_uid=" + proposal.uid);
    },
  },
};
</script>