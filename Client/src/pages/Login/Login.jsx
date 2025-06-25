import './login.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Login = () => {
  const navigation = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitButton = document.getElementById('submitButton');
  setTimeout(() => submitButton.classList.remove('preload'), 500);

  const onSubmit = async (data) => {
    try {

      const response = await axios.post(process.env.VITE_API_URL + 'users/login', data)

      Cookies.set('token', response.data.token, { expires: 1, secure: true });
      Cookies.set('id', JSON.stringify(response.data.userId), { expires: 1, secure: true });
      alert('connexion reussie')
      navigation("/")
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("erreur lors de la connexion", error.response ? error.response.data : error.message);

      alert("erreur lors de la connexion veuillez verifier vous informations")
    }
  }
  return (
    <section className='loginSec'>
      <h1 className='loginTitle'>Connexion</h1>
      <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className='loginLabel'>Email:</label>
          <input type="email"
            id='email'
            className='loginInput'
            placeholder='exemple@email.com'
            {...register('email', {
              required: "l'email est obligatoire",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "l'email n'est pas valide"
              }
            })} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <label htmlFor="password" className='loginLabel'> mot de passe:</label>
          <input type="password"
            id='password'
            className='loginInput'
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

          <button id='submitButton' className='loginButton preload' type='submit'>se connecter</button>

      </form>
    </section>
  )
}
export default Login