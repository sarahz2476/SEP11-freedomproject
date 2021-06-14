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
        let finish = document.createElement('span');
        var li = document.createElement("p");
        
        
        
        li.setAttribute('data-id', doc.id);
        input.textContent = doc.data().input;
        finish.textContent = 'FINISH';
        finish.style.backgroundColor = "lightgreen";
        finish.style.Color = "white";
        
        
        li.appendChild(finish);
        li.appendChild(input);
        
        
        tasklist.appendChild(li);
        
        
        finish.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('tasks').doc(id).delete().then(() => {
                console.log("deleted")
            }).catch((error) => {
                console.log("not deleted")
            });
            window.setTimeout(function () {
            window.location.reload();
            }, 300);

        })
}


document.getElementById("add").addEventListener("click",function(){
    var newTask = document.getElementById("todo").value;
    var newItem = document.createElement("p");
    //var finish = document.createElement ('button');
   // newItem.innerHTML = newTask;
   // document.getElementById('tasks').appendChild(newItem);
     db.collection("tasks").add({
        input: newTask
   });
   db.collection("tasks").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
    window.setTimeout(function () {
            window.location.reload();
            }, 200);
   
})

});

    
