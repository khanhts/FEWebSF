import { api } from '../../redux/api/api'

const signIn = (username, password) => {
  return api.post('/users/login', 
    {
      username: username,
      password: password
    });
}

const signUp = (username, password, fullname, gender, email) => {
  return api.post('/users/register', 
    {
      username: username,
      password: password,
      fullname: fullname,
      gender: gender,
      email: email,
    });
}



export {signIn, signUp}