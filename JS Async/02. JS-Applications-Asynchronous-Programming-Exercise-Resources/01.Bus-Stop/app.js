function getInfo() {
    

    let baseURL = `http://localhost:3030/jsonstore/bus/businfo`
    let stopId = document.getElementById('stopId')
    let ulElement = document.getElementById('buses')
    let divElement = document.getElementById('stopName')
    let buttonSubmit = document.getElementById('submit')
    let URL = `${baseURL}/${stopId.value}`



    fetch(URL)
    .then(response => response.json())
    .then(data =>{
        let buses = data.buses
        let text = data.name
        divElement.textContent = text
        ulElement.innerHTML = ''
        
        Object.keys(buses).forEach(bus => {
            let liElement = document.createElement('li')
            liElement.textContent = `Bus ${bus} will arive ${buses[bus]} minutes` 
            ulElement.appendChild(liElement)
            
        })

        console.log(buses);
    })
    .catch(error =>{
        divElement.textContent = 'Error'
        ulElement.innerHTML = ''
    })

}