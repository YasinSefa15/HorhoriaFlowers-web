import React from "react";
import uuidGenerator from "../../utils/uuidGenerator";

export default function StarRatingComponent({rating}) {
    const [stars, setStars] = React.useState([])
    let originalElements = [];
    let starElements = [];

    React.useEffect(() => {
        renderStar(rating)
    }, [])

    const renderStar = (number) => {
        if (number === null) {
            for (let i = 0; i < 5; i++) {
                originalElements.push(
                    <i className="fa-solid fa-star"
                       style={{color: "gray"}}
                       key={uuidGenerator()}
                        //onMouseEnter={() => onHover(5 - unFilledStars + i)}
                        //onMouseLeave={() => setStars(originalElements)}
                    ></i>
                )
            }
            setStars(originalElements)
            return;
        }

        const unFilledStars = 5 - number;

        for (let i = 0; i < number; i++) {
            originalElements.push(
                <i
                    className="fa-solid fa-star"
                    style={{
                        color: "#FFD700"
                    }}
                    key={uuidGenerator()}
                    //onMouseEnter={() => onHover(i)}
                    //onMouseLeave={() => setStars(originalElements)}
                ></i>
            )
        }

        for (let i = 0; i < unFilledStars; i++) {
            originalElements.push(
                <i className="fa-solid fa-star"
                   key={uuidGenerator()}
                    //onMouseEnter={() => onHover(5 - unFilledStars + i)}
                    //onMouseLeave={() => setStars(originalElements)}
                ></i>
            )
        }

        setStars(originalElements)
    }

    const onHover = (index) => {
        let hoverTill = index;
        starElements = [...originalElements];
        for (let i = 0; i < 5; i++) {
            if (i <= hoverTill) {
                starElements[i] = (
                    <i
                        className="fa-solid fa-star"
                        style={{
                            color: "#FFD700"
                        }}
                        key={uuidGenerator()}
                        onMouseEnter={() => onHover(i)}
                        onClick={() => alert("clicked")}
                    ></i>
                )
            } else {
                starElements[i] = (
                    <i className="fa-solid fa-star"
                       onMouseEnter={() => onHover(i)}
                    ></i>
                )
            }
        }
        setStars(starElements)
    }

    return (
        <>
            <div>
                {((() => {
                    return (
                        <>
                            {stars}
                        </>
                    )

                }))()}
            </div>
        </>
    )
}