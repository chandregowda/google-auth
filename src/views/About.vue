<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getAuthCode">Get Auth Code</button>
    <button @click="login" v-if="!isSignedIn">Login</button>
    <button @click="logout" v-if="isSignedIn">Logout</button>
  </div>
</template>
<script>
/* eslint-disable no-console */
import axios from "axios";

export default {
  data() {
    return {
      isSignedIn: null
    };
  },
  created() {
    this.isSignedIn = this.$gAuth ? this.$gAuth.isSignedIn() : null;
  },
  methods: {
    logout() {
      this.$gAuth.signOut(
        () => {
          console.log("Successfully logged out from Google");
          this.isSignedIn = this.$gAuth ? this.$gAuth.isSignedIn() : null;
        },
        e => {
          console.log("Failed to logout from Google", e);
        }
      );
    },
    login() {
      this.$gAuth.signIn(
        userProfile => {
          // console.log("Logged In User:", userProfile);
          this.isSignedIn = this.$gAuth ? this.$gAuth.isSignedIn() : null;
        },
        e => {
          console.log("Failed Login", e);
        }
      );
    },
    getAuthCode() {
      console.log("Google Login initiating");
      //developers.google.com/identity/sign-in/web/server-side-flow
      // The user clicks the sign-in button and grants your app access to the permissions that you requested. Then, the callback function that you specified in the grantOfflineAccess().then() method is passed a JSON object with an authorization code. For example:

      // {"code":"4/yU4cQZTMnnMtetyFcIWNItG32eKxxxgXXX-Z4yyJJJo.4qHskT-UtugceFc0ZRONyF4z7U4UmAI"}
      // Step 6: Send the authorization code to the server

      https: this.$gAuth.getAuthCode(
        function(authorizationCode) {
          console.log("Google Authorized: ", authorizationCode);
          //on success
          axios
            .post("http://your-backend-server.com/auth/google", {
              code: authorizationCode,
              redirect_uri: "postmessage"
            })
            .then(function(response) {
              /* eslint-disable no-console */
              console.log("My Node response", response);
            });
        },
        function(error) {
          console.log("Google Auth Failed", error);
          //on fail do something
        }
      );
    }
  }
};
</script>

