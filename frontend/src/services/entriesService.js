import api  from "./api";


async function getMyEntries(){
    const response = await api.get('/entries/my-entries')
    return response.data

}


async function createEntry (entryBody){
    await api.post('/entries' , entryBody)
}

export {
    getMyEntries,
    createEntry,
}