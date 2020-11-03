class GITHUB{

    constructor(){
    this.id = "68feb1ef28275236892a";
    this.key = "4aa4eb5364fd0a7a53811ef38fbeffc05a0e3c33";
    this.base = "https://api.github.com/users";
    }


fetchUser = async (user)=>{
const userUrl = `${this.base}/${user}?client_id=${this.id}&?client_secret=${this.key}`;
const userData = await fetch(userUrl);
const dataUser = await userData.json();
// console.log(dataUser);

const reposUrl = `${this.base}/${user}/repos?client_id=${this.id}&?client_secret=${this.key}`;
const reposData = await fetch(reposUrl);
const dataRepos = await reposData.json();

return{
dataUser,
dataRepos
}





}



}
//end of github class



//start of class ui stuffs
class UI{


    constructor(){}



//display user
displayUser = (user)=>{
const {name,html_url:link,avatar_url:img,followers,following,public_repos,login} = user;

const div = document.createElement("div")
div.className = "col-10 mx-auto";
div.innerHTML = ` <div class="row">
        <div class="col-10 col-md-5">
<img src="${img}" class="img-fluid" alt="">
<a href="#" class="btn btn-primary my-3 text-white font-weight-bold" data-id="${login}">View repos</a>
        </div>

        <div class="col-10 col-md-7">
            <div class="d-flex justify-content-around">
<button class="btn btn-primary  text-white font-weight-bold">public repo <span class="ml-2">${public_repos}</span></button>
<button class="btn btn-warning  text-white font-weight-bold">following<span class="ml-2">${following}</span></button>
<button class="btn btn-secondary text-white font-weight-bold">followers<span class="ml-2">${followers}</span></button>
            </div>
        

            <div class="user-details my-5">

                <h5 class="text-dark font-weight-bold text-capitalize">${name}</h5>
                <a href="${link}" target="_blank" class="btn btn-success  text-white font-weight-bold"> github link</a>
            </div>
        </div>
    </div>`;

const rw = document.querySelector(".users-row")
rw.appendChild(div);
}
//end of display user




//display repo

displayRepo =(repo)=>{

    const reps =
repo.map((rep)=>{
// const p = document.createElement("p");
// p.innerHTML = `<a href="${rep.html_url}">${rep.name}</a>`;
return `<p><a href="${rep.html_url}">${rep.name}</a></p>`
}).join("");
console.log(reps)
const show = document.querySelector(".repos-row")

show.innerHTML = reps;




}







}


//end of ui stuffs


//start of iife
(()=>{



const getElement =(selector)=>{

if(selector){
const element = document.querySelector(selector);
return element;
}
else{
    console.log("element not selected")
}




}
//end of getelement

const ui = new UI();

const github = new GITHUB();

const form = getElement(".inp-form");

form.addEventListener("submit",(e)=>{
e.preventDefault();
const value = getElement(".inp").value;
//  console.log(value);

github.fetchUser(value).then((data)=>{

// console.log(data)
const realData = data.dataUser;
 console.log(realData)
ui.displayUser(realData)


});


});



const rww = getElement(".users-row")
// console.log(rww)
rww.addEventListener("click",(e)=>{
 console.log(e.target)
 
if(e.target.classList.contains("btn")){

    const user = e.target.dataset.id;
    console.log(user)
github.fetchUser(user).then((data)=>{
 console.log(data.dataRepos);

ui.displayRepo(data.dataRepos)









})

} 





})

















})()

//end of iife

