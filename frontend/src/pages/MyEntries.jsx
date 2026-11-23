import { useState, useEffect } from "react"
import { getMyEntries } from "../services/entriesService"
import { useAuth } from "../context/AuthContext"

function MyEntries() {
    const [ entries, setEntries ] = useState([])

    const { user } = useAuth()

    console.log(user)
    async function loadEntries(){
        const response = await getMyEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    },[])
  return (
    <div>
        <h1>My Entries</h1>
        {entries.map((oneEntry)=>
        <div key={oneEntry._id}>
            {oneEntry.title}

            <p>My ID: {user._id}</p>
            <p>Owner of this entry ID: {oneEntry.owner}</p>


        </div>)}
    </div>
  )
}

export default MyEntries