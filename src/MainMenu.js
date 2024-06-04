import React from "react";

function MainMenu(props) {
    const [name, setName] = React.useState(localStorage.getItem("name") || [])

    function handleChange(event) {
        setName(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    React.useEffect(() => {
        localStorage.setItem("name", name.name)
    }, [name])

    function handleSubmit(event){
        event.preventDefault()
    }

    const handleStartGame = () => {
        props.startGame();
        props.feedPet();
        props.cleanPet();
      };

    return (
        <div className="main-menu">
            <h1 className="title">Enter Your Pets Name</h1>
            <form onSubmit={handleSubmit}>
                <input className="name-input"
                    type="text"
                    placeholder="Nonamé"
                    onChange={handleChange}
                    name="name"
                    value={name.name}
                /><br/>
            <button className="submit-button" onClick={handleStartGame}>Start Game</button>
            </form>

        </div>
    );
}

export default MainMenu;
