<template>
	<div class="page-wrapper">

		<div style="display: flex;justify-content: space-between;align-items: center;">
			<div style="display: flex;align-items: center;">
				<h1 style="margin-right: 2rem;">Users</h1>

			<it-button round @click="openForm('create')">
				add
			</it-button>
			</div>

			<it-button text>
				import
			</it-button>
		</div>

		<it-tabs style="flex: 1">
		    <it-tab title="Lecturer" style="padding: 1rem;">

		    	<table style="width: 100%;text-align: left;">
		    		<tr>
		    			<th>Name</th>
		    			<th>Domain</th>
		    			<th>Subject</th>
		    			<th>Address</th>
		    		</tr>

		    		<tr class="dataRow" v-for="lecturer in lecturers" :key="lecturer">
		    			<td>{{lecturer}}</td>
		    			<td>{{lecturer}}</td>
		    			<td>{{lecturer}}</td>
		    			<td>{{lecturer}}</td>
		    		</tr>

		    	</table>
		    	<it-drawer v-model="drawerVisible">

		<div style="padding:1rem;">
			
			<div style="padding:1rem;border-radius: 1rem;background: #f8f8f8;margin-bottom: 1rem;display: flex;justify-content: space-between;align-items: center;">
				<div style="width: 100%;">
					<span style="font-size: 2rem;font-weight: 700;">New User</span>
					<p>a new address will be created for new user</p>
				</div>
				<it-button type="danger" @click="drawerVisible = false">cancel</it-button>
			</div>

			<p>User Type</p>
			<div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
				<it-select v-model="formData.user_type" :options="['Student','Lecturer']"/>
			<it-switch v-if="formData.user_type == 'Lecturer'" v-model="formData.user_committee" label="PSM Committee" />
			</div>

			<h3>Login Credentials</h3>
			<it-input label-top="Email" v-model="formData.user_email"/>
			<it-input label-top="Password" v-model="formData.user_password"/>
			<h3>User Info</h3>
			<it-input label-top="Name" v-model="formData.user_name"/>
			<it-input label-top="Contact" v-model="formData.user_contact"/>
			<it-input v-if="formData.user_type == 'Student'" label-top="Matric Number" v-model="formData.user_matric"/>
			<it-select placement="top" v-if="formData.user_type == 'Lecturer'" label-top="Domain" v-model="formData.user_domain" :options="['Research','Development']"/>

			<it-button type="primary" style="margin-top: 1rem;" @click="submitForm()">Create</it-button>

		</div>


	</it-drawer>

		    </it-tab>
		    <it-tab title="Student" style="padding: 1rem;">
		    	
		    	drghk

		    </it-tab>
		  </it-tabs>



	</div>





</template>

<style lang="scss" scoped>
	
	.page-wrapper{
		width: 100%;
		height: 100%;
		max-width: 1200px;
		padding: 1rem;
	}

	.dataRow{
		transition: all 0.3s;
	}

	.dataRow:hover{
		background: #d4c1ff;
	}



</style>

<script>

	import axios from 'axios'
	const endpoint = "http://localhost:3000"

	import driver from '../neo4j.js'
	
	export default{
		name:"User",
		data () {
	    return {
		      view_tab:'Lecturer',
		      lecturers:[1,2,3,4,5],
		      drawerVisible:false,
		      operation:false,
		      formData:{
		      	user_type:"Student",
				user_email: "",
				user_name: "",
				user_password: "",
		      }
		    }
		  },
		  methods:{

		  	openForm(_op){
		  		this.operation = _op;
		  		this.drawerVisible = true;
		  	},

		  	submitForm(){

		  		switch(this.operation){

		  			case "create":

		  				let metadataString;

		  				if(this.formData.user_type == 'Student') {
		  					this.formData.user_level = 1;
		  					metadataString = `u.matric_no = '${this.formData.user_matric}'`
		  				}

		  				if(this.formData.user_type == 'Lecturer') {
		  					if(this.formData.user_committee){
		  						this.formData.user_level = 2;
		  					}else{
		  						this.formData.user_level = 3;
		  					}

		  					metadataString = `u.domain = '${this.formData.user_domain}'`
		  				}

		  				let _email = this.formData.user_email
		  				let _pwd = this.formData.user_password
		  				let _level = this.formData.user_level

		  				var session = driver.session()

		  				session.run('MATCH (u:User {email:$email}) return count(u) as count', {
		  					email: _email
		  				}).then(result => {

		  					if(result.records[0].get('count') == 0){

		  						session.run(
		  							`MERGE (u:User {email:$email})
		  							ON CREATE
		  							SET u.email = $email, u.password = $password, u.level = $level, u.name = $name, u.contact = $contact, ${metadataString}
		  							`, {
		  								email: this.formData.user_email,
		  								password: this.formData.user_password,
		  								level: this.formData.user_level
		  							}).subscribe({
		  								onNext: record => {
		  									console.log(record)
		  								},
		  								onCompleted: () => {

		  									delete this.formData.user_password;

		  									this.$Notification({
		  										title: 'Success 🎊',
		  										text: `New User ${this.formData.user_name} has been added successfully.`
		  									})

										session.close() // returns a Promise
									},
									onError: error => {
										console.log(error)
									}
								})

		  						}else{
		  							this.drawerVisible = false;

		  							this.$Notification({
		  								title: 'Error ⚠',
		  								text: `User with email ${this.formData.user_email} exists.`
		  							})

		  						}
		  					}).catch(error => {alert(error) })
		  				

		  				

		  				break;


		  		}

		  	}


		  }
	}


</script>