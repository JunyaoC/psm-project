<template>
  <div class="homeWrapper">
    <div class="left-pane">
      <div>

      </div>
      <div v-if="$store.state.user">
        <div v-if="$store.state.user.level >= 3">
          <router-link to="/user">
          <it-tooltip placement="right">
            <template v-slot:content>
              <it-tag style="margin-bottom:0.5rem;">Users </it-tag><br>
              <span>Manage Lecturers and Students</span>
            </template>
            <it-button outlined text>
              <it-icon name="person_add" style="font-size: 1.2rem" />
            </it-button>
          </it-tooltip>
        </router-link>
        </div>

        <div v-if="$store.state.user.level == 4">
          <router-link to="/program">
          <it-tooltip placement="right">
            <template v-slot:content>
              <it-tag style="margin-bottom:0.5rem;">Academic Program </it-tag><br>
              <span>Manage Academic Sessions and Subjects</span>
            </template>
            <it-button outlined text>
              <it-icon name="school" style="font-size: 1.2rem" />
            </it-button>
          </it-tooltip>
        </router-link>
        </div>

        <div v-if="$store.state.user.level == 3 || $store.state.user.level == 2">
          <router-link to="/proposal">
          <it-tooltip placement="right">
            <template v-slot:content>
              <it-tag style="margin-bottom:0.5rem;">Proposal</it-tag><br>
              <span>Manage Student Proposals</span>
            </template>
            <it-button outlined text>
              <it-icon name="description" style="font-size: 1.2rem" />
            </it-button>
          </it-tooltip>
        </router-link>
        </div>
      </div>

      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
      >
        

        <it-tooltip placement="right">
          <template v-slot:content>
            <div v-if="$store.state.user">
              <span style="margin-right:0.5rem;">{{$store.state.user.name}}</span>
              <it-tag v-if="$store.state.user.level == 4" type="black" filled>Admin</it-tag>
              <it-tag v-if="$store.state.user.level == 3" type="primary" filled>PSM Lecturer</it-tag>
              <it-tag v-if="$store.state.user.level == 2" type="success" filled>Lecturer</it-tag>
              <it-tag v-if="$store.state.user.level == 1">Student</it-tag>
            </div>
            <span>Email: {{$store.state.user.email}}</span>
          </template>
          <it-avatar :src="avatar" style="margin-bottom: 1rem;: " />
        </it-tooltip>
        <it-button outlined text @click="performLogout()">
          <it-icon name="logout" style="font-size: 1.2rem; color: #ff5454" />
        </it-button>
      </div>
    </div>

    <div
      style="
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <!-- <admin-panel></admin-panel> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import router from "../router";
import endpoint from "@/endpoint.js";


export default {
  name: "Home",
  components: {
    // "admin-panel":Admin
  },
  data() {
    return {
      avatar: `${endpoint.storage}/media/avatar_${this.$store.state.user.uid}.png`,
    };
  },
  mounted() {
    if (this.$route.path === "/") {
      switch (this.$store.state.user.level) {
        case 1:
          router.replace({ path: "/student" });
          break;

        case 2:
        case 3:
          router.replace({ path: "/proposal" });
          break;

        case 4:
          router.replace({ path: "/user" });
          break;
      }
    }
  },
  methods: {
    async performLogout() {
      if (confirm("Are you sure you want to logout?")) {
        // this.$store.commit("removeUser");

        let logoutPromise = new Promise( resolve => {
          
          let state = this.$store.state;
          let newState = {};

          localStorage.removeItem('vuex')

          Object.keys(state).forEach(key => {
            newState[key] = null; // or = initialState[key]
          });

          this.$store.replaceState(newState);

          resolve(true);
        })

        await logoutPromise;

        // router.push({ name: "Login" });
        window.location.replace('/login')
        
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.homeWrapper {
  width: 100%;
  height: 100%;
  // max-width: 100vw;
  // display: flex;
  // justify-content:center;
  // align-items:center;
  background: #fdfdfd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.innerWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  // max-width: 1500px;
  flex-direction: column;
  justify-content: flex-start;
}

.left-pane {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background: white;
}

// .cardContent{
// 	width: 100%;
// 	height: 100%;
// 	background: #e7e7e7;
// 	box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20);
// 	border-radius:1rem;
// 	padding: 1rem;
// }

.it-btn {
  width: 3rem;
  height: 3rem;
}
</style>
