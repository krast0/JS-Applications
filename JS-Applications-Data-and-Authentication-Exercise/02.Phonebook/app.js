function attachEvents() {
  document.querySelector("#btnLoad").addEventListener("click", onLoad);
  document.querySelector("#btnCreate").addEventListener("click", onCreate);
  document.querySelector("#phonebook").addEventListener("click", remove);

    let phonebook = document.getElementById('phonebook')
    phonebook.addEventListener('click',remove)
  async function onLoad() {

    let response = await fetch("http://localhost:3030/jsonstore/phonebook");
    let data = await response.json()
    let btn = document.createElement('button')
    btn.classList = 'btn'
    phonebook.replaceChildren()
    Object.values(data).forEach(p => {
        let newBtn = document.createElement('button')
        newBtn.textContent = "Delete"
        newBtn.className = 'btn'
        newBtn.setAttribute('id',p._id)
        let liEl = document.createElement('li')
        liEl.textContent = `${p.person}:${p.phone}`
        liEl.appendChild(newBtn)
        phonebook.appendChild(liEl)
    })

    
  }

  async function onCreate() {
    let personInputField = document.querySelector("#person");
    let phoneInputField = document.querySelector("#phone");

    try {

        if (personInputField.value == "" || phoneInputField.value == "") {
            throw new Error("all fields requaired");
          }

      let response = await fetch("http://localhost:3030/jsonstore/phonebook", {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
          person: personInputField.value.trim(),
          phone: phoneInputField.value.trim(),
        }),
      });
      if (response.ok == false) {
        throw new Error("failed to GET data");
      }
onLoad()

    } catch(err) {
        alert(err.message)
    }
  }
async function remove(e){
  
    let currentId = e.target.id
    console.log(currentId.textContent);
    if(e.target.textContent == "Delete"){
        
        await fetch(`http://localhost:3030/jsonstore/phonebook/${currentId}`,{
            method: 'DELETE'
        }).then(res => {
            onLoad()
            return res.json()})
        

    }
  }
}

attachEvents();
