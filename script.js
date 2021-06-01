// Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAenz8IZhW_sb8kXJXtXhwATMcgN5pbNJw",
        authDomain: "freedom-project-sep11.firebaseapp.com",
        projectId: "freedom-project-sep11",
        storageBucket: "freedom-project-sep11.appspot.com",
        messagingSenderId: "954182058356",
        appId: "1:954182058356:web:5d61bb6dbdecabd4746c21"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();  
    db.settings({timestampsInSnapshot:true});
 
const tasklist = document.querySelector('#tasks');
    db.collection("tasks").get().then((snapshot) => { snapshot.docs.forEach(doc => {
        renderTask(doc);
    })
    function renderTask(doc){
        let input = document.createElement('span');
        var li = document.createElement("p");
        
        li.setAttribute('data-id', doc.id);
        input.textContent = doc.data().input;
        
        li.appendChild(input);
        
        tasklist.appendChild(li);
}
    
    })


document.getElementById("add").addEventListener("click",function(){
    var newTask = document.getElementById("todo").value;
    var newItem = document.createElement("p");
    newItem.innerHTML = newTask;
    document.getElementById('tasks').appendChild(newItem);
     db.collection("tasks").add({
        input: newTask
   });
   db.collection("tasks").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
});

    
