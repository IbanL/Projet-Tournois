import './CreateTournament.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const CreateTournament = () => {

    const navigation = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
          try {

            const response = await axios.post(process.env.VITE_API_URL + 'tournaments/', data , {
                            headers: {
                                'Authorization': Cookies.get('token')
                                }
                            });
            const id = response.data.id
            const message = response.data.message

            navigation(`/tournament/${id}`)
          } catch (error) {
              console.log(error);
              
          }

    }

    return (
        <div>
            <h1 className='createTournamentTitle'>Créer un tournoi</h1>
            <form className='createTournamentForm' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="tournamentName">Nom du tournoi:</label>
                <input
                    type="text"
                    id="tournamentName"
                    {
                    ...register('name', {
                        required: "le nom est obligatoire",
                        minLength: {
                            value: 3,
                            message: "le nom doit avoir au moins 3 caractères"
                        },
                        maxLength: {
                            value: 200,
                            message: "le nom ne doit pas avoir plus de 200 caractères"
                        }
                    })}
                />
                <label htmlFor="tournamentDate">Date du tournoi:</label>
                <input
                    type="date"
                    id="tournamentDate"
                    {
                    ...register('date', {
                        required: "la date est obligatoire",
                    })}
                />
                <label htmlFor="tournamentLocation">Lieu du tournoi:</label>
                <input
                    type="text"
                    id="tournamentLocation"
                    {
                    ...register('location', {
                        required: "le lieu est obligatoire",
                        minLength: {
                            value: 3,
                            message: "le lieu doit avoir au moins 3 caractères"
                        },
                        maxLength: {
                            value: 200,
                            message: "le lieu ne doit pas avoir plus de 200 caractères"
                        }
                    })}
                />
                <label htmlFor="tournamentNbParticipants">Nombre de participants:</label>
                <select id="tournamentNbParticipants" {...register('nbParticipants')}>
                    <option value="4" selected="selected">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                    <option value="256">256</option>
                </select>

                <label htmlFor="tournamentBracketType">Type de bracket:</label>
                <select id="tournamentBracketType" {...register('bracketType')}>
                    <option value="Single Elimination" selected="selected">Single Elimination</option>
                </select>

                <button type="submit" className='createTournamentButton'>Créer le tournoi</button>

            </form>
        </div>
    )
}

export default CreateTournament