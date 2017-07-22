// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase : {
    apiKey: "AIzaSyCl-IgFf__ogZ_mqShPrHnqfHnsJ0Goc94",
    authDomain: "parkingbookingsystem-777.firebaseapp.com",
    databaseURL: "https://parkingbookingsystem-777.firebaseio.com",
    projectId: "parkingbookingsystem-777",
    storageBucket: "parkingbookingsystem-777.appspot.com",
    messagingSenderId: "640799090570"
  }
};
