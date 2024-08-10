import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPGM6LNTDXDhoT_d5Zt7HDarfxolt-DlE",
  authDomain: "clubcollab-10ac5.firebaseapp.com",
  projectId: "clubcollab-10ac5",
  storageBucket: "clubcollab-10ac5.appspot.com",
  messagingSenderId: "673423053992",
  appId: "1:673423053992:web:cdd3db14aa2859f111de9d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
