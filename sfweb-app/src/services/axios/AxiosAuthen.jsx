import { api } from '../../redux/api/api'

const signIn = async(formData) => {
  try {
    let response = await api.post('/users/login',formData);
    return response;
  } catch (error) {
    console.log("There was an error when signing in.", error)
  } 
}

const signUp = async(username, password, fullname, gender, email) => {
  try {
    let response = await api.post('/users/register', 
                    {
                      username: username,
                      password: password,
                      fullname: fullname,
                      gender: gender,
                      email: email,
                    });
    return response;
  } catch (error) {
    console.log("There was an error when creating account.")
  }
}



export {signIn, signUp}