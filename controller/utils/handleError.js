const handleError = (err)=>{
  let errors = {

    firstname:"",
    lastname:"",
    email:"",
    password:""

  }

  if(err.message === 'empty fields'){
    errors.firstname = "This field is required"
    errors.lastname = "This field is required"
    errors.email = "This field is required"
    errors.password = "This field is required"
    return errors;
  }

  if(err.message.includes("users validation failed")){
    Object.values(err.errors).forEach(( { properties } )=>{
      errors[properties.path] = properties.message
    })
    return errors
  }

  if(err.message === 'invalid credentials'){
    errors.email = 'invalid email or password'
    errors.password = 'invali email or password'
    return errors
  }

  if(err.message === 'not registered'){
    errors.email = "This email isnt registered"
    return errors
  }

  if(err.message === 'email exists'){
    errors.email = 'This email is taken try  logining in or using a new one'
    return errors
  }

  else{
    return err;
  }

}

module.exports = handleError