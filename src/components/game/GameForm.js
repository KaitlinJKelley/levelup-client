import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        name: "",
        maker: "",
        gameTypeId: 0
    })

    const {gameId} = useParams()
    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
        if (gameId) {
            getGameById(gameId)
            .then(game => {
                let gameToEdit = {...currentGame}

                gameToEdit.id = game.id
                gameToEdit.skillLevel = game.skill_level
                gameToEdit.numberOfPlayers = game.num_of_players
                gameToEdit.name = game.name
                gameToEdit.maker = game.maker
                gameToEdit.gameTypeId = game.gametype.id

                setCurrentGame(gameToEdit)
            })
        }
    }, [])

    const handleInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Gamer Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <label>Difficulty(1 is Very Easy and 5 is Very Difficult):</label>
            <select name="skillLevel" value={`${currentGame.skillLevel}`} onChange={handleInputChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <select name="gameTypeId" value={`${currentGame.gameTypeId}`} onChange={handleInputChange}>
                <option value="0">Select a game type</option>
                {gameTypes.map(gt => <option key={`${gt.id}`} value={`${gt.id}`}>{`${gt.name}`}</option>)}
            </select>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // Send POST request to your API
                    {gameId ? updateGame(currentGame)
                        .then(() => history.push("/games")) :
                        createGame(currentGame)
                        .then(() => history.push("/games"))
                    }
                    
                }}
                className="btn btn-primary">{gameId ? "Save" : "Create"}</button>
        </form>
    )
}