
const buttonElement = document.querySelector(".search");
const inputElement = document.querySelector(".inputValue");
const content = document.querySelector(".content");

const key = "0150f230986e887a5efff2e0af9009b0";
const url = "https://api.themoviedb.org/3/search/movie?api_key=";

buttonElement.addEventListener("click", searchMovies); 

function getSearchUrl(){
  const value = inputElement.value;
  const fullUrl = url + key + "&query=" + value;
  return fullUrl;
}

async function getApi(){
  const dataFetch = await fetch(getSearchUrl());
  const data = await dataFetch.json();
  return data;
}

function searchMovies(e){
  e.preventDefault();
  content.innerText = "";
  getMovies();
  clearInput();
}

function clearInput(){
  inputElement.value = "";
}

async function getMovies(){
  const data = await getApi(getSearchUrl);
  generateMovieDetails(data);
  console.log(data);
}


function generateMovieDetails(data){
  
  data.results.forEach(function(movie){
  
  //Generate movie card(container)
  const card = document.createElement("div");
  card.classList.add('card');
  card.classList.add(`${movie.poster_path}`);
  content.appendChild(card);

  //Movie title
  const title = document.createElement("h2");
  title.innerText = movie.title;

  //Movie cover
  const photoUrl = movie.poster_path;
  const img = document.createElement("img");
  img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${photoUrl}`);
  img.setAttribute("alt", `${movie.title}`);
    if (card.classList.contains('null')){
      img.removeAttribute("src");
      img.setAttribute("src", "./no_image.png");
      card.appendChild(title);
      const noImg = document.createElement("div");
      noImg.innerHTML = `<br>No image available :(`;
      card.appendChild(noImg);
    }
  card.appendChild(img);

  img.addEventListener("click", details);

  //Release date
  const date = document.createElement("h3");
  date.innerHTML = `Release date: ${movie.release_date}`;

  //Popularity
  const popularity = document.createElement("h3");
  popularity.innerText = `Popularity: ${movie.popularity}`;

  //Overview
  const overview = document.createElement("p");
  overview.innerText = movie.overview;
  
  //Create details
  

    function details(){
      const frameBackground = document.createElement("div");
      frameBackground.classList.add("f-background");
      const frame = document.createElement("div");
      frame.classList.add("frame");
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("img-div");
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("content-div");
      
      frameBackground.appendChild(frame);
      frame.appendChild(imgDiv);
      frame.appendChild(contentDiv);
    }

  

  // imgDiv.appendChild(img);
  // contentDiv.innerText = title + date + popularity + overview;

  

  //Append cover
  
  
  

  
  })
 
}


