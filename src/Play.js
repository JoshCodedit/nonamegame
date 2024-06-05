import React, { useState, useRef, useEffect } from 'react';
import CardComponent from './CardComponent';
import { useNavigate } from 'react-router-dom';

export default function Play() {
    const navigate = useNavigate();
    const cardImages = [
        { value: 1, image: './images/chicken-leg.png', isFlipped: false, id: 1 },
        { value: 2, image: './images/bath.png', isFlipped: false, id: 2 },
        { value: 3, image: './images/joystick.png', isFlipped: false, id: 3 },
        { value: 4, image: './images/noname-angry.png', isFlipped: false, id: 4 },
        { value: 5, image: './images/noname-happy.png', isFlipped: false, id: 5 },
        { value: 6, image: './images/toxic.png', isFlipped: false, id: 6 },
        { value: 1, image: './images/chicken-leg.png', isFlipped: false, id: 7 },
        { value: 2, image: './images/bath.png', isFlipped: false, id: 8 },
        { value: 3, image: './images/joystick.png', isFlipped: false, id: 9 },
        { value: 4, image: './images/noname-angry.png', isFlipped: false, id: 10 },
        { value: 5, image: './images/noname-happy.png', isFlipped: false, id: 11 },
        { value: 6, image: './images/toxic.png', isFlipped: false, id: 12 }
    ];

    const shuffledCards = cardImages.sort(() => 0.5 - Math.random());
    const [cards, setCards] = useState(shuffledCards);
    const [matchedCards, setMatchedCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [gameWon, setGameWon] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const timeout = useRef(null);
    const [moves, setMoves] = useState({ count: 1 });

    useEffect(() => {
        // Update isFullScreen state based on full screen status
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstIndex, secondIndex] = flippedCards;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];

            if (firstCard.value === secondCard.value) {
                setMatchedCards(prev => [...prev, firstCard.value]);
                setFlippedCards([]);
            } else {
                timeout.current = setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.id === firstCard.id || card.id === secondCard.id
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                    setFlippedCards([]);
                }, 1000);
            }
        }

        if (matchedCards.length === cardImages.length / 2) {
            setGameWon(true);
        }

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [flippedCards, cards, matchedCards.length, cardImages.length]);

    function flipCard(id) {
        if (flippedCards.length < 2) {
            const cardIndex = cards.findIndex(card => card.id === id);
            if (!cards[cardIndex].isFlipped) {
                setCards(prevCards =>
                    prevCards.map((card, index) =>
                        index === cardIndex ? { ...card, isFlipped: true } : card
                    )
                );
                setFlippedCards(prev => [...prev, cardIndex]);
                setMoves(prev => ({ ...prev, count: prev.count + 1 }));
                console.log(moves)
            }
        }
    }

    const show = !gameWon ? { display: '' } : { display: 'none' };

    const theCards = cards.map(card => (
        <CardComponent
            key={card.id}
            image={card.image}
            isFlipped={card.isFlipped}
            flipCard={() => flipCard(card.id)}
            show={show}
        />
    ));

    const enterFullScreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        setIsFullScreen(true);
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setIsFullScreen(false);
    };

    return (
        <div className="game">
          <div className="card-container">
            {theCards}
          </div>
          {gameWon && (
            <div className="game-won">
              You've matched all the cards!
              <br/>
              <span className='score'>Your Score:</span>
              <br/>{moves.count}<br/>
              <button className='back-button' onClick={() => navigate('/')}>Go Back</button>
            </div>
          )}
          {isFullScreen && (
            <button className="exit-fullscreen" onClick={exitFullScreen}>Exit Full Screen</button>
          )}
          
        </div>
      );
}
