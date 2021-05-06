<template>
  <div class="page-wrapper">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div style="display: flex; align-items: center">
        <h1 style="margin-right: 2rem">Users</h1>

        <it-button round @click="openForm('create', false)"> add </it-button>
      </div>

      <it-button text> import </it-button>
    </div>

    <it-tabs style="flex: 1">
      <it-tab title="Lecturer" style="padding: 1rem">
        <table style="width: 100%; text-align: left">
          <tr>
            <th>Name</th>
            <th>Domain</th>
            <th>Subject</th>
            <th>E-Mail</th>
            <th style="text-align: left">Action</th>
            <th style="text-align: center">Supervise</th>
          </tr>

          <tr class="dataRow" v-for="lecturer in lecturers" :key="lecturer">
            <td>{{ lecturer.name }}</td>
            <td>{{ lecturer.domain }}</td>
            <td>{{ lecturer.subject.name }}</td>
            <td>{{ lecturer.email }}</td>
            <td>
              <it-button @click="openForm('edit', lecturer)" size="small"
                >edit</it-button
              >
            </td>
            <td>
                <ol>
<li v-for="sv of lecturer.supervise" :key="sv" style="margin-bottom:5px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div>
                    
                    <span style="margin: 0 1rem">{{ sv.student.name }}</span>
                    
                  </div>
                  <it-button v-if="sv.status == 'pending'" size="small" @click="reivewSVRequest(lecturer, sv)" type="primary" >Review Request</it-button >
                  <it-button v-if="sv.status != 'pending'" size="small" @click="reivewSVRequest(lecturer, sv)" >View</it-button >
                  </div>
                </li>    
                </ol>
                          
            </td>
          </tr>
        </table>
      </it-tab>
      <it-tab title="Student" style="padding: 1rem">
        <table style="width: 100%; text-align: left">
          <tr>
            <th>Name</th>
            <th>Matrics No.</th>
            <th>Major</th>
            <th>E-Mail</th>
            <th>Semester</th>
          </tr>

          <tr
            class="dataRow"
            v-for="student in students"
            :key="student"
            @click="openForm('edit', student)"
          >
            <td>{{ student.name }}</td>
            <td>{{ student.matric }}</td>
            <td>{{ student.subject.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.semester}}</td>
          </tr>
        </table>
      </it-tab>
    </it-tabs>
  </div>

  <it-modal v-model="svRequestModal" :closable-mask="false">
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
          <span style="font-size: 2rem; font-weight: 700">{{viewStudent.status == 'pending' ? 'Review Request' : 'Student Info'}}</span>
        </div>

        <it-button type="danger" @click="svRequestModal = false"
          >cancel</it-button
        >
      </div>

      <h3>Student Info</h3>

      <table v-if="viewStudent" style="width: 100%; text-align: left">
        <tr>
          <th>Name</th>
          <td>{{ viewStudent.student.name }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ viewStudent.student.email }}</td>
        </tr>
        <tr>
          <th>Contact</th>
          <td>{{ viewStudent.student.contact }}</td>
        </tr>
      </table>

      <div
        v-if="viewStudent.status == 'pending'"
        style="
          display: flex;
          justify-content: space-around;
          width: 100%;
          align-items: center;
          margin-top: 1rem;
        "
      >
        <it-button type="success" size="small" @click="approveSVRequest(true)"
          >Approve</it-button
        >
        <it-button type="danger" size="small" @click="approveSVRequest(false)"
          >Reject</it-button
        >
      </div>
    </div>
  </it-modal>

  <it-modal v-model="drawerVisible" :closable-mask="false">
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
        <div style="width: 100%" v-if="operation == 'create'">
          <span style="font-size: 2rem; font-weight: 700">New User</span>
        </div>

        <div style="width: 100%" v-if="operation == 'edit'">
          <span style="font-size: 2rem; font-weight: 700">Update User</span>
        </div>

        <it-button type="danger" @click="drawerVisible = false"
          >cancel</it-button
        >
      </div>

      <div style="display: flex; justify-content: space-between; width: 100%">
                <div>
          <p>User Type</p>
          <div
            style="
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            "
          >
            <it-select
              v-model="formData.user_type"
              :options="['Student', 'Lecturer']"
            />
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; width: 100%">


        <div>
          <p>Subject</p>
          <div
            style="
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            "
          >
            <it-select
              v-model="formData.user_subject"
              :options="subjects"
              track-by="name"
            />
          </div>
        </div>

        <div>
          <p v-if="formData.user_type == 'Lecturer'">Domain</p>
          <div
            v-if="formData.user_type == 'Lecturer'"
            style="
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            "
          >
            <it-select
              v-model="formData.user_domain"
              :options="['Research', 'Development']"
            />
          </div>
        </div>

        <div>
          <p v-if="formData.user_type == 'Student'">Session</p>
          <div
            v-if="formData.user_type == 'Student'"
            style="
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            "
          >
            <it-select
              v-model="formData.user_session"
              :options="sessions"
              track-by="name"
            />
          </div>
        </div>

        <div>
          <p v-if="formData.user_type == 'Student'">Semester</p>
          <div
            v-if="formData.user_type == 'Student'"
            style="
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            "
          >
            <it-select
              v-model="formData.user_semester"
              :options="[1,2,3,4,5,6,7,8]"
              track-by="name"
            />
          </div>
        </div>

      </div>
      <div v-if="formData.user_type == 'Lecturer'" style="padding: 1rem 0">
        <it-switch v-model="formData.user_committee" label="PSM Committee" />
      </div>

      <h3>Login Credentials</h3>
      <it-input label-top="Email" v-model="formData.user_email" />
      <it-input
        v-if="operation == 'create'"
        label-top="Password"
        v-model="formData.user_password"
      />
      <it-button
        style="margin-top: 1rem"
        v-if="operation == 'edit'"
        @click="changePassword()"
        >Change Password</it-button
      >
      <h3>User Info</h3>
      <label>Avatar</label>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <it-avatar size="70px" :src="formData.user_avatar_src" />
        <input type="file" @change="selectAvatar" />
      </div>
      <it-input label-top="Name" v-model="formData.user_name" />
      <it-input label-top="Contact" v-model="formData.user_contact" />
      <it-input
        v-if="formData.user_type == 'Student'"
        label-top="Matric Number"
        v-model="formData.user_matric"
      />

      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <it-button
          type="primary"
          v-if="operation == 'create'"
          style="margin-top: 1rem"
          @click="submitForm()"
          >Create</it-button
        >
        <it-button
          type="primary"
          v-if="operation == 'edit'"
          style="margin-top: 1rem"
          @click="submitForm()"
          >Update</it-button
        >
        <it-button
          type="danger"
          v-if="operation == 'edit'"
          style="margin-top: 1rem"
          @click="deleteUser()"
          >Delete</it-button
        >
      </div>
    </div>
  </it-modal>
</template>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 1rem;
}

.dataRow {
  transition: all 0.3s;
}

// .dataRow:hover {
//   background: #d4c1ff;
// }
</style>

<script>
import axios from "axios";
const endpoint = "http://localhost:3000";

import driver from "../neo4j.js";
import { uid } from "uid";
import { sha256 } from "js-sha256";

export default {
  name: "User",
  mounted() {
    this.getAcademicData();
    this.fetchUser();
  },
  data() {
    return {
      view_tab: "Lecturer",
      drawerVisible: false,
      operation: false,
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
      subjects: [],
      sessions: [],
      lecturers: [],
      students: [],
      payload: "",
      svRequestModal: false,
      viewLect: false,
      viewStudent: false,
    };
  },
  methods: {
    async getAcademicData() {
      return new Promise((resolve) => {
        var session1 = driver.session();
        var session2 = driver.session();

        session1.run("MATCH (s:Subject) return s").then((result) => {
          result.records.forEach((data) => {
            this.subjects.push({ ...data.get("s")["properties"] });
          });

          this.formData.user_subject = this.subjects[0];
          session1.close();
        });

        session2.run("MATCH (s:Session) return s").then((result) => {
          result.records.forEach((data) => {
            this.sessions.push({ ...data.get("s")["properties"] });
          });

          console.log(this.sessions);

          this.formData.user_session = this.sessions[this.sessions.length - 1];
          session2.close();
        });
      });
    },

    reivewSVRequest(lect, sv) {
      this.svRequestModal = true;
      this.viewLect = lect;
      this.viewStudent = sv;
    },

    approveSVRequest(decision) {
      switch (decision) {
        case true:
          if (confirm("Approve Request?")) {
            var session1 = driver.session();

            session1
              .run(
                ` 
                  MATCH (lect:User {uid:$lect_uid})<-[r1:REQUEST_SUPERVISE]-(stud:User {uid:$stud_id})
                  CREATE (lect)-[nr1:SUPERVISOR_OF]->(stud)
                  SET nr1=r1
                  WITH r1
                  DELETE r1
                  `,
                {
                  lect_uid: this.viewLect.uid,
                  stud_id: this.viewStudent.student.uid,
                }
              )
              .then((result) => {
                this.svRequestModal = false;

                this.$Notification({
                  title: "Success 🎊",
                  text: `Approved User Supervisor Request`,
                });

                this.fetchUser();

                session1.close();
              });
          }
          break;

        case false:
          if (confirm("Reject Request?")) {
            var session1 = driver.session();

            session1
              .run(
                `
                  MATCH (lect:User {uid:$lect_uid})<-[r1:REQUEST_SUPERVISE]-(stud:User {uid:$stud_id})
                  CREATE (lect)-[nr1:REJECT_SUPERVISE]->(stud)
                  SET nr1=r1
                  WITH r1
                  DELETE r1
              `,
                {
                  lect_uid: this.viewLect.uid,
                  stud_id: this.viewStudent.student.uid,
                }
              )
              .then((result) => {
                this.svRequestModal = false;

                this.$Notification({
                  title: "Completed",
                  text: `Rejected User Supervisor Request`,
                });

                this.fetchUser();

                session1.close();
              });
          }
          break;

          break;
      }
    },

    async fetchUser() {
      var session1 = driver.session();
      var session2 = driver.session();

      session1
        .run(
          "MATCH p = (u:User)-[*1..1]-() where u.level >= 2 AND u.level <=3 RETURN u,p"
        )
        .then((result) => {
          this.lecturers = [];

          let lectMap = new Map();

          result.records.forEach((data) => {
            let path = data.get("p");
            let lectObj;

            if (lectMap.has(path.start.properties.uid)) {
              lectObj = lectMap.get(path.start.properties.uid);
              delete lectObj.password;
            } else {
              lectObj = { ...path.start.properties };
            }

            path.segments.forEach((segment) => {
              if (segment.relationship.type == "REQUEST_SUPERVISE") {
                if (typeof lectObj["supervise"] != "object") {
                  lectObj["supervise"] = [];
                }

                lectObj["supervise"].push({
                  status: "pending",
                  student: segment.end.properties,
                });
              }

              if (segment.relationship.type == "SUPERVISOR_OF") {
                // lectObj["supervise"] = {
                //   status: "approved",
                //   student: segment.end.properties,
                // };

                if (typeof lectObj["supervise"] != "object") {
                  lectObj["supervise"] = [];
                }

                lectObj["supervise"].push({
                  status: "approved",
                  student: segment.end.properties,
                });
              }

              if (segment.relationship.type == "LECTURER_OF") {
                lectObj["subject"] = segment.end.properties;
              }
            });

            lectMap.set(path.start.properties.uid, lectObj);
          });

          lectMap.forEach((val, key) => {
            this.lecturers.push({ ...val });
          });

          session1.close();
        });

      session2
        .run(
          "MATCH (s1:Session)<-[r1:STUDENT_OF]-(u:User)-[r:MAJOR_IN]->(s:Subject) WHERE u.level = 1 return u,s,s1"
        )
        .then((result) => {
          this.students = [];

          result.records.forEach((data) => {
            let user = {
              ...data.get("u")["properties"],
              subject: data.get("s")["properties"],
              session: data.get("s1")["properties"],
            };

            delete user.password;

            this.students.push(user);
          });

          session2.close();
        });
    },

    openForm(_op, payload) {
      this.payload = payload;

      this.operation = _op;
      this.drawerVisible = true;
      console.log(endpoint + "/media/avatar_" + this.payload.uid + ".png");

      switch (_op) {
        case "create":
          /// reset the form

          this.formData = {
            user_type: "Student",
            user_email: "",
            user_name: "",
            user_password: "",
            user_avatar: "",
            user_avatar_src: "",
            user_subject: this.subjects[0],
            user_session: this.sessions[this.sessions.length - 1],
            user_domain: "",
            user_contact: "",
            user_matric: "",
            user_semester: ""
          };

          break;

        case "edit":
          ///

          if (payload.level == 1) {
            this.formData = {
              user_type: "Student",
              user_email: this.payload.email,
              user_name: this.payload.name,
              user_password: this.payload.password,
              user_avatar: "",
              user_avatar_src:
                endpoint + "/media/avatar_" + this.payload.uid + ".png",
              user_subject: this.payload.subject,
              user_domain: "",
              user_contact: this.payload.contact,
              user_matric: this.payload.matric,
              user_session: this.payload.session,
              user_semester: this.payload.semester,
            };
          }

          if (payload.level >= 2) {
            this.formData = {
              user_type: "Lecturer",
              user_email: this.payload.email,
              user_name: this.payload.name,
              user_password: this.payload.password,
              user_avatar: "",
              user_avatar_src: endpoint + "/media/avatar_" + this.payload.uid + ".png",
              user_subject: this.payload.subject,
              user_domain: this.payload.domain,
              user_contact: this.payload.contact,
            };
          }

          break;
      }
    },

    selectAvatar(event) {
      this.formData.user_avatar = event.target.files[0];
      this.formData.user_avatar_src = URL.createObjectURL(
        this.formData.user_avatar
      );

      console.log(this.formData.user_avatar_src);
    },

    async checkUserExist() {
      return new Promise((resolve) => {
        var session = driver.session();

        session
          .run("MATCH (u:User {email:$email}) return count(u) as count", {
            email: this.formData.user_email,
          })
          .then((result) => {
            if (result.records[0].get("count") == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
      });
    },

    changePassword() {
      this.drawerVisible = false;

      let newPass = prompt("Enter New Password");

      var session = driver.session();

      session
        .run("MATCH (u:User {uid:$uid}) SET u.password = $pwd", {
          uid: this.payload.uid,
          pwd: sha256(newPass),
        })
        .then(() => {
          session.close();
        });
    },

    deleteUser() {
      if (confirm("Confirm Delete User? Action is Permanent.")) {
        this.drawerVisible = false;

        var session = driver.session();

        session
          .run("MATCH (u:User {uid:$uid}) DETACH DELETE u", {
            uid: this.payload.uid,
          })
          .then(() => {
            session.close();
            this.fetchUser();
          });
      }
    },

    async submitForm() {
      switch (this.operation) {
        case "create":
          let userUID = uid();

          // let metadataString;

          /// Check if the current user is registered in the DB

          let userExist = await this.checkUserExist();

          if (userExist) {
            this.drawerVisible = false;

            this.$Notification({
              title: "Error ⚠",
              text: `User with email ${this.formData.user_email} exists.`,
            });
            return;
          }

          /// Continue the user creation operation.

          //// UPLOAD AVATAR
          var formData = new FormData();

          var newFile = new File(
            [this.formData.user_avatar],
            "avatar_" + userUID + ".png",
            { type: "image/png" }
          );
          formData.append("avatar", newFile);

          axios
            .post(`${endpoint}/api/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((data) => {
              console.log(data);
            });

          var session = driver.session();

          switch (this.formData.user_type) {
            case "Student":
              this.formData.user_level = 1;

              session
                .run(
                  `CREATE (u:User {
                      email:$email,
                      name:$name,
                      password: $password,
                      level: $level,
                      contact: $contact,
                      matric: $matric,
                      semester: $semester,
                      uid:$uid
                    })
                  `,
                  {
                    email: this.formData.user_email,
                    name: this.formData.user_name,
                    password: sha256(this.formData.user_password),
                    level: this.formData.user_level,
                    contact: this.formData.user_contact,
                    matric: this.formData.user_matric,
                    semester: this.formData.user_semester,
                    uid: userUID,
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
                        uid: userUID,
                        s_uid: this.formData.user_subject.uid,
                        s2_uid: this.formData.user_session.uid,
                      }
                    )
                    .then(() => {
                      delete this.formData.user_password;

                      this.formData = {
                        user_type: "Student",
                        user_email: "",
                        user_name: "",
                        user_password: "",
                        user_avatar: "",
                        user_avatar_src: "",
                        user_subject: this.subjects[0],
                        user_session: this.sessions[this.sessions.length - 1],
                        user_domain: "",
                        user_contact: "",
                        user_matric: "",
                        user_semester: "",
                      };

                      this.drawerVisible = false;
                      this.fetchUser();

                      this.$Notification({
                        title: "Success 🎊",
                        text: `New User ${this.formData.user_name} has been added successfully.`,
                      });
                    });
                });

              return;

              break;

            case "Lecturer":
              let query = "";

              if (this.formData.user_committee) {
                this.formData.user_level = 3;

                query = `
                    MATCH (u:User { uid:$uid }), (s:Subject { uid:$s_uid})
                    CREATE (u)-[:LECTURER_OF]->(s)
                    CREATE (u)-[:COMMITTEE_OF]->(s)
                    RETURN u
                    `;
              } else {
                this.formData.user_level = 2;

                query = `
                    MATCH (u:User { uid:$uid }), (s:Subject { uid:$s_uid})
                    CREATE (u)-[:LECTURER_OF]->(s)
                    RETURN u
                    `;
              }

              session
                .run(
                  `CREATE (u:User {
                      email:$email,
                      password: $password,
                      level: $level,
                      contact: $contact,
                      domain: $domain,
                      uid:$uid,
                      name:$name
                    })
                  `,
                  {
                    email: this.formData.user_email,
                    password: sha256(this.formData.user_password),
                    level: this.formData.user_level,
                    contact: this.formData.user_contact,
                    domain: this.formData.user_domain,
                    uid: userUID,
                    name: this.formData.user_name,
                  }
                )
                .then(() => {
                  session
                    .run(query, {
                      uid: userUID,
                      s_uid: this.formData.user_subject.uid,
                    })
                    .then(() => {
                      delete this.formData.user_password;

                      this.formData = {
                        user_type: "Student",
                        user_email: "",
                        user_name: "",
                        user_password: "",
                        user_avatar: "",
                        user_avatar_src: "",
                        user_subject: this.subjects[0],
                        user_session: this.sessions[this.sessions.length - 1],
                        user_domain: "",
                        user_contact: "",
                        user_matric: "",
                        user_semester:""
                      };

                      this.drawerVisible = false;
                      this.fetchUser();
                      this.$Notification({
                        title: "Success 🎊",
                        text: `New User ${this.formData.user_name} has been added successfully.`,
                      });
                    });
                });

              return;

              break;
          }

          break;

        case "edit":
          if (this.formData.user_avatar) {
            var formData = new FormData();

            var newFile = new File(
              [this.formData.user_avatar],
              "avatar_" + this.payload.uid + ".png",
              { type: "image/png" }
            );

            formData.append("avatar", newFile);

            axios
              .post(`${endpoint}/api/upload`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((data) => {
                console.log(data);
              });
          }

          var session = driver.session();

          switch (this.formData.user_type) {
            case "Student":
              session
                .run(`MATCH (u:User {uid:$uid})-[r]-() DELETE r `, {
                  uid: this.payload.uid,
                })
                .then(() => {
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

                      REMOVE u.domain

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
                          this.drawerVisible = false;
                          this.fetchUser();

                          this.$Notification({
                            title: "Success 🎊",
                            text: `User ${this.formData.user_name} has been updated successfully.`,
                          });
                        });
                    });
                });

              break;

            case "Lecturer":
              let query = "";

              if (this.formData.user_committee) {
                this.formData.user_level = 3;

                query = `
                    MATCH (u:User { uid:$uid }), (s:Subject { uid:$s_uid})
                    CREATE (u)-[:LECTURER_OF]->(s)
                    CREATE (u)-[:COMMITTEE_OF]->(s)
                    RETURN u
                    `;
              } else {
                this.formData.user_level = 2;

                query = `
                    MATCH (u:User { uid:$uid }), (s:Subject { uid:$s_uid})
                    CREATE (u)-[:LECTURER_OF]->(s)
                    RETURN u
                    `;
              }

              session
                .run(`MATCH (u:User {uid:$uid})-[r]-() DELETE r `, {
                  uid: this.payload.uid,
                })
                .then(() => {
                  session
                    .run(
                      `MATCH (u:User {
                      uid:$uid
                    }) SET
                      u.email = $email,
                      u.name = $name,
                      u.level =  $level,
                      u.contact =  $contact,
                      u.domain =  $domain

                      REMOVE u.matric

                      RETURN u
                  `,
                      {
                        email: this.formData.user_email,
                        name: this.formData.user_name,
                        level: this.formData.user_level,
                        contact: this.formData.user_contact,
                        domain: this.formData.user_domain,
                        uid: this.payload.uid,
                      }
                    )
                    .then(() => {
                      session
                        .run(query, {
                          uid: this.payload.uid,
                          s_uid: this.formData.user_subject.uid,
                        })
                        .then(() => {
                          this.drawerVisible = false;
                          this.fetchUser();

                          this.$Notification({
                            title: "Success 🎊",
                            text: `User ${this.formData.user_name} has been updated successfully.`,
                          });
                        });
                    });
                });
              break;
          }

          break;
      }
    },
  },
};
</script>