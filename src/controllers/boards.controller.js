const VITE_API = import.meta.env.VITE_BOARDS_ENDPOINT
import { ioClient } from "./socket";

const getBoards = async () => {
  try {
    const respApi = await fetch(`${VITE_API}`, {
      method: 'GET',
      credentials: "include" // To handle cookies (for future features)
    })

    const dataApi = await respApi.json();

    return dataApi;
  } catch (error) {
    console.log('Error fetching boards:', error.message);
    return false
  }
}

const createNewBoard = async (VITE_API, boardInformation) => {

  const { boardName, description } = boardInformation

  try {
    const responseApi = await fetch(`${VITE_API}/createBoard`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardName, description })
    })

    const respCreation = await responseApi.json();
    return respCreation.confirmation;
  } catch (error) {
    console.log('Error during the process:  ', error.message)
    return false
  }
}

const getFavoritesBoards = async () => {
  try {
    const responseApi = await fetch(`${VITE_API}/favorites`, {
      method: "GET",
      credentials: "include"
    })
    const dataApi = await responseApi.json();
    if (!dataApi.confirmation) return false
    return dataApi
  } catch (error) {
    console.log('Error during the process:  ', error.message)
  }
}

const getBoardContent = async (boardName) => {
  try {
    const responseApi = await fetch(`${VITE_API}/board/${boardName}`, {
      method: "GET",
      credentials: "include"
    })
    const dataApi = await responseApi.json();
    if (!dataApi.confirmation) return false
    return dataApi.boardInformation
  } catch (error) {
    console.log('Error during the process:  ', error.message)
  }
}

const checkFavorite = async (boardId) => {
  try {
    const responseApi = await fetch(`${VITE_API}/checkFavorite/${boardId}`, {
      method: "GET",
      credentials: "include"
    })

    const dataApi = await responseApi.json();
    if (!dataApi.confirmation) return false
    return dataApi.isFavorite

  } catch (error) {
    console.log('Error during the process:  ', error.message)
  }
}

const createNewColumn = async (columnName) => {
  try {
    const responseApi = await fetch(`${VITE_API}/createColumn`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ columnName })
    })

    const dataApi = await responseApi.json();
    console.log(dataApi)
    if (!dataApi.confirmation) return false
    return dataApi.content
  } catch (error) {
    console.log('Error during the process:  ', error.message)
    console.log(error.message)
  }
}

const addFavorite = async (boardId) => {
  ioClient.emit("addFavorite", boardId)
}

const removeFavorite = async (boardId) => {
  ioClient.emit("removeFavorite", boardId)
}

const changeColumnName = (columnInformation) => {
  ioClient.emit("changeColumnName", columnInformation)
}

const removeColumn = (columnId) => {
  ioClient.emit('deleteColumn', columnId)
}

export {
  getBoards, createNewBoard, getFavoritesBoards,
  getBoardContent, addFavorite, removeFavorite,
  checkFavorite, createNewColumn, changeColumnName, removeColumn
}