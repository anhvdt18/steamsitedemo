// API link:
const API = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/";

let url = "";
let genre = "";
let tag = "";

const search = async () => {
  const searchValue = document.querySelector("#search").value;
  url = API + `games?q=${searchValue}`;
  gameList();
  renderGameList();
};

const gameDetails = (value) => {
  url = API + `single-game/${value}`;
  console.log(url);
  gameList();
  renderSingleGame();
};

document.querySelector("#submit-button").addEventListener("click", () => {
  search();
});

const addGenre = (value) => {
  url = "";
  tag = "";
  genre = value;
  gameList();
  renderGameList();
};

const addTag = (value) => {
  url = "";
  genre = "";
  tag = value;
  gameList();
  renderGameList();
};

// render game list
const gameList = async () => {
  if (url) {
  } else if (!genre && !tag) {
    url = API + "features"; // default 10 games cant not be changed.
  } else if (genre && !tag) {
    url = API + `games?genres=${genre}&limit=20`;
  } else {
    url = API + `games?steamspy_tags=${tag}&limit=20`;
  }
  try {
    const result = await fetch(url);
    const data = await result.json();
    // console.log(data, "gameListHere");
    return data;
  } catch (error) {}
};

const renderSingleGame = async () => {
  const gameData = await gameList();
  const gameResultList = document.querySelector("#game-list");
  gameResultList.innerHTML = "";
  console.log(gameData.data.platforms);
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="single-tag" >
                <div class="single-box">
                <div><img
                class="single-img"
                onclick="gameDetails('${gameData.data.appid}')"
                src=${gameData.data.header_image}
                alt="Game picture"
              /></div>
              <div class="single-description">${gameData.data.description}
              </div></div>
              <span class="single-name">${gameData.data.name}</span>
              <span class="single-price">$ ${gameData.data.price}</span>
              <span class="single-developer">${gameData.data.developer}</span>
            </div>`;
  gameResultList.appendChild(newElement);
  const resultLabel = document.querySelector(".label");
  resultLabel.innerHTML = `${gameData.data.name}`;
};

const renderGameList = async () => {
  try {
    const gameData = await gameList();
    // console.log(gameData, "gameDataHere");
    const gameResultList = document.querySelector("#game-list");
    gameResultList.innerHTML = "";
    gameData.data.forEach((gameInfo) => {
      const newElement = document.createElement("div");
      newElement.innerHTML = `<div class="game-tag" >
              <img
                class="game-img"
                onclick="gameDetails('${gameInfo.appid}')"
                src=${gameInfo.header_image}
                alt="Game picture"
              />
              <span class="game-name">${gameInfo.name}</span>
              <span class="game-developer">${gameInfo.developer}</span>
            </div>`;
      gameResultList.appendChild(newElement);
    });
    const resultLabel = document.querySelector(".label");
    if (!genre && !tag) {
      resultLabel.innerHTML = "Best of The List";
    } else if (genre) {
      resultLabel.innerHTML = `${genre}`;
    } else {
      resultLabel.innerHTML = `${tag}`;
    }
  } catch (error) {}
};

renderGameList();

// Get genres list with limit 20 items.

const genresList = async () => {
  try {
    url = API + "genres?limit=20";
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {}
};

const renderGenresList = async () => {
  try {
    const genresData = await genresList();
    // console.log(genresData, "Genres list here");
    const gameGenresList = document.querySelector("#genre-list");
    gameGenresList.innerHTML = "";
    genresData.data.forEach((gameGenres) => {
      const newElement = document.createElement("span");
      newElement.innerHTML = `<span class="category-btn" onclick="addGenre('${gameGenres.name}')" type="submit">${gameGenres.name}</span>`;
      gameGenresList.appendChild(newElement);
      // console.log(gameGenresList);
    });
  } catch (error) {}
};

renderGenresList();

// Get tag list

const tagList = async () => {
  try {
    let url = API + "steamspy-tags?limit=20";
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {}
};

const renderTagList = async () => {
  try {
    const tagData = await tagList();
    const gameTagList = document.querySelector("#tag-list");
    gameTagList.innerHTML = "";
    tagData.data.forEach((gameTag) => {
      const newElement = document.createElement("span");
      newElement.innerHTML = `<span class="category-btn" onclick="addTag('${gameTag.name}')" type="submit">${gameTag.name}</span>`;
      gameTagList.appendChild(newElement);
    });
  } catch (error) {}
};

renderTagList();
