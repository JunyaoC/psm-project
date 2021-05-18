<template>

    <div style="width: 300px; height: 100%; background: #fcfcfc;box-shadow: inset rgba(100, 100, 111, 0.15) 0px 7px 29px 0px;">

      <div style="padding:1rem;padding-top:2rem;">
        <span style="font-size:1rem;font-weight:900;">filter</span>
      </div>

      <div style="padding:1rem;">
        <div>
          <div style="margin-bottom:1rem;">
            <span>Project Type</span>
          </div>

          <div v-for="type in filters.project_type" :key="type">
            <it-checkbox :label="type.label" v-model="type.value"></it-checkbox>
          </div>


        </div>
        <div>
          <div style="margin-bottom:1rem;">
            <span>Semester</span>
          </div>

          <div v-for="sem in filters.semester" :key="sem">
            <it-checkbox :label="sem.label" v-model="sem.value"></it-checkbox>
          </div>


        </div>
        <div>
          <div style="margin-bottom:1rem;">
            <span>Academic Session</span>
          </div>

          <div v-for="session in filters.session" :key="session">
            <it-checkbox :label="session.label" v-model="session.value"></it-checkbox>
          </div>


        </div>
      </div>

    </div>


    <div style="width:100%;height:100%; display:flex;justify-content:flex-start;align-items:flex-start;">
        <div class="page-wrapper">
      <div style="display: flex; align-items: center; padding: 1rem 0">
        <h1 style="margin: 0; padding: 0; margin-right: 1rem">Proposals</h1>

        <it-toggle v-model="viewMode" :options="['Grid', 'List']" />
      </div>



            <div v-if="viewMode == 'Grid'" class="proposalWrapper">
          <div
            v-for="proposal in filteredProposals"
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
                    <it-tooltip
                      :content="proposal.supervisor.name"
                      placement="top"
                    >
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
  // max-width: 1200px;
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
  flex-wrap: wrap;
}

.proposalDiv {
  padding: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  border-radius: 10px;
  margin: 1rem;
  width: 22%;
  flex-shrink: 0;
  background: white;
  transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  cursor: pointer;
  min-width: 250px;
}

.proposalDiv:hover {
  transform: scale(1.1);
}
</style>

<script>
import driver from "../neo4j.js";
// const endpoint = "http://185.185.40.33:3000";
import endpoint from "@/endpoint.js";

export default {
  name: "ProposalList",
  mounted() {
    this.fetchProposals();
  },
  data() {
    return {
      proposals: [],
      viewMode: "Grid",
      filters:{
        project_type:[],
        semester:[],
        session:[],
        reload:false
      }
    };
  },
  methods: {
    async fetchProposals() {
      let session = driver.session();

      let proposalMap = new Map();

      // console.log(this.$store.state.user.level);

      let fetchPromise = new Promise( resolve => {
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
                  proposalObj.supervisor.avatar = `${endpoint.storage}/media/avatar_${proposalObj.supervisor.uid}.png`;
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
                    evObj.avatar = `${endpoint.storage}/media/avatar_${evObj.uid}.png`;
                    proposalObj.evaluator.push(evObj);
                  }
                }

                if (segment.relationship.type == "PROPOSAL_SUBJECT") {
                  proposalObj["subject"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint.storage}/media/avatar_${proposalObj.owner.uid}.png`;
                }
              });

              data.get("p2").segments.forEach((segment) => {
                if (segment.relationship.type == "STUDENT_OF") {
                  console.log(segment.end.properties,0)
                  proposalObj["session"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint.storage}/media/avatar_${proposalObj.owner.uid}.png`;
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
            resolve(true)
          });
      }

      if (this.$store.state.user.level == 2) {
        session
          .run(
            "MATCH self_p = (u:User {uid:$uid})-[]-(proposal:Proposal), p = (proposal)-[*1..1]-(), p2 = (proposal:Proposal)<-[:PROPOSAL_OWNER]-()-[:STUDENT_OF]->(:Session) RETURN self_p,p,p2",
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
                  proposalObj.supervisor.avatar = `${endpoint.storage}/media/avatar_${proposalObj.supervisor.uid}.png`;
                }

                if (segment.relationship.type == "PROPOSAL_SUBJECT") {
                  proposalObj["subject"] = segment.end.properties;
                }

                if (segment.relationship.type == "PROPOSAL_OWNER") {
                  proposalObj["owner"] = segment.end.properties;
                  delete proposalObj["owner"]["password"];
                  proposalObj.owner.avatar = `${endpoint.storage}/media/avatar_${proposalObj.owner.uid}.png`;
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
                    evObj.avatar = `${endpoint.storage}/media/avatar_${evObj.uid}.png`;
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
                  proposalObj.owner.avatar = `${endpoint.storage}/media/avatar_${proposalObj.owner.uid}.png`;
                }
              });

              let self_p = data.get("self_p");

              self_p.segments.forEach((segment) => {
                if (segment.relationship.type == "SUPERVISES") {
                  proposalObj["supervisor"] = segment.start.properties;
                  delete proposalObj["supervisor"]["password"];
                  proposalObj.supervisor.avatar = `${endpoint.storage}/media/avatar_${proposalObj.supervisor.uid}.png`;
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
                    evObj.avatar = `${endpoint.storage}/media/avatar_${evObj.uid}.png`;
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
            resolve(true)
          });
      }
      })

      await fetchPromise;

      let projectTypeMap = new Map();
      let semesterMap = new Map();
      let sessionMap = new Map();

      this.proposals.forEach( _proposal => {
        
        if(!projectTypeMap.has(_proposal.type)){
          projectTypeMap.set(_proposal.type,{
            label:_proposal.type,
            value:true
          })
        }

        if(!semesterMap.has(String(_proposal.owner.semester))){
          semesterMap.set(String(_proposal.owner.semester),{
            label:String(_proposal.owner.semester),
            value:true
          })
        }

        // console.log(_proposal.owner)

        if(!sessionMap.has(String(_proposal.session.name))){
          sessionMap.set(String(_proposal.session.name),{
            label:String(_proposal.session.name),
            value:true
          })
        }


      })

      this.filters.project_type = [];
      projectTypeMap.forEach( (value,key) => {
        this.filters.project_type.push(value)
      })

      this.filters.semester = [];
      semesterMap.forEach( (value,key) => {
        this.filters.semester.push(value)
      })
      
      this.filters.session = [];
      sessionMap.forEach( (value,key) => {
        this.filters.session.push(value)
      })

    },

    viewProposal(proposal) {
      this.$router.push("detail?proposal_uid=" + proposal.uid);
    },
  },
  computed: {

    filteredProposals(){

      let proposalMap = new Map();

      this.proposals.forEach( _proposal => {
        this.filters.project_type.forEach( _type => {

          if(_type.value){
            if(_proposal.type == _type.label){
              if(!proposalMap.has(_proposal.uid)){
                proposalMap.set(_proposal.uid, _proposal);
              }
            }
          }          
        })

        this.filters.semester.forEach(_sem => {
                    if(_sem.value){
            if(String(_proposal.owner.semester) == _sem.label){
              if(!proposalMap.has(_proposal.uid)){
                proposalMap.set(_proposal.uid, _proposal);
              }
            }
          }
        })

        this.filters.session.forEach(_session => {
                    if(_session.value){
            if(String(_proposal.session.name) == _session.label){
              if(!proposalMap.has(_proposal.uid)){
                proposalMap.set(_proposal.uid, _proposal);
              }
            }
          }
        })


      })

      let proposalArr = [];

      proposalMap.forEach( (value,key) => {
        proposalArr.push(value)
      })
      return proposalArr;    
      


    }

  }
};
</script>