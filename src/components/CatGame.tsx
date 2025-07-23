import { useRef, useState } from "react";
import { shuffle } from "../utils/shufle";

const cards = [1, 2, 3, 4, 5];
const allCards = shuffle([...cards, ...cards]);
const defaultState = { index: null, value: null };

export default function CatGame() {

    const [firstCard, setFirstCard] = useState(defaultState);
    const [secondCard, setSecondCard] = useState(defaultState);
    const [remainingCards, setRemainingCards] = useState(cards);
    const [moves, setMoves] = useState(0);

    const timer = useRef<null | number>(null);

    const clickHandler = (index: any, value: any) => {
        if (timer.current !== null) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            setFirstCard(defaultState);
            setSecondCard(defaultState);
        }, 2000);

        if (firstCard.index === null || (firstCard.index !== null && secondCard.index !== null)) {
            setSecondCard(defaultState);
            setFirstCard({ index, value });
            setMoves((prev) => prev + 1);
        } else if (secondCard.index === null && firstCard.index !== null) {
            setSecondCard({ index, value });
            setMoves((prev) => prev + 1);

            if (firstCard.value === value) {
                setRemainingCards(remainingCards.filter((card) => card !== value));
            }

        }
    }

    return (
        <>
            <div className="header">
                {remainingCards.length > 0 ? (
                    <>
                        <h2>Оставащи котета:</h2>
                        <div className="card-thumbs">
                            {remainingCards.map((card, index) => (
                                <img
                                    key={index}
                                    src={`https://robohash.org/${card}?set=set4`}
                                    alt={`cat ${index}`}
                                    width={60}
                                    height={60}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                   <h2>Победа!</h2>
                )}
            </div>

            <div className="cardsContainer">
                {allCards.map((card, index) => {
                    const isFlipped =
                        firstCard.index === index ||
                        secondCard.index === index ||
                        !remainingCards.includes(card);
                    return (
                        <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => clickHandler(index, card)}>
                            <div className="back"></div>
                            <img src={`https://robohash.org/${card}?set=set4`} alt={`cat ${index}`} />
                        </div>
                    )
                })}
            </div>
            <div className="footer">{`Изполвани ходове: ${moves}`}</div>
        </>

    );
}