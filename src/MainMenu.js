import React from "react";

function MainMenu(props) {
    const [name, setName] = React.useState(localStorage.getItem("name") || "");

    function handleChange(event) {
        setName({
            [event.target.name]: event.target.value
        });
    }

    React.useEffect(() => {
        localStorage.setItem("name", name);
    }, [name]);

    function handleSubmit(event) {
        event.preventDefault();
    }

    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    const handleStartGame = () => {
        if (isMobileDevice()) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { // Firefox
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE/Edge
                elem.msRequestFullscreen();
            }
        }

        props.startGame();
        props.feedPet();
        props.cleanPet();
    };

    return (
        <div className="main-menu">
            <h1 className="title">Enter Your Pet's Name</h1>
            <form onSubmit={handleSubmit}>
                <input className="name-input"
                    type="text"
                    placeholder="Nonamé"
                    onChange={handleChange}
                    name="name"
                    value={name.name || ""}
                /><br/>
                <button type="button" className="submit-button" onClick={handleStartGame}>Start Game</button>
            </form>
        </div>
    );
}

export default MainMenu;
