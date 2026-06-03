

const getBoards = async () => {
  try {
    const respApi = await fetch('http://localhost:3000/api/boards', {
      method: 'GET',
      credentials: "include" // To handle cookies (for future features)
    })

    const dataApi = await respApi.json();
    return dataApi;
  } catch (error) {
    console.log('Error fetching boards:', error.message);
  }
}

const createNewBoard = async (VITE_API, boardInformation) => {

  const {boardName, description} = boardInformation
  console.log(boardName, description)

  try {
    const responseApi = await fetch(`${VITE_API}/createBoard`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({boardName, description})
    })

    const respCreation = await responseApi.json();
    return respCreation.confirmation;
  } catch (error) {
    console.log('Ocurrio un error: ', error.message)
    return false
  }
}

export { getBoards, createNewBoard }