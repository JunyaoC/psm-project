<template>
<div class="wrapper">

    <div class="left-pane">
    	<div>
    		<it-button  outlined text>
  				<it-icon name="notifications" style="font-size: 1.2rem;" />
  			</it-button>
    	</div>
    	<div>
    		
    		<router-link to="/user">
	    		<it-button  outlined text>
	  				<it-icon name="person_add" style="font-size: 1.2rem;" />
	  			</it-button>
    		</router-link>

    		<router-link to="/program">
	    		<it-button  outlined text>
  				<it-icon name="school" style="font-size: 1.2rem;" />
  			</it-button>
    		</router-link>


  			


    	</div>
    	

    	<div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
    		<it-avatar style="margin-bottom: 1rem;: "/>
    		<it-button outlined text>
  				<it-icon name="logout" style="font-size: 1.2rem;color: #ff5454;" />
  			</it-button>
    	</div>

    </div>

    <div style="width: 100%;height: 100%;background: #f6f6f6;display: flex;justify-content: center;align-items: center;">
    	<!-- <admin-panel></admin-panel> -->
    	<router-view></router-view>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

import router from '../router'
import blockchain from '../web3.js';

// import Admin from '../components/Admin.vue';


export default {
  name: 'Home',
  components:{
  	// "admin-panel":Admin
  },
  methods:{
  	performLogout(){
  		if(confirm("Are you sure you want to logout?")){

  			this.$store.state.email = "";
			this.$store.state.address = "";
			this.$store.state.key = "";

			blockchain.account = "";
			this.$store.state.level = 0;

			router.push({ name: "Login" });

  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
	
	.wrapper{
		width: 100%;
		height: 100%;
		// max-width: 100vw;
		// display: flex;
		// justify-content:center;
		// align-items:center;
		background: #FDFDFD;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.innerWrapper{
		width: 100%;
		height: 100%;
		display: flex;
		max-width: 1500px;
		flex-direction:column;
		justify-content:flex-start;
	}

	.left-pane{
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

	.it-btn{
		width: 3rem;
		height: 3rem;
	}

</style>
