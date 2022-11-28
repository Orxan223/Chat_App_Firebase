import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
    import { getDatabase, ref, set, onValue, get, push,child, remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW7ly9I3X0XFOyBRN439nftXcmDHUXPK4",
  authDomain: "library-fe826.firebaseapp.com",
  databaseURL: "https://library-fe826-default-rtdb.firebaseio.com",
  projectId: "library-fe826",
  storageBucket: "library-fe826.appspot.com",
  messagingSenderId: "523413391986",
  appId: "1:523413391986:web:e92e86e88f57b3e9e450eb",
  measurementId: "G-LHK7G6NZ65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Create
document.querySelector("#submit").addEventListener("click",e =>{
    e.preventDefault()
    const message = document.querySelector("#message").value

    // Give random key
    const newMessage = push(child(ref(db),"messages")).key

    set(ref(db,`/messages/${newMessage}`), message)

    // Input restart
    document.querySelector("#message").value = ""
    
})

// Read
onValue(ref(db,"/messages"),snapshot =>{
    const messages = Object.values(snapshot.val())
    const div = document.querySelector("#messages")
    div.innerHTML = "" // Bu line olmasa , elave olunan elementler her defesinde yeniden elave olunacaq
    for (let message of messages){
        const p = document.createElement("p")
        p.innerHTML = message  
        div.append(p)
    }
})