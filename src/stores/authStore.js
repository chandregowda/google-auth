const authModule = {
    state: {
        userProfile: null,
        isLoggedIn: false
    },
    getters: {
        authUserProfile: (state) => state.userProfile,
        authIsLoggedIn: (state) => state.isLoggedIn,
        authGetUserFullname: (state) => {
            if (state.userProfile && state.userProfile.w3) {
                return state.userProfile.w3.ig;
            }
            return "";
        }
    },
    mutations: {
        updateIsLoggedIn: (state, status) => {
            state.isLoggedIn = status;
        },
        updateUserProfile: (state, userProfile) => {
            state.userProfile = userProfile;
        }
    },
    actions: {
        updateUserProfile: ({
            commit
        }, userProfile) => {
            commit('updateUserProfile', userProfile);
        },
        updateIsLoggedIn: ({
            commit
        }, status = false) => {
            // console.log("Updating isLoggedIn : ", status);
            commit('updateIsLoggedIn', status);
        }
    }
}
export default authModule;