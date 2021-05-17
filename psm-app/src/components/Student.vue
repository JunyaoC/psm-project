<template>
  <div class="studentWrapper">
    <h1  v-if="!$store.state.user.proposal" >Welcome Back, {{ $store.state.user.name }}</h1>

    <div v-if="!$store.state.user.proposal" class="swipperWrapper">

      <div class="swiperNavDiv">
        <div class="navButton" @click="moveSlide('prev')">
          <it-icon>chevron_left</it-icon>
        </div>
      </div>

      <swiper
        class="swiperElement"
        :slides-per-view="3"
        :space-between="50"
        :centeredSlides="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        ref="mySwiper"
      >
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
            "
          >
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

            <it-button style="margin-top: 1rem">Edit Information</it-button>
          </div>

          <div style="padding: 1rem">
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
          <ProposalSubmit></ProposalSubmit>
        </swiper-slide>
      </swiper>

      <div class="swiperNavDiv">
        <div class="navButton"  @click="moveSlide('next')">
          <it-icon>chevron_right</it-icon>
        </div>
      </div>
    </div>

      <Proposal v-if="$store.state.user.proposal" :proposal_uid="$store.state.user.proposal.uid"></Proposal>

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
</style>

<style lang="scss" scoped>
.studentWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
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

.slideDiv:first-of-type {
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

  .swiperElement {
    padding: 2rem 0;
    height: 100%;
    width: 90%;
  }
}
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";
import driver from "../neo4j.js";
import endpoint from "@/endpoint.js";
import moment from "moment";

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
      availableSupervisor: [],
      // selectLecturerModal: false,
    };
  },
  async mounted() {
    await this.fetchStudentInfo();
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
      this.swiper.slideNext();
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

            result.records.forEach((data) => {
              let path = data.get("p");

              path.segments.forEach((seg) => {
                console.log(seg.relationship.type);

                if (seg.relationship.type == "MAJOR_IN") {
                  this.$store.state.user["subject"] = { ...seg.end.properties };
                }

                if (seg.relationship.type == "STUDENT_OF") {
                  this.$store.state.user["session"] = { ...seg.end.properties };
                }

                if (seg.relationship.type == "REQUEST_SUPERVISE") {
                  if(this.$store.state.user.progress < 1){
                    this.$store.state.user.progress = 1;
                  }
                  this.$store.state.user.supervisor = {
                    ...seg.end.properties,
                    status: "pending",
                  };
                  this.$store.state.user.supervisor.avatar = `${endpoint}/media/avatar_${this.$store.state.user.supervisor.uid}.png`;
                }

                if (seg.relationship.type == "REJECT_SUPERVISE") {
                  
                  if(this.$store.state.user.progress < 1){
                    this.$store.state.user.progress = 1;
                  }

                  this.$store.state.user.supervisor = {
                    ...seg.end.properties,
                    status: "rejected",
                  };
                  this.$store.state.user.supervisor.avatar = `${endpoint.storage}/media/avatar_${this.$store.state.user.supervisor.uid}.png`;
                }

                if (seg.relationship.type == "SUPERVISOR_OF") {
                  
                  if(this.$store.state.user.progress < 2){
                    this.$store.state.user.progress = 2;
                  }

                  this.$store.state.user.supervisor = {
                    ...seg.end.properties,
                    status: "approved",
                  };
                  this.$store.state.user.supervisor.avatar = `${endpoint.storage}/media/avatar_${this.$store.state.user.supervisor.uid}.png`;
                }

                if (seg.relationship.type == "PROPOSAL_OWNER") {

                  if(this.$store.state.user.progress < 3){
                    this.$store.state.user.progress = 3;
                  }

                  this.$store.state.user.proposal = {
                    ...seg.end.properties
                  };
                }


              });
            });

            if (this.$store.state.user.supervisor == undefined) {
              this.$store.state.user.progress = 1;
              this.$store.state.user.supervisor = {
                name: "-",
                status: "-",
              };
            }else{
              delete this.$store.state.user.supervisor.password;
            }

            if(this.$store.state.user.progress < 3){
              this.swiper.slideTo(this.$store.state.user.progress);
              this.swiper.allowTouchMove = false;
            }

            console.log(this.$store.state.user,'gg')


            resolve(true);

            session.close();
          });
      });
    },

    // fetchPreferredSupervisorInfo() {
    //   return new Promise((resolve) => {
    //     let session = driver.session();

    //     // console.log(this.$store.state.user.subject)

    //     session
    //       .run("MATCH (s:User {uid:$uid})-[r]->(lect:User) WHERE lect.level >=2 RETURN type(r),lect", {
    //         uid: this.$store.state.user.uid,
    //       })
    //       .then((result) => {
    //         if (result.records.length > 0) {

    //           result.records.forEach((data) => {

    //             if(data.get("type(r)") == "REQUEST_SUPERVISE"){
    //               this.$store.state.user.progress = 2;

    //               this.$store.state.user.preferred_sv = data.get("lect")[ "properties" ];
    //               this.$store.state.user.preferred_sv.avatar = `${endpoint}/media/avatar_${this.$store.state.user.preferred_sv.uid}.png`;

    //             }

    //             // this.$store.state.agreement = data.get("r")["type"];

    //             // if(this.$store.state.agreement == "ACCEPTED"){
    //             //   this.$store.state.user.progress = 3;
    //             // }

    //             // console.log(data.get("type(r)"))
    //             // this.$store.state.user.subject = {...data.get("allLect")['properties']}
    //           });
    //         } else {
    //           this.$store.state.user.progress = 1;
    //         }

    //         session.close();
    //         resolve(true);
    //       });
    //   });
    // },
  },
  data() {
    return {};
  },
};
</script>