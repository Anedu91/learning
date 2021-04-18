
//Get request
const getData = async (url = "") => {
  return await fetch(url,{    
    mode: 'cors',
  })
  .then(response => response.json())
  .catch(error => console.log('Get error: ',error))
}
//Post request
const postData = async ( url = '', data = {})=>{  
    return await fetch(url, {
    method: 'POST', 
    credentials: 'cross-origin',
    headers: {
        'Content-Type': 'application/json',
    },          
    body: JSON.stringify(data), 
   })
    .then(response => response.json())
    .catch(error=> console.log('Post error: ', error))    
  }


export {getData,postData}