function attachEvents() {
  document.getElementById("submit").addEventListener("click", onSubmit);
  document.getElementById("refresh").addEventListener("click", onRefresh);

  
  async function onSubmit(e) {
    let authorName = document.querySelector('[name="author"]');
    let msgText = document.querySelector('[name="content"]');

    try {
      let response = await fetch("http://localhost:3030/jsonstore/messenger", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
            author:authorName.value.trim(),
            content:msgText.value.trim()
        }),
      });

      if(response.ok == false){
        throw new Error('failed')
      }


    } catch(err) {
        alert(err.message)
    }
  }
    async function onRefresh(e){
        let response = await fetch('http://localhost:3030/jsonstore/messenger')

        if (response.ok == false) {
            throw new Error('failed Get request')
        }
        let data = await response.json()
        let textArea = document.getElementById('messages')
        let comments = []
        Object.values(data).forEach(p => comments.push(`${p.author}: ${p.content}`))
        textArea.value = comments.join('\n')
        
    }
}

attachEvents();
