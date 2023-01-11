const apiKey = '56d5138f8ba249f498b08227c9060961';
const apiUrl = 'https://newsapi.org/v2/top-headlines';
let currentCategory = null;

document.querySelectorAll('#categories button').forEach(button => {
    button.addEventListener('click', event => {
        currentCategory = event.target.dataset.category;
        getNews(currentCategory);
    });
});

document.querySelector('#search-form').addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = document.querySelector('#search-query').value;
    getNews(null, searchQuery);
});

function getNews(category, query) {
    let url = `${apiUrl}?apiKey=${apiKey}&language=en`;
    if (category) {
        url += `&category=${category}`;
    }
    if (query) {
        url += `&q=${query}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#news-container').innerHTML = '';
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                  <a href="${article.url}">
                    <h2>${article.title}</h2>
                  </a>
                  <img onerror="this.style.display='none'" src="${article.urlToImage}" alt="${article.title}">
                  <p>${article.description}</p>
                `;
                document.querySelector('#news-container').appendChild(articleElement);
            });
        })
        .catch(error => {
            console.error(error);
            document.querySelector('#news-container').innerHTML = '<p>Sorry, There was an error fetching the news</p>';
        });
}
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

toggleSwitch.addEventListener('change', switchTheme, false);


function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem('theme', 'dark');
        document.documentElement.style.setProperty('--background-color', '#2a2a2a');
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--button-color', '#ff182a');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
        localStorage.setItem('theme', 'light');
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--button-color', '#21a339');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
