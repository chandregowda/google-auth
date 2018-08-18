<template>

    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
            <!-- <button class="g-signin2"></button> -->
            <span v-if="authGetUserFullname">Welcome, {{authGetUserFullname}}</span>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <!-- <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav> -->

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <!-- <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->

                <!-- <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown> -->

                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" v-if="!authIsLoggedIn" @click="login">Login</b-dropdown-item>
                    <b-dropdown-item href="#" v-if="authIsLoggedIn" @click="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  mounted() {
    this.updateLoginStatus();
  },
  computed: {
    ...mapGetters(["authIsLoggedIn", "authGetUserFullname"])
  },
  methods: {
    ...mapActions(["updateUserProfile", "updateIsLoggedIn"]),
    updateLoginStatus(userProfile = null) {
      this.$gAuth
        .isSignedIn()
        .then(isSignedIn => {
          //   console.log("Checking for Google Auth: ", isSignedIn);
          this.updateUserProfile(userProfile);
        })
        .catch(e => {
          if (e) {
            console.log("Some Rejection", e);
          }
        });
    },
    login() {
      this.$gAuth.signIn(
        userProfile => {
          this.updateUserProfile(userProfile);
        },
        e => {
          console.log("Failed Login", e);
        }
      );
    },
    logout() {
      this.$gAuth.signOut(
        () => {
          //   console.log("Successfully logged out from Google");
          this.updateUserProfile(null);
        },
        e => {
          console.log("Failed to logout from Google", e);
        }
      );
    }
  }
};
</script>
