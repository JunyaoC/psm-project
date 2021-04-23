<template>
  <div class="studentWrapper">
    <h1>Welcome Back, {{ $store.state.user.name }}</h1>
    <swiper
      style="padding: 2rem 0"
      :slides-per-view="3"
      :space-between="50"
      :centeredSlides="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      ref="mySwiper"
    >
      <swiper-slide class="slideDiv">

        <div>
          <h4 style="margin: 0; padding: 0;">SMART PSM SYSTEM</h4>
          <h1 style="margin: 0; padding: 0;margin-bottom:1rem;">Getting Started</h1>
          <p>Welcome to the UTM SMART PSM system. Before proceeding to the next step, please review your personal information and update accordingly.</p>
        </div>

        <div style="padding:1rem;width:100%;border-radius:1rem;background:white;">
          <table style="width:100%;text-align:left;">
            <tr>
              <th>Name</th>
              <td>{{$store.state.user.name}}</td>
            </tr>
            <tr>
              <th>Contact Number</th>
              <td>{{$store.state.user.contact}}</td>
            </tr>
            <tr>
              <th>Course</th>
              <td>{{$store.state.user.subject ? $store.state.user.subject.name : ''}}</td>
            </tr>
            <tr>
              <th>Session</th>
              <td>{{$store.state.user.session ? $store.state.user.session.name : ''}}</td>
            </tr>
        </table>

        <it-button style="margin-top:1rem;">Edit Information</it-button>
        </div>

        <div style="padding:1rem;">
          <it-button type="primary" @click="confirmInfo()">Save and Proceed</it-button>
        </div>
        
      </swiper-slide>
      <swiper-slide class="slideDiv">
        <h4 style="margin: 0; padding: 0;">STEP 1</h4>
        <h2 style="margin: 0; padding: 0;margin-bottom:1rem;">Select Preferred Supervisor</h2>

        <p>Select your preferred supervisor from the provided list. Your selection will be reviewed by the PSM committee.</p>

        <div style="display:flex;justify-content:center;width:100%;padding: 2rem 0;">
          <it-avatar size="150px"></it-avatar>
        </div>

        <h3 style="text-align:center;">No Preferred Supervisor Selected</h3>

        <div style="padding:1rem;width:100%;border-radius:15px;background:#f7f7f7;margin-bottom:2rem;">
          <table style="width:100%;text-align:left;">
            <tr>
              <th>Preferred Supervisor</th>
              <td>None</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Pending Selection</td>
            </tr>
            <tr>
              <th>Agreement</th>
              <td>Pending</td>
            </tr>
        </table>
        </div>

        <it-button block @click="selectLecturerModal = true">View and Select</it-button>
        
      </swiper-slide>
      <swiper-slide class="slideDiv">Slide 3</swiper-slide>
    </swiper>
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
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
}

.slideDiv {
  width: 500px;
  height: 80vh;
  max-height: 700px;
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
</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";
import driver from "../neo4j.js";
const endpoint = "http://localhost:3000";

export default {
  name: "Student",
  components: {
    Swiper,
    SwiperSlide,
  },
  async mounted() {

    await this.fetchStudentInfo();
    await this.fetchPreferredSupervisorInfo();
    if(this.$store.state.user.preferred_sv){

    }else{
      this.fetchAllSupervisorInfo()
    }

  },
  data() {
    return {
      swiper: undefined,
      lecturers:[],
      selectLecturerModal:false
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
      // this.swiper.slideTo(1);
    },
    onSlideChange() {
      console.log("slide change");
    },

    confirmInfo(){
      this.swiper.slideNext()
    },

    async fetchStudentInfo(){
      return new Promise( resolve => {
        let session = driver.session();

      session.run('MATCH (sn:Session)<-[st:STUDENT_OF]-(u:User {uid:$uid})-[m:MAJOR_IN]->(s:Subject) return u,sn,s',{uid:this.$store.state.user.uid}).then( result => {
        result.records.forEach((data) => {
          this.$store.state.user.session = {...data.get("sn")['properties']}
          this.$store.state.user.subject = {...data.get("s")['properties']}
        })

        resolve(true)

        session.close();

      })
      })
    },

    fetchPreferredSupervisorInfo(){

      return new Promise(resolve => {
        let session = driver.session();

      // console.log(this.$store.state.user.subject)

      session.run('MATCH (s:User)-[pr:PREFFERS]->(psv:User) RETURN psv',{uid:this.$store.state.user.uid}).then( result => {

        if(result.records.length > 0){
          this.$store.state.user.progress = 2;

          result.records.forEach((data) => {
            this.$store.state.user.preferred_sv = data.get(psv)['properties']
            // console.log(typeof(data.get(psv)) )
            // this.$store.state.user.subject = {...data.get("allLect")['properties']}
            
          })

        }else{
          this.$store.state.user.progress = 1;
        }

        session.close();
        resolve(true);
        
      })
      })

    },

    fetchAllSupervisorInfo(){

      let session = driver.session();

      this.lecturers = []

      // console.log(this.$store.state.user.subject)

      session.run('MATCH (lect:User)-[:LECTURER_OF]->(sub:Subject {uid:$s_uid}) return lect',{uid:this.$store.state.user.uid,s_uid:this.$store.state.user.subject.uid}).then( result => {
        result.records.forEach((data) => {
          // this.$store.state.user.session = {...}
          let lect = {...data.get("lect")['properties']}
          lect.avatar = `${endpoint}/media/avatar_${lect.uid}.png`;
          this.lecturers.push(lect)
          // this.$store.state.user.subject = {...data.get("allLect")['properties']}
          
        })

        console.log(this.lecturers)

        session.close();
      })

    }

  },
  data() {
    return {};
  },
};
</script>