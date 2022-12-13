
module.exports.userLogin= async function(email,password){
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