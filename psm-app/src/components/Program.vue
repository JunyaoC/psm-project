<template>
	<div class="page-wrapper">

		<div style="display: flex;justify-content: space-between;align-items: center;">
			<div style="display: flex;align-items: center;">
				<h1 style="margin-right: 2rem;">Program</h1>

				
			</div>

			<it-button text>
				import
			</it-button>
		</div>

		<it-tabs style="flex: 1">
			<it-tab title="Academic Session" style="padding: 1rem;">

				<div style="display: flex;justify-content: space-between;align-items: center;">
					<h3>Academic Session</h3>
					<it-button round @click="openForm('academic','create',false)">
						Add Academic Session
					</it-button>
				</div>

				<table style="width: 100%;text-align: left;">
					<tr>
						<th>Academic Session</th>
						<th>No. of Students</th>
						<th>No. of Proposal</th>
						<th style="text-align: center;">Action</th>
					</tr>

					<tr class="dataRow" v-for="session in sessions" :key="session.uid">
						<td>{{session.title}}</td>
						<td>0</td>
						<td>0</td>
						<td style="text-align: center;display: flex;justify-content: space-around;">
							<it-button @click="openForm('academic','edit',session)" size="small">edit</it-button>
							<it-button @click="openForm('academic','delete',session)" size="small">delete</it-button>
						</td>
					</tr>

				</table>

				<it-modal v-model="sessionModal" v-if="operation != 'delete'">
					<template #body>
						<div class="signupmodal">
							<div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
								<h2>{{sessionModalTitle}}</h2>
								<it-button type="danger" @click="sessionModal = false">Cancel</it-button>
							</div>
							<div style="padding: 1rem 0 ;">
								<it-input v-model="sessionInput" labelTop="Title of Academic Session" />
							</div>
							<it-button
							block
							size="big"
							type="primary"
							@click="submitSessionModal()"
							>{{sessionModalButton}}</it-button>

						</div>
					</template>
				</it-modal>

				<it-modal v-model="sessionModal" v-if="operation == 'delete'">
					<template #header>
						<h3>Delete {{modalPayload.title}} ?</h3>
					</template>
					<template #body>
						Academic Year will be deleted permanently, please confirm
					</template>
					<template #actions>
						<it-button @click="sessionModal = false">Cancel</it-button>
						<it-button
						type="danger"
						@click="submitSessionModal()"
						>Delete</it-button
						>
					</template>
				</it-modal>



			</it-tab>
			<it-tab title="Subjects" style="padding: 1rem;">

				

				<div style="display: flex;justify-content: space-between;align-items: center;">
					<h3>Subject</h3>
					<it-button round @click="openForm('subject','create',false)">
						Add Subject
					</it-button>
				</div>

				<table style="width: 100%;text-align: left;">
					<tr>
						<th>Subject</th>
						<th>Code</th>
						<th>Lecturers</th>
						<th>Students</th>
						<th style="text-align: center;">Action</th>
					</tr>

					<tr class="dataRow" v-for="subject in subjects" :key="subject.uid">
						<td>{{subject.name}}</td>
						<td>{{subject.code}}</td>
						<td>0</td>
						<td>0</td>
						<td style="text-align: center;display: flex;justify-content: space-around;">
							<it-button @click="openForm('subject','edit',subject)" size="small">edit</it-button>
							<it-button @click="openForm('subject','delete',subject)" size="small">delete</it-button>
						</td>
					</tr>

				</table>

				<it-modal v-model="subjectModal" v-if="operation != 'delete'">
					<template #body>
						<div class="signupmodal">
							<div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
								<h2>{{subjectModalTitle}}</h2>
								<it-button type="danger" @click="subjectModal = false">Cancel</it-button>
							</div>
							<div style="padding: 1rem 0 ;">
								<it-input v-model="subjectInput.name" labelTop="Subject Name" />

								<it-input v-model="subjectInput.code" labelTop="Subject Code" />

								
							</div>
							<it-button
							block
							size="big"
							type="primary"
							@click="submitSubjectModal()"
							>{{subjectModalButton}}</it-button>

						</div>
					</template>
				</it-modal>

				<it-modal v-model="subjectModal" v-if="operation == 'delete'">
					<template #header>
						<h3>Delete {{modalPayload.name}} ?</h3>
					</template>
					<template #body>
						{{modalPayload.name}} will be deleted permanently, please confirm
					</template>
					<template #actions>
						<it-button @click="subjectModal = false">Cancel</it-button>
						<it-button
						type="danger"
						@click="submitSubjectModal()"
						>Delete</it-button
						>
					</template>
				</it-modal>


<!-- 				<it-drawer v-model="drawerVisible">

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
 -->
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
	import { uid } from 'uid';
	
	export default{
		name:"Program",
		mounted(){
			this.fetchSessions()
			this.fetchSubjects()
		},
		data () {
			return {
				sessions:[],
				subjects:[],
				viewTab:'academic',
				sessionModal:false,
				sessionInput:'',
				sessionModalTitle:"",
				sessionModalButton:"",
				subjectModal:false,
				subjectModalTitle:"",
				subjectModalButton:"",
		  //     view_tab:'Lecturer',
		  //     lecturers:[1,2,3,4,5],
		  //     drawerVisible:false,
		      	operation:false,
		      	modalPayload:false,
		      	addButton:"Academic Year",
		      	subjectInput:{
		      		name:'',
		      		code:''
		      	},
		  //     formData:{
		  //     	user_type:"Student",
				// user_email: "",
				// user_name: "",
				// user_password: "",
		  //     }
		}
	},
	methods:{


		  	openForm(tab,op,payload){

		  		console.log(tab)

		  		this.modalPayload = payload
		  		this.operation = op;
		  		this.viewTab = tab

		  		switch(this.viewTab){

		  			case "academic":

		  				this.sessionModal = true;

		  				switch(this.operation){

		  					
		  					
		  					case "create":
								
								this.sessionModalTitle = "Add Academic Session"
								this.sessionModalButton = "Add"
		  						break;

		  					case "edit":
								this.sessionModalTitle = "Edit Academic Session"
								this.sessionInput = payload.title;
								this.sessionModalButton = "Edit"
								break;

							case "delete":
							///handle by showing different modal
								break;

		  				}

		  				
		  				break

		  			case "subject":

		  				this.subjectModal = true;

		  				switch(this.operation){

		  					case "create":
		  						this.subjectModalTitle = "Add Subject";
		  						this.subjectModalButton = "Add Subject";
		  						console.log(this.subjectModalButton)
		  						break;

		  					case "edit":
								this.subjectModalTitle = "Edit Subject"
								this.subjectInput = {...payload};
								this.subjectModalButton = "Edit"
								break;

		  				}

		  				break;

		  		}
		  	},

		  	fetchSessions(){
		  		var session = driver.session()

				this.sessions = []

				session.run('MATCH (s:Session) return s').subscribe({
					onNext: record => {
						this.sessions.push(record.get('s').properties)
					},
					onCompleted: () => {
						session.close()
					},
					onError: error => {
						console.log(error)
					}
				})

		  	},

		  	fetchSubjects(){
		  		var session = driver.session()
				// session.run('MATCH (s:Session) return s.title').then(result => {

				// 	result.records.forEach( r => {
					
				// 		this.sessions.push(r.get('s.title'))
				// 	})

				// 	console.log(this.sessions)

				// })

				this.subjects = []

				session.run('MATCH (s:Subject) return s').subscribe({
					onNext: record => {
						this.subjects.push(record.get('s').properties)
					},
					onCompleted: () => {
						session.close()
					},
					onError: error => {
						console.log(error)
					}
				})

		  	},

		  	submitSessionModal(){

		  		var session = driver.session()

		  		switch(this.operation){

		  			case "create":

				  		session.run('CREATE (s:Session {title:$title, uid:$uid})',{
				  			title:this.sessionInput,
				  			uid:uid()
				  		}).then(result => {

							this.fetchSessions()
							this.sessionModal=false;
							this.sessionInput = ""
							this.$Notification({
								title: 'Success 🎊',
								text: `Added new academic session ${this.sessionInput}.`
							})

							session.close()

						})
		  				break;

		  			case "edit":
		  				session.run('MATCH (s:Session {uid:$uid}) SET s.title = $input RETURN s',{
				  			uid:this.modalPayload.uid,
				  			input:this.sessionInput
				  		}).then(result => {

							console.log(this.result)
							this.fetchSessions()
							this.sessionModal=false;

							this.$Notification({
								title: 'Success 🎊',
								text: `Added new academic session ${this.sessionInput}.`
							})

							session.close()

						})
		  				break;

		  			case "delete":
		  				session.run('MATCH (s:Session {uid:$uid}) DELETE s',{
				  			uid:this.modalPayload.uid,
				  		}).then(result => {

							console.log(this.result)
							this.fetchSessions()
							this.sessionModal=false;

							this.$Notification({
								title: 'Removed 🗑️',
								text: `Deleted academic session ${this.sessionInput}.`
							})

							session.close()

						})
		  				break;

		  		}


		  	},

		  	submitSubjectModal(){

		  		var session = driver.session()


		  		switch(this.operation){


		  			case "create":
				  		session.run('CREATE (s:Subject {name:$name,code:$code, uid:$uid})',{
				  			name:this.subjectInput.name,
				  			code:this.subjectInput.code,
				  			uid:uid()
				  		}).then(result => {

							this.fetchSubjects()
							

							this.$Notification({
								title: 'Success 🎊',
								text: `Added new subject ${this.subjectInput.name}.`
							})

							this.subjectModal=false;
							this.subjectInput = {
								name:'',
								code:''
							}

							session.close()

						})
		  				break;

		  			case "edit":
		  				session.run('MATCH (s:Subject {uid:$uid}) SET s.name = $name, s.code = $code RETURN s',{
				  			name:this.subjectInput.name,
				  			code:this.subjectInput.code,
				  			uid: this.modalPayload.uid
				  		}).then(result => {

							this.fetchSubjects()


							this.$Notification({
								title: 'Success 🎊',
								text: `Updated Subject ${this.subjectInput.name}.`
							})

							this.subjectModal=false;
							this.subjectInput = {
								name:'',
								code:''
							}

							session.close()

						})
		  				break;

		  			case "delete":
		  				session.run('MATCH (s:Subject {uid:$uid}) DELETE s',{
				  			uid:this.modalPayload.uid,
				  		}).then(result => {

							console.log(this.result)
							this.fetchSubjects()
							this.subjectModal=false;

							this.$Notification({
								title: 'Removed 🗑️',
								text: `Deleted subject ${this.modalPayload.name}.`
							})

							session.close()

						})
		  				break;

		  		}
		  	}
		  	// submitForm(){

		  	// 	switch(this.operation){

		  	// 		case "create":

		  	// 			let metadataString;

		  	// 			if(this.formData.user_type == 'Student') {
		  	// 				this.formData.user_level = 1;
		  	// 				metadataString = `u.matric_no = '${this.formData.user_matric}'`
		  	// 			}

		  	// 			if(this.formData.user_type == 'Lecturer') {
		  	// 				if(this.formData.user_committee){
		  	// 					this.formData.user_level = 2;
		  	// 				}else{
		  	// 					this.formData.user_level = 3;
		  	// 				}

		  	// 				metadataString = `u.domain = '${this.formData.user_domain}'`
		  	// 			}

		  	// 			let _email = this.formData.user_email
		  	// 			let _pwd = this.formData.user_password
		  	// 			let _level = this.formData.user_level

		  	// 			var session = driver.session()

		  	// 			session.run('MATCH (u:User {email:$email}) return count(u) as count', {
		  	// 				email: _email
		  	// 			}).then(result => {

		  	// 				if(result.records[0].get('count') == 0){

		  	// 					session.run(
		  	// 						`MERGE (u:User {email:$email})
		  	// 						ON CREATE
		  	// 						SET u.email = $email, u.password = $password, u.level = $level, u.name = $name, u.contact = $contact, ${metadataString}
		  	// 						`, {
		  	// 							email: this.formData.user_email,
		  	// 							password: this.formData.user_password,
		  	// 							level: this.formData.user_level
		  	// 						}).subscribe({
		  	// 							onNext: record => {
		  	// 								console.log(record)
		  	// 							},
		  	// 							onCompleted: () => {

		  	// 								delete this.formData.user_password;

		  	// 								this.$Notification({
		  	// 									title: 'Success 🎊',
		  	// 									text: `New User ${this.formData.user_name} has been added successfully.`
		  	// 								})

					// 					session.close() // returns a Promise
					// 				},
					// 				onError: error => {
					// 					console.log(error)
					// 				}
					// 			})

		  	// 					}else{
		  	// 						this.drawerVisible = false;

		  	// 						this.$Notification({
		  	// 							title: 'Error ⚠',
		  	// 							text: `User with email ${this.formData.user_email} exists.`
		  	// 						})

		  	// 					}
		  	// 				}).catch(error => {alert(error) })




		  	// 			break;


		  	// 	}

		  	// }


		  }
		}


	</script>