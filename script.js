const search = e => {
  const url = queryURL();
  console.log(url);

  fetch(
    url
  ).then(
    response => response.json()
  ).then(
    data => setMovieList(data)
  ).catch(
    err => null
  );

  e.preventDefault();
}

const queryString = () => document.getElementById('search-text').value;

const queryURL = () => `http://www.omdbapi.com/?s='${queryString()}'&type=movie&apikey=f0c51e5b`;

const setMovieList = data => {
  let section = document.getElementById('search-results');
  section.innerHTML = "";
  section.appendChild(movieList(data));
};

const movieButton = data => {
  let button = document.createElement('button');
  button.onclick = () => movieCard(data);
  let text = document.createTextNode(`${data.Title} (${data.Year})`);
  button.appendChild(text);
  return button;
};

const movieList = data => {
  let ul = document.createElement('ul');
  data.Search.forEach(result => {
    let li = document.createElement('li');
    li.appendChild(movieButton(result));
    ul.appendChild(li);
  });
  return ul;
};

const image = data => {
  let element = document.createElement('img');
  element.src = data.Poster;
  return element;
};

const itDies = data => {
  let element = document.createElement('h3');
  element.textContent = data.imdbID === "tt0080684" ? "yes" : "no";
  return element;
};

const link = data => {
  let element = document.createElement('a');
  element.href = `https://www.imdb.com/title/${data.imdbID}/`;
  element.textContent = "see on imdb";
  return element;
};

const movieCard = data => {
  console.log(data);
  let card = document.getElementById('movie');
  card.innerHTML = "";

  card.append(itDies(data));
  card.append(link(data));
  card.append(image(data));
};

document.getElementById('search').onsubmit = search;
