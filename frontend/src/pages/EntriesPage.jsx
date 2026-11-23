import { useState, useEffect } from "react"
import { getMyEntries } from "../services/entriesService"
import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"
function EntriesPage() {
  const {user} = useAuth()
  const [entries, setEntries] = useState([])
    const fetchEntries = async () => {
      try {
        const response = await getMyEntries()
        setEntries(response)
      } catch (err) {
        setError("Unable to load entries")
      }
    }
      useEffect(() => {
    fetchEntries()
  }, [])
  
  return (
    <div>
      <h1>all entries</h1>
      {entries.map((entry) => (
        <div key={entry._id}>
       <p>title : {entry.title}</p>
       <p>{entry.content}</p>
       {entry.owner === user._id ? <>
       <Link to={`/entries/${entry._id}`}>edit entry</Link>
       <button>delete</button>
       </> : null}
       </div>
      ))}
    </div>
  )
}

export default EntriesPage