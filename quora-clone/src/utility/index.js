
export const userLogin= async function(email,password){
    const url = 'http://localhost:8000/login';
    const dataToSubmit = {
      email: email,
      password: password
    }
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit)
    })
    return response;
}

export const userLogout = async ()=>{
  const url = 'http://localhost:8000/logout';
  
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-type": "application/json",
      "accesstoken":localStorage.getItem('access-token')
    }
  })
  return response;
}

export const verifyUserToken = async ()=>{
  const url = 'http://localhost:8000/verifyToken';
  
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-type": "application/json",
      "accesstoken":localStorage.getItem('access-token')
    }
  })
  return response;
}