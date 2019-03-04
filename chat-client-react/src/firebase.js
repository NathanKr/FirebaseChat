import firebase from "firebase/app";
import "firebase/auth"; // load authentication service
import "firebase/database"; // load real time database service
import "firebase/storage"; // use media file

import { configFirbase } from "./dev";


var config = {
  apiKey: configFirbase.apiKey ,
  authDomain: configFirbase.authDomain,
  databaseURL: configFirbase.databaseURL,
  projectId: configFirbase.projectId,
  storageBucket: configFirbase.storageBucket,
  messagingSenderId: configFirbase.messagingSenderId
};
firebase.initializeApp(config);

export default firebase;
