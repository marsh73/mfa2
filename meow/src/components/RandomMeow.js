
import React, { useState, useEffect, useContext } from "react";

export default function RandomMeow({TestContext}) {
  const [randomCatImg, setRandomCatImg] = useState(null);

  const user = useContext(TestContext);
console.log('test', user);

  const fetchRandomCat = () => {
    setRandomCatImg("");
    fetch(`https://aws.random.cat/meow`)
      .then((res) => res.json())
      .then((catInfo) => {
        setRandomCatImg(catInfo.file);
      });
  };

  useEffect(() => {
    if (randomCatImg === null) {
      fetchRandomCat();
    }
  });


  return (
    <div>
      <header>
        <h3>Cat of the day </h3>
        <div>
          <button onClick={() => fetchRandomCat()}>New Cat</button>
        </div>
        {randomCatImg !== "" ? (
          <div>
            <img src={randomCatImg} width="400px" alt="Cat" />
          </div>
        ) : (
          <div>Loading Image</div>
        )}
      </header>
    </div>
  );
}