
const buttonElement = document.querySelector(".search");
const inputElement = document.querySelector(".inputValue");
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const section = document.querySelector(".main");

const url = "https://api.themoviedb.org/3/search/movie?api_key=0150f230986e887a5efff2e0af9009b0";

buttonElement.addEventListener("click", clearContent); 
buttonElement.addEventListener("click", getApi); 


function searchLink(){
  let value = inputElement.value;
  if(inputElement.value === ""){
    value = "transformers";
  }
  const fullUrl = url + "&query=" + value;
    return fullUrl;
}

// let movie = [];

async function getApi(){
  const dataFetch = await fetch(searchLink());
  movie = await dataFetch.json();
  movie.results.forEach(function(movie){
    console.log(movie);
    getNewSearch(movie);
    return movie ;
  })
}

function clearContent(e){
  //Prevend default form behaviour
  e.preventDefault();
  //Clear the content on new search
  content.innerHTML = "";
}

function getNewSearch(movie){

   //Generate movie card(container)
   const card = document.createElement("div");
   card.classList.add('card');
   card.classList.add(`${movie.poster_path}`);
   content.appendChild(card);

   //Movie title
  const title = document.createElement("h2");
  title.classList.add("element");
  title.innerText = movie.title;

  //Generate cover img
  const photoUrl = movie.poster_path;
  const img = document.createElement("img");
  img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${photoUrl}`);
  img.setAttribute("alt", `${movie.title}`);
    if (movie.poster_path === null){
      img.removeAttribute("src");
      img.setAttribute("src", "./no_image.png");
      img.classList.add("no-img-border");
      const noImg = document.createElement("div");
      noImg.innerHTML = `<h2>${movie.title}</h2><br><br>No image available :(`;
      card.appendChild(noImg);
    }
  card.appendChild(img);

  //img on click action
  img.addEventListener("click", getDetails);

  //Release date
  const date = document.createElement("h3");
  date.classList.add("release");
  date.innerHTML = `Release date: ${movie.release_date}`;

  //Popularity
  const popularity = document.createElement("h3");
  popularity.innerText = `Popularity: ${movie.popularity}`;
  popularity.classList.add("element");

  //Overview
  const overview = document.createElement("p");
  overview.innerText = movie.overview;
  overview.classList.add("overview");
  

  function getDetails(){
    // getApi(movie);
    content.classList.add("hide");
    section.classList.add("hide");
    const frameBackground = document.createElement("div");
    frameBackground.classList.add("frame-bg");
    const frame = document.createElement("div");
    frame.classList.add("frame");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img-div");
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content-div");
    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = `<i class="fas fa-times"></i>`;
    
    container.appendChild(frameBackground);
    frameBackground.appendChild(imgDiv);
    frameBackground.appendChild(frame);
  
    const photoUrl = movie.poster_path;
    const img2 = document.createElement("img");
    img2.setAttribute("src", `https://image.tmdb.org/t/p/w500/${photoUrl}`);
    img2.setAttribute("alt", `${movie.title}`);
    img2.classList.add(`${movie.poster_path}`);
      if (img2.classList.contains ("null")){
        img2.removeAttribute("src");
        img2.setAttribute("src", "./no_image.png");
        const noImg = document.createElement("div");
        noImg.innerHTML = `<br>No image available :(`; 
        
      }
    imgDiv.appendChild(img2);
  
    frame.appendChild(contentDiv);
    contentDiv.appendChild(closeBtn);
    contentDiv.appendChild(title);
    contentDiv.appendChild(date);
    contentDiv.appendChild(popularity);
    contentDiv.appendChild(overview);
  
    closeBtn.addEventListener("click", hideDetails);
    function hideDetails(){
      container.removeChild(frameBackground);
      content.classList.remove("hide");
      section.classList.remove("hide");
    }
  }

  //Clear the imput field
  inputElement.value = "";
}

getApi();