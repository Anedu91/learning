

const getData = async (url = "") => {
  return await fetch(url,{    
    mode: 'cors',
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}


export {getData}