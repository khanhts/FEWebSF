import { api } from '../../redux/api/api'

const signIn = async(formData) => {
  try {
    let response = await api.post('/users/login',formData);
    if(response&&response.data.code>=200&&response.data.code<=300)
      return {isError: false, data: response.data.data};
    return {isError: true, message: response.data.message};
  } catch (error) {
    return {isError: true, message: error.toString()};
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

const forgotPassword = async(email) => {
  try {
    const response = await api.post(`/forgot-password/request?email=${email}`)
    console.log("Reset pass request response: ", response);
  } catch (error) {
    console.log("Error! ",error);
  }
}

const resetPassword = async(formData) => {
  try {
    const response = await api.post("/forgot-password/change",formData)
    console.log("Reset response: ", response)
    if(response.data.code>=200&&response.data.code<=300)
      return {isError: false, message: response.data.message}
    else
    return {isError: true, message: response.data.message}
  } catch (error) {
    console.log("Error! ",error);
  }
}


export {signIn, signUp, forgotPassword, resetPassword}