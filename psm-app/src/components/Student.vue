<template>
  <div :class="{'psuedohide': !finishLoad}" class="studentWrapper">
    <h1  v-if="!$store.state.user.proposal" style="margin-left:2rem;" >Welcome Back, {{ $store.state.user.name }}</h1>

    <div v-if="!$store.state.user.proposal" class="swipperWrapper">

      

      <swiper
        class="swiperElement"
        :slides-per-view="3"
        :space-between="50"
        :centeredSlides="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        ref="mySwiper"
      >
      <swiper-slide class="slideDiv"></swiper-slide>
        <swiper-slide class="slideDiv">
          <div>
            <h4 style="margin: 0; padding: 0">SMART PSM SYSTEM</h4>
            <h1 style="margin: 0; padding: 0; margin-bottom: 1rem">
              Getting Started
            </h1>
            <p>
              Welcome to the UTM SMART PSM system. Before proceeding to the next
              step, please review your personal information and update
              accordingly.
            </p>
          </div>

          <div
            style="
              padding: 1rem;
              width: 100%;
              border-radius: 1rem;
              background: white;
              margin-top:2rem;
            "
          >
            <div style="width:100%;display:flex;justify-content:center;">
              <it-avatar style="width:100px;height:100px;" :src="$store.state.user.avatar"></it-avatar>
            </div>
            <table style="width: 100%; text-align: left">
              <tr>
                <th>Name</th>
                <td>{{ $store.state.user.name }}</td>
              </tr>
              <tr>
                <th>Contact Number</th>
                <td>{{ $store.state.user.contact }}</td>
              </tr>
              <tr>
                <th>Course</th>
                <td>
                  {{
                    $store.state.user.subject
                      ? $store.state.user.subject.name
                      : ""
                  }}
                </td>
              </tr>
              <tr>
                <th>Session</th>
                <td>
                  {{
                    $store.state.user.session
                      ? $store.state.user.session.name
                      : ""
                  }}
                </td>
              </tr>
            </table>

            <it-button style="margin-top: 1rem" @click="openForm()">Edit Information</it-button>
          </div>

          <div style="padding: 1rem" v-if="!($store.state.user.verified)">
            <it-button type="primary" @click="confirmInfo()"
              >Save and Proceed</it-button
            >
          </div>
        </swiper-slide>
        <swiper-slide class="slideDiv">
          <SelectSupervisor
            v-if="$store.state.user.subject"
            v-on:fetchStudentInfo="fetchStudentInfo()"
          ></SelectSupervisor>
        </swiper-slide>
        <swiper-slide class="slideDiv">
          <ProposalSubmit @submitProposal="proposalSubmitted"></ProposalSubmit>
        </swiper-slide>
      </swiper>


    </div>

    <div v-if="!$store.state.user.proposal" style="width:100%;display:flex;justify-content:center;align-items:center;margin-left:-2rem;">
      <div style="width:500px;display:flex;justify-content:space-between;align-items:center;">

        <div class="swiperNavDiv">
          <div class="navButton" @click="moveSlide('prev')">
            <it-icon name="chevron_left"></it-icon>
          </div>
        </div>


          <div class="swiperNavDiv">
            <div class="navButton"  @click="moveSlide('next')">
              <it-icon name="chevron_right"></it-icon>
            </div>
          </div>
      </div>

    </div>

    <Proposal v-if="$store.state.user.proposal" :proposal_uid="$store.state.user.proposal.uid"></Proposal>

    <it-modal v-model="studentEditModal" :closable-mask="false">
    <div style="padding: 1rem">
      <div
        style="
          padding: 1rem;
          border-radius: 1rem;
          background: #f8f8f8;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div style="width: 100%">
          <span style="font-size: 2rem; font-weight: 700">Update Information</span>
        </div>

        <it-button type="danger" @click="studentEditModal = false" >cancel</it-button >
      </div>
      <h3>User Info</h3>
      
      <div style=" width: 100%; display: flex; justify-content: space-between; align-items: center; " >
        <it-avatar size="70px" style="flex-shrink:0;" :src="formData.user_avatar_src" />
        <input type="file" style="margin: 0 1rem;" @change="selectAvatar"/>
        <it-button @click="changePassword()" >Change Password</it-button >
      </div>
      <it-input label-top="Name" v-model="formData.user_name" />
      <it-input label-top="Contact" v-model="formData.user_contact" />

      <div style="width:100%;border-radius:4px;padding:4px 10px; box-shadow:0 1px 1px rgb(211 218 230 / 30%);border:1px solid #d3dae6;margin-top:1rem;">
        <it-tooltip content="Contact a PSM Committee Lecturer to edit these info." placement="right">
          <table style="text-align:left;">
          <tr>
            <th>Matric Number</th>
            <td>
              {{formData.user_matric}}
            </td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td>
              {{formData.user_email}}
            </td>
          </tr>
          <tr>
            <th>Subject</th>
            <td>
              {{formData.user_subject.name}}
            </td>
          </tr>
          <tr>
            <th>Session</th>
            <td>
              {{formData.user_session.name}}
            </td>
          </tr>
          <tr>
            <th>Semester</th>
            <td>
              {{formData.user_semester}}
            </td>
          </tr>
        </table>
        </it-tooltip>
      </div>
      <div style=" width: 100%; display: flex; justify-content: space-between; align-items: center; " >
        <it-button type="primary" style="margin-top: 1rem" @click="submitForm()" >Update</it-button >
      </div>
    </div>
  </it-modal>



  </div>

  <!-- LECT MODAL -->

  <!-- <it-modal v-model="selectLecturerModal">
    <div style="width:100%;padding:1rem;min-height:500px;">
      <table>
        <tr v-for="lect in lecturers" :key="lect">
          <td>
            <it-avatar :src=></it-avatar>
          </td>
          <td>{{lect.name}}</td>
        </tr>
      </table>
      
    </div>
  </it-modal> -->
</template>

<style lang="scss">
#app .wrapper {
  overflow: hidden !important;
  width: 100%;
}

.homeWrapper{
  overflow: hidden !important;
  width: 100%;
}

</style>

<style lang="scss" scoped>

.psuedohide{
  display: none!important;
}

.studentWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  overflow-x: hidden;
  // padding: 1rem;
}

.slideDiv {
  height: 100%;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.slideDiv:first-of-type, .slideDiv:nth-child(2) {
  box-shadow: none;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  min-width: 800px;
  min-height: 70vh;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.swipperWrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .swiperElement {
    padding: 2rem 0;
    height: 100%;
    // width: 90%;
  }
}


  .swiperNavDiv {
    width: 5%;
    
    .navButton{
      background: rgb(43, 43, 43);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 1rem;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      transition: all 200ms cubic-bezier(0.68, -0.1, 0.265, 1.55);
      cursor: pointer;

      .it-icon{
        font-size: 1.5rem;
      }
    }

    .navButton:hover{
      transform: scale(1.1);
    }
  }
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";
import driver from "../neo4j.js";
import endpoint from "@/endpoint.js";
import axios from "axios";

import ProposalSubmit from "@/components/SubmitProposal.vue";
import SelectSupervisor from "@/components/SelectSupervisor.vue";
import Proposal from '@/components/Proposal.vue';

export default {
  name: "Student",
  components: {
    Swiper,
    SwiperSlide,
    ProposalSubmit,
    SelectSupervisor,
    Proposal
  },
  data() {
    return {
      swiper: undefined,
      formData: {
        user_type: "Student",
        user_email: "",
        user_name: "",
        user_password: "",
        user_avatar: "",
        user_avatar_src: "",
        user_subject: "",
        user_domain: "",
        user_contact: "",
        user_matric: "",
        user_session: "",
        user_semester: ""
      },
      availableSupervisor: [],
      studentEditModal:false,
      payload:{},
      finishLoad:false
      // selectLecturerModal: false,
    };
  },
  async mounted() {
    await this.fetchStudentInfo();
    this.finishLoad = true;
    // await this.fetchAllSupervisorInfo();
    // await this.fetchPreferredSupervisorInfo();
    // if (this.$store.state.user.preferred_sv) {
    // } else {
    //   this.fetchAllSupervisorInfo();
    // }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
      // this.swiper.slideTo(1);
    },
    onSlideChange() {
      console.log("slide change");
    },

    moveSlide(op){

      switch(op){
        
        case 'prev':
          this.swiper.slidePrev();
          break;

        case 'next':
          this.swiper.slideNext();
          break;


      }


    },

    confirmInfo() {

      let session = driver.session();

      session.run("MATCH (u:User {uid:$uid}) SET u.verified = true", {
            uid: this.$store.state.user.uid,
          })
          .then((result) => {
            this.swiper.slideNext();
            this.$store.state.user.progress = 2;

            this.$Notification.success({
              title: "Info Verified",
              text: `Thank you for updating and verifying your details.`,
            });
            this.fetchStudentInfo();
          })
    },
    

    openSelectLectModal() {
      // alert(1)
      // this.selectLecturerModal = true;
      this.selectLecturerModal = true;
    },
    async fetchStudentInfo() {
      console.log(0);

      return new Promise((resolve) => {
        let session = driver.session();

        session
          .run("MATCH p = (u:User {uid:$uid})-[*1..1]-() RETURN p", {
            uid: this.$store.state.user.uid,
          })
          .then((result) => {
            // result.records.forEach((data) => {
            //   this.$store.state.user.session = {
            //     ...data.get("sn")["properties"],
            //   };
            //   this.$store.state.user.subject = {
            //     ...data.get("s")["properties"],
            //   };
            // });

            let userData = false;

            result.records.forEach((data) => {
              let path = data.get("p");

              path.segments.forEach((seg) => {

                if(!userData){
                  this.$store.state.user = {...seg.start.properties}
                  this.$store.state.user['avatar'] = `${endpoint.storage}/media/avatar_${this.$store.state.user.uid}.png`;
                  userData =true;
                }

                if (seg.relationship.type == "MAJOR_IN") {
                  this.$store.state.user["subject"] = { ...seg.end.properties };
                }

                if (seg.relationship.type == "STUDENT_OF") {
                  this.$store.state.user["session"] = { ...seg.end.properties };
                }

                if (seg.relationship.type == "REQUEST_SUPERVISE") {
                  if(this.$store.state.user.progress < 2){
                    this.$store.state.user.progress = 2;
                  }
                  this.$store.state.user.supervisor = {
                    ...seg.end.properties,
                    status: "pending",
                  };
                  this.$store.state.user.supervisor.avatar = `${endpoint.storage}/media/avatar_${this.$store.state.user.supervisor.uid}.png`;
                }

                if (seg.relationship.type == "REJECT_SUPERVISE") {
                  
                  if(this.$store.state.user.progress < 2){
                    this.$store.state.user.progress = 2;
                  }

                  this.$store.state.user.supervisor = {
                    ...seg.end.properties,
                    status: "rejected",
                  };
                  this.$store.state.user.supervisor.avatar = `${endpoint.storage}/media/avatar_${this.$store.state.user.supervisor.uid}.png`;
                }

                if (seg.relationship.type == "SUPERVISOR_OF") {
                  
                  if(this.$store.state.user.progress < 3){
                    this.$store.state.user.progress = 3;
                  }

                  this.$store.state.user.supervisor = {
                    ...seg.end.properties,
                    status: "approved",
                  };
                  this.$store.state.user.supervisor.avatar = `${endpoint.storage}/media/avatar_${this.$store.state.user.supervisor.uid}.png`;
                }

                if (seg.relationship.type == "PROPOSAL_OWNER") {

                  if(this.$store.state.user.progress < 4){
                    this.$store.state.user.progress = 4;
                  }

                  this.$store.state.user.proposal = {
                    ...seg.end.properties
                  };
                }


              });
            });

            if(this.$store.state.user.supervisor){

              delete this.$store.state.user.supervisor.password;

              if(this.$store.state.user.supervisor.status == 'approved'){
                this.swiper.slideTo(3);
              }else{
                this.swiper.slideTo(2);
              }
            }else{
              
              this.$store.state.user.supervisor = {
                name: "-",
                status: "-",
              };

              if(!this.$store.state.user.verified){
                this.swiper.slideTo(1);
              }

              if(this.$store.state.user.verified){
                this.swiper.slideTo(2);
              }

            }

            // if(this.$store.state.user.progress < 3){
            //   this.swiper.slideTo(this.$store.state.user.progress);
            //   this.swiper.allowTouchMove = false;
            // }
            



            this.swiper.allowTouchMove = false;

            resolve(true);

            session.close();
          });
      });
    },
    selectAvatar(event) {
      this.formData.user_avatar = event.target.files[0];
      this.formData.user_avatar_src = URL.createObjectURL(
        this.formData.user_avatar
      );

      console.log(this.formData.user_avatar_src);
    },
    openForm() {
      this.payload = {...this.$store.state.user};
      this.studentEditModal = true;
      console.log(endpoint.storage + "/media/avatar_" + this.payload.uid + ".png");

      this.formData = {
          user_type: "Student",
          user_email: this.payload.email,
          user_name: this.payload.name,
          user_password: this.payload.password,
          user_avatar: "",
          user_avatar_src: endpoint.storage + "/media/avatar_" + this.payload.uid + ".png",
          user_subject: this.payload.subject,
          user_domain: "",
          user_contact: this.payload.contact,
          user_matric: this.payload.matric,
          user_session: this.payload.session,
          user_semester: this.payload.semester,
        };
    },
    changePassword() {
      

      let newPass = prompt("Enter New Password");
      this.studentEditModal = false;

      var session = driver.session();

      session
        .run("MATCH (u:User {uid:$uid}) SET u.password = $pwd", {
          uid: this.payload.uid,
          pwd: sha256(newPass),
        })
        .then(() => {
          session.close();

          this.$Notification({
            title: "Success 🎊",
            text: `User ${this.payload.name} has been updated successfully.`,
          });


        });
    },
    async submitForm() {
          if (this.formData.user_avatar) {
            var formData = new FormData();

            var newFile = new File(
              [this.formData.user_avatar],
              "avatar_" + this.payload.uid + ".png",
              { type: "image/png" }
            );

            formData.append("avatar", newFile);

            axios
              .post(`${endpoint.storage}/api/upload`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((data) => {
                console.log(data);
              });
          }

          var session = driver.session();

          session.run(`MATCH (s2:Session {uid:$old_session_uid})<-[r1:STUDENT_OF]-(u:User { uid:$uid })-[r2:MAJOR_IN]->(s:Subject { uid:$old_s_uid}) DELETE r1,r2`,{
                uid: this.payload.uid,
                old_session_uid:this.payload.session.uid,
                old_s_uid: this.payload.subject.uid
              }).then( () => {
                              session
                    .run(
                      `MATCH (u:User {
                      uid:$uid
                    }) SET
                      u.email = $email,
                      u.name = $name,
                      u.level =  $level,
                      u.contact =  $contact,
                      u.matric =  $matric,
                      u.semester = $semester
                      RETURN u
                  `,
                      {
                        email: this.formData.user_email,
                        name: this.formData.user_name,
                        level: 1,
                        contact: this.formData.user_contact,
                        matric: this.formData.user_matric,
                        uid: this.payload.uid,
                        semester: this.formData.user_semester
                      }
                    )
                    .then(() => {
                      session
                        .run(
                          `
                      MATCH (u:User { uid:$uid }), (s:Subject { uid:$s_uid}), (s2:Session {uid:$s2_uid})
                    CREATE (s2)<-[:STUDENT_OF]-(u)-[:MAJOR_IN]->(s)
                    RETURN u
                    `,
                          {
                            uid: this.payload.uid,
                            s_uid: this.formData.user_subject.uid,
                            s2_uid: this.formData.user_session.uid,
                          }
                        )
                        .then(() => {
                          this.studentEditModal = false;
                          this.fetchStudentInfo();

                          this.$Notification({
                            title: "Success 🎊",
                            text: `User ${this.formData.user_name} has been updated successfully.`,
                          });
                        });
                    });

              })

    },
    proposalSubmitted(ev){
      this.fetchStudentInfo();
    }
  },
};
</script>