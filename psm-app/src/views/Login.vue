<template>

  <div class="wrapper">
    <div class="loginDiv">
        
      <div class="content">
        <div style="width: 100%;height: 100%;text-align: left;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
          <img style="height: 120px;width: 120px;object-fit: contain;" src="../assets/utm.png">
          <div style="width: 100%;text-align: center;">
            <span style="font-weight: 700;font-size: 1.5rem;color: #afafaf;position: relative;z-index: 10;">login</span><br>
            <span style="font-size: 2rem;font-weight: 700;color: #595959;position: relative;z-index: 10;">UTM Smart PSM</span>
          </div>			

          <div style="width: 100%;border-radius: 10px;padding: 1rem;">
            <div>
              <it-input v-model="emailInput" placeholder="Email" suffix-icon="mail"  />
            </div>
            <div style="margin-top: 1rem;">
              <it-input v-model="passwordInput" placeholder="Password" suffix-icon="lock" type="password" />
            </div>
          </div>

          <it-button v-if="showLogin" block size="big" @click="performLogin()">Login</it-button>
          <it-button v-if="!showLogin" block size="big" loading>Login</it-button>

          <div>
            <a href="">couldn't login?</a>
          </div>

        </div>
      </div>
      </div>
  </div>

</template>

<script>

import router from '../router'
  import driver from '../neo4j.js'
  import { sha256 } from 'js-sha256';
  
  export default {
    name: 'Login',
    data () {
      return {
        showLogin:true,
        emailInput:"",
        passwordInput:""
      }
    },
    methods:{
      performLogin(){
        this.showLogin = false
        
        var session = driver.session()

        session.run(`MATCH (u:User {email:$email}) return u`, {
          email: this.emailInput
        }).subscribe({
          onNext: record => {
            let data = record.get('u')['properties']

            if(sha256(this.passwordInput) == data.password){
              delete data.password
              // this.$store.state.user = {...data};
              this.$store.commit('setUser',data);

              this.showLogin = false;
              router.push({ name: "Home" });
            }else{
              this.showLogin = true;
              alert("Login Failed. Please check your Email or Password.")
            }
          },
          onCompleted: () => {
          console.log('close')
          session.close() // returns a Promise
          },
          onError: error => {
            console.log(error)
          }
        })
      }
    }
  }


</script>

<style scoped lang="scss">

  @mixin aspect-ratio($width, $height) {
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: ($height / $width) * 100%;
    }
    > .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      padding: 2rem;
      overflow: hidden;
    }
  }
  
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f3ea;
  }

  .loginDiv{
    @include aspect-ratio(3, 4);
    width: 450px;
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20);
  }


</style>