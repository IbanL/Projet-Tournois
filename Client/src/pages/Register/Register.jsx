import './Register.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigation = useNavigate()


  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const onSubmit = async (data) => {
    try {
      console.log("egg");
      
      const response = await axios.post(process.env.VITE_API_URL + 'users/register', data)
      alert('inscription reussie')
      navigation("/login")
    } catch (error) {
      console.error("erreur lors de l'inscription", error.response ? error.response.data : error.message)
      alert("erreur lors de l'inscription veuillez verifier vos informations")
    }
  }



  return (
    <>
      <h1 className='registerTitle'>inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='registerForm'>
          <label htmlFor="name" className='registerLabel'>nom:</label>
          <input type="text"
            id='name'
            className='registerInput'
            placeholder='nom ...'
            {...register('name', {
              required: "le nom est obligatoire",
              minLength: {
                value: 3,
                message: "le nom doit avoir au moins 3 caractères"
              },
              maxLength: {
                value: 200,
                message: "le nom ne doit pas avoir plus de 200 caractères"
              }
            })} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

          <label htmlFor="email" className='registerLabel'>Email:</label>
          <input type="email"
            id='email'
            className='registerInput'
            placeholder='exemple@email.com'
            {...register('email', {
              required: "l'email est obligatoire",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "l'email n'est pas valide"
              }
            })} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <label htmlFor="password" className='registerLabel'> mot de passe:</label>
          <input type="password"
            id='password'
            className='registerInput'
            placeholder='*******'
            {...register('password', {
              required: "le mot de passe est obligatoire",
              minLength: {
                value: 6,
                message: "le mot de passe doit avoir au moins 6 caractères"
              },
              maxLength: {
                value: 200,
                message: "le mot de passe ne doit pas avoir plus de 200 caractères"
              }
            })} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          <label htmlFor="confirmPassword" className='registerLabel'> confirmer le mot de passe:</label>
          <input type="password"
            id='confirmPassword'
            className='registerInput'
            placeholder='*******'
            {...register('confirmPassword', {
              required: "la confirmation du mot de passe est obligatoire",
              validate: val  => {
                if (watch('password') != val) {
                  return "les mot de passes ne correspondent pas";
                }
              },
             })} />
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}

          
          <button type='submit' className='registerButton'>s'inscrire</button>

      </form>
    </>
  )
}

export default Register