<template>
  <div class="page-wrapper">

    <h1>Proposals</h1>

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

    <tr v-for="proposal in proposals" :key="proposal" @click="viewProposal(proposal)">
      <td>{{proposal.title}}</td>
      <td>{{proposal.type}}</td>
      <td>{{proposal.subject ? proposal.subject.name : '-'}}</td>
      <td>{{proposal.owner ? proposal.owner.name : '-'}}</td>
      <td>{{proposal.session ? proposal.session.name : '-'}}</td>
      <td>{{proposal.owner ? proposal.owner.semester : '-'}}</td>
      <td>{{proposal.supervisor ? proposal.supervisor.name : '-'}}</td>
      <td>-</td>
    </tr>
  </table>
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

    .mainTable{
      width: 100%;
      text-align: center;
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
    };
  },
  methods: {
    fetchProposals() {
      let session = driver.session();

      let proposalMap = new Map();

      console.log(this.$store.state.user.level)

      if (this.$store.state.user.level == 3) {
        session
          .run("MATCH p = (:Proposal)-[*1..1]-(), p2 = (:Proposal)<-[:PROPOSAL_OWNER]-()-[:STUDENT_OF]->(:Session) RETURN p, p2", {
            uid: this.$store.state.user.uid,
          })
          .then((result) => {
            let proposalObj;

            

            result.records.forEach((data) => {
              let path = data.get("p");

              console.log(data.get("p2"))

              if (proposalMap.has(path.start.properties.uid)) {
                proposalObj = proposalMap.get(path.start.properties.uid);
              } else {
                proposalObj = { ...path.start.properties };
              }

              path.segments.forEach((segment) => {
                if (segment.relationship.type == "SUPERVISES") {
                  proposalObj["supervisor"] = segment.end.properties;
                  delete proposalObj["supervisor"]["password"];
                }

                if (segment.relationship.type == "PROPOSAL_SUBJECT") {
                  proposalObj["subject"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                }
              });

              data.get("p2").segments.forEach((segment) => {
                if (segment.relationship.type == "STUDENT_OF") {
                  proposalObj["session"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                }
              });

              proposalMap.set(path.start.properties.uid, proposalObj);
            });

            proposalMap.forEach((val, key) => {
              this.proposals.push({ ...val });
            });

            console.log(this.proposals)

            session.close();
          });
      }

      if (this.$store.state.user.level == 2) {
        session
          .run("MATCH (u:User {uid:$uid})-[]-(proposal:Proposal), p = (proposal)-[*1..1]-(), p2 = (proposal:Proposal)<-[:PROPOSAL_OWNER]-()-[:STUDENT_OF]->(:Session) return p,p2", {
            uid: this.$store.state.user.uid,
          })
          .then((result) => {
            
            let proposalObj;            

            result.records.forEach((data) => {
              let path = data.get("p");

              console.log(data.get("p2"))

              if (proposalMap.has(path.start.properties.uid)) {
                proposalObj = proposalMap.get(path.start.properties.uid);
              } else {
                proposalObj = { ...path.start.properties };
              }

              path.segments.forEach((segment) => {
                if (segment.relationship.type == "SUPERVISES") {
                  proposalObj["supervisor"] = segment.end.properties;
                  delete proposalObj["supervisor"]["password"];
                }

                if (segment.relationship.type == "PROPOSAL_SUBJECT") {
                  proposalObj["subject"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                }
              });

              data.get("p2").segments.forEach((segment) => {
                if (segment.relationship.type == "STUDENT_OF") {
                  proposalObj["session"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                }
              });

              proposalMap.set(path.start.properties.uid, proposalObj);
            });

            proposalMap.forEach((val, key) => {
              this.proposals.push({ ...val });
            });

            console.log(this.proposals)

            session.close();
          });
      }
    },

    viewProposal(proposal){
      this.$router.push('detail?proposal_uid=' + proposal.uid)
    }

  },
};
</script>