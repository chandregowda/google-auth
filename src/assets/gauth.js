import store from "../store";

var googleAuth = (function () {
    let GoogleAuthInstance;
    let isCurrentUserLoggedIn = false;
    let GoogleUser;
    let signInCounter = 0;

    function load(config) {
        installClient().then(function () {
            initClient(config);
        });
    }

    function signIn(successCallback, errorCallback) {
        GoogleAuthInstance.signIn().then(
            function (googleUser) {
                GoogleUser = googleUser;
                store.dispatch('updateIsLoggedIn', true);
                // updateUserProfile();
                successCallback(googleUser);
            },
            function (error) {
                errorCallback(error);
            }
        );
    }

    function getAuthCode(successCallback, errorCallback) {
        console.log("Getting getting auth code");
        // https://developers.google.com/identity/sign-in/web/server-side-flow
        GoogleAuthInstance.grantOfflineAccess({
                prompt: "consent"
            })
            .then(function (resp) {
                console.log("Got auth code ", resp);
                successCallback(resp.code);
            })
            .catch(function (error) {
                errorCallback(error);
            });
    }

    // function getProfileDetails(successCallback, errorCallback) {
    //     console.log("Getting profile details");
    //     let profile = GoogleAuthInstance.getBasicProfile();
    // }

    function signOut(successCallback, errorCallback) {
        if (GoogleAuthInstance) {
            GoogleAuthInstance.signOut().then(
                function () {
                    store.dispatch('updateIsLoggedIn', false);
                    successCallback();
                },
                function (error) {
                    errorCallback(error);
                }
            );
        } else {
            store.dispatch('updateIsLoggedIn', false);
            successCallback();
        }
    }

    function installClient() {
        var apiUrl = "https://apis.google.com/js/platform.js";
        return new Promise(function (resolve) {
            var script = document.createElement("script");
            script.src = apiUrl;
            script.onreadystatechange = script.onload = function () {
                if (!script.readyState || /loaded|compvare/.test(script.readyState)) {
                    setTimeout(function () {
                        resolve();
                    }, 500);
                }
            };
            document.getElementsByTagName("head")[0].appendChild(script);
        });
    }

    function updateUserProfile() {
        GoogleUser = GoogleAuthInstance.currentUser.get();
        // console.log("User Profile:", userProfile);
        store.dispatch('updateUserProfile', GoogleUser);
    }

    function initClient(config) {
        window.gapi.load('auth2', () => {
            // console.log(signInCounter + ": Auth 2 is ready");
            window.gapi.auth2.init(config).then(() => {
                GoogleAuthInstance = window.gapi.auth2.getAuthInstance();
                isCurrentUserLoggedIn = GoogleAuthInstance.isSignedIn.get();
                store.dispatch('updateIsLoggedIn', isCurrentUserLoggedIn);
                updateUserProfile();
            });
        })
    }

    function isSignedIn() {
        // console.log(signInCounter + ": Checking isSignedIn: ", GoogleAuthInstance);
        return new Promise((resolve, reject) => {
            signInCounter++;
            if (signInCounter > 5) {
                resolve(false);
            }
            if (GoogleAuthInstance) {
                console.log("Is signed In?", isCurrentUserLoggedIn);
                store.dispatch('updateIsLoggedIn', isCurrentUserLoggedIn);
                resolve(isCurrentUserLoggedIn);
            } else {
                store.dispatch('updateIsLoggedIn', isCurrentUserLoggedIn);
                reject();
            }
        });
    }

    return {
        load,
        signIn,
        getAuthCode,
        signOut,
        isSignedIn
    };
})();

function installGoogleAuthPlugin(Vue, options) {
    //set config
    var GoogleAuthConfig = null;
    var GoogleAuthDefaultConfig = {}
    // {
    //     scope: "profile email https://www.googleapis.com/auth/plus.login",
    //     discoveryDocs: [
    //         "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
    //     ]
    // };
    if (typeof options === "object") {
        GoogleAuthConfig = Object.assign(GoogleAuthDefaultConfig, options);
        if (!options.clientId) {
            console.warn("clientId is required");
        }
    } else {
        console.warn("invalid option type. Object type accepted only");
    }

    //Install Vue plugin
    Vue.gAuth = googleAuth;
    Object.defineProperties(Vue.prototype, {
        $gAuth: {
            get: function () {
                return Vue.gAuth;
            }
        }
    });
    Vue.gAuth.load(GoogleAuthConfig);
}

export default installGoogleAuthPlugin;