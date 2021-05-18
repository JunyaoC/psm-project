<template>
  <div style="width: 100%">
    <h4 style="margin: 0; padding: 0">STEP 3</h4>
    <h2 style="margin: 0; padding: 0; margin-bottom: 1rem">
      Proposal Submission
    </h2>

    <div v-if="student_proposal" style="width: 100%; margin-top: 2rem">
      <it-input
        label-top="Proposal Title"
        v-model="student_proposal.title"
      ></it-input>

      <it-select
        label-top="Project Type"
        :options="[
          { name: 'Research', key: 'research' },
          { name: 'Development', key: 'development' },
        ]"
        track-by="key"
        v-model="student_proposal.type"
      ></it-select>
      
      <div style="margin-top:1rem;">
        <div style="width:100%;display:flex;justify-content:space-between;align-items:center;">
          <label class="it-input-label">Proposal Form</label>
        <it-button size="small" style="font-size:10px;" @click="downloadForm()">Download Form</it-button>
        </div>
        <input @change="selectForm" type="file">
        
      </div>

      <div style="margin-top:1rem;">
        <span style="font-size:14px;color:#232323;">Additional Files</span><br>
        <span style="font-size:0.8rem;">You can attach additional supporting document here if needed.</span><br>
        <input @change="selectAttachment" type="file" multiple >
      </div>

      <div style="padding:1rem 0;">
        <it-button type="primary" @click="submitProposal()" :disabled="!student_proposal.form_file || !student_proposal.type || !student_proposal.title">Submit</it-button>
      </div>
      

    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>

  import endpoint from "@/endpoint.js";
  import driver from "../neo4j.js";
  import { uid } from "uid";
  import axios from 'axios';

  export default {
    name: "ProposalSubmit",
    emits: ['submitProposal'],
    data(){
      return {
        student_proposal: {
          title:"",
          type:'',
          form_file: undefined,
          attachments:[]
        }
      }
    },
    methods:{
      downloadForm(){
        window.open(`${endpoint.storage}/media/form/form.doc`,'_blank')
      },

      selectForm(event){
        this.student_proposal.form_file = event.target.files[0];
        console.log(this.student_proposal.form_file)
      },

      selectAttachment(event){

        this.student_proposal.attachments = [];

        for(let _file of event.target.files){
          
          // let ext = _file.name.slice((_file.name.lastIndexOf(".") - 1 >>> 0) + 2);
          // let fuid = uid();
          this.student_proposal.attachments.push({
            file: _file,
            filename: "att_" + _file.name,
          })
        }

        console.log(this.student_proposal.attachments)

      },

      submitProposal(){

        console.log(this.student_proposal.type)

        let proposalUID = uid();

        var formData = new FormData();

        formData.append("proposal_uid", proposalUID);

        if(this.student_proposal.form_file){
          var newFile = new File(
            [this.student_proposal.form_file],
            "form_" + this.student_proposal.form_file.name,
          );

          formData.append("proposal_file", newFile);
        }else{
          alert("Please attach Proposal Form");
          return;
        }

          for(let _file of this.student_proposal.attachments){
            var newFile = new File(
              [_file.file],
              _file.filename,
            );

            formData.append("proposal_file", newFile);
          }

          axios
            .post(`${endpoint.storage}/api/proposal_upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((data) => {
              console.log(data);
            });


        var session1 = driver.session();
        
        session1.run(`
          MATCH (student:User {uid:$stu_uid}),(supervisor:User {uid:$sup_uid}), (subject:Subject {uid:$sub_uid})
          CREATE (p:Proposal {uid:$p_uid, title:$p_title, type:$p_type, status: $p_status})
          CREATE (student)-[:PROPOSAL_OWNER]->(p)
          CREATE (supervisor)-[:SUPERVISES]->(p)
          CREATE (subject)-[:PROPOSAL_SUBJECT]->(p)
        `,{
          stu_uid:this.$store.state.user.uid,
          sup_uid:this.$store.state.user.supervisor.uid,
          sub_uid:this.$store.state.user.subject.uid,
          p_uid: proposalUID,
          p_title:this.student_proposal.title,
          p_type:this.student_proposal.type.key,
          p_status: 1
        }).then((result) => {
          
          this.$Notification({
            title: "Proposal Submitted",
            text: `The proposal has been submitted!`,
          });
          this.$emit('submitProposal',true)

          session1.close();
        });

      },
    }
  };
</script>