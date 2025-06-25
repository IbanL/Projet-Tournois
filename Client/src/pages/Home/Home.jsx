import axios from 'axios'
import './home.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [tournaments10, setTournaments10] = useState([])

  const fetchTournaments = async () => {

    setLoading(true);

    try {
      const response = await axios.get(process.env.VITE_API_URL + 'tournaments/10')

      if (!response) {
        throw new Error("No response from server");
      }

      setTournaments10(response.data.tournaments)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchTournaments();

  }, []);

  return (
    <div>
      <section className="hero">
        <h1 className='heroTitle'>Le site de gestion de tournois</h1>
        <Link to="/tournament/create" className='heroLink'>
        <button className='heroButton'>Créer un tournois</button>
        </Link>
      </section>

      <section className='secTournaments'>
        <h2 className='secTournamentsTitle'>Derniers tournois</h2>
        {
          tournaments10 ? (
            tournaments10.map(tournament => (
              <Link to={`/tournament/${tournament._id}`} key={tournament._id} className='tournamentsLink'>
                <div className='tournamentsCard'><h3 className='tournamentsName'>{tournament.name}</h3>
                  <p className='tournamentsDate'>{tournament.date.slice(0, 10)}</p>
                  <p className='tournamentsLocation'>{tournament.location}</p>
                  <p className='tournamentsPlayers'>{tournament.nbInscrits}/{tournament.nbParticipants}</p>
                </div>
              </Link>
            ))) : (
            <p>Chargement...</p>
          )
        }
      </section>
    </div>
  )
}

export default Home