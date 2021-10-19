document.body.innerHTML = `
<div class="user-form">
<input class="add-user-name" placeholder="Enter Your name"/>
<input class="add-user-avatar" placeholder="Enter Your pic url"/>
<button onclick="addUser()">Add User</button>
</div>
<section class="user-list"></section>`;
async function getAllusers(){
    const data = await fetch("https://616b2fb316c3fa0017171614.mockapi.io/users", {method: "GET"});
    const users = await data.json();

    const userContainer = document.querySelector(".user-list");
    userContainer.innerHTML = "" // this will erase the old user list

    users.forEach((user)=>{
        userContainer.innerHTML += `
        <div class="user-container">
        <img class="user-avatar" src="${user.avatar}" alt=${user.name}></img>
        <div>
        <p class="user-name">${user.name}</p>
        <button onclick="toggleUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
        <div class="edit-user-form edit-${user.id}">
        <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter Your name"/>
        <input value="${user.avatar}" class="edit-${user.id}-user-avatar" placeholder="Enter Your pic url"/>
        <button onclick="saveUser(${user.id})">Save</button>

        </div>
        </div>
        </div>
        `;
    });
    console.log(users);
  }
  getAllusers();

  async function deleteUser(userId){
      console.log("Deleting...", userId);
      const data = await fetch("https://616b2fb316c3fa0017171614.mockapi.io/users/" + userId, {method: "DELETE"});
     
      getAllusers(); //this will refresh and give a new list

  }

  async function addUser(){
    console.log("Adding..." );
    const name = document.querySelector(".add-user-name").value;
    const avatar = document.querySelector(".add-user-avatar").value;
    console.log(name,avatar);
    
    // 1. Method - Post
    // 2. Give DATA in the body
    // 3.Stringfy into JSON
    // give Header (what type of date you sending in) JSON DATA
    // header is (headers: { "Content-Type": "application/json"},)
    const data = await fetch(
        "https://616b2fb316c3fa0017171614.mockapi.io/users", 
        {method: "POST",
        headers: { "Content-Type": "application/json"}, 
        body:JSON.stringify({name: name, avatar: avatar})
    });

     // Add user and refresh the user list
     getAllusers();
}

function toggleUser(userId){
    console.log("Editing")
    const editUserForm = document.querySelector(`.edit-${userId}`)
    editUserForm.style.display = editUserForm.style.display === "block" ? "none" : "block"; // to hide the edit

}

async function saveUser(userId){
        console.log("saving...", userId );
        const userName = document.querySelector(`.edit-${userId}-user-name`).value;
        const userAvatar = document.querySelector(`.edit-${userId}-user-avatar`).value;
        console.log(userName, userAvatar);

    const data = await fetch(
        "https://616b2fb316c3fa0017171614.mockapi.io/users/" + userId, 
        {method: "PUT",
        headers: { "Content-Type": "application/json"}, 
        body:JSON.stringify({name: userName, avatar: userAvatar})
    });
    getAllusers();


}
  // C - Create - post
  // R - Read - get
  // U - Update - put/patch
  // D - Delete - delete

  // Delete - deleteUser function fetch Delete when Refreshing

  // Delete - Refresh the user list (old list + new list)

  // delete old list then add new list (success)

  // JSON is a String
  // JS object is an object
  //rest api only understand json data not js object
  // JS object to JSON

