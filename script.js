const APIURL = 'https://api.github.com/users/octocat/repos'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')



async function getUser(username) {
    try{
        const {data} = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username)
    }catch(err) {
        if(err.response.status === 404) {
            createErrorCard('There is no profile with this username')
        }
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${username}" class="avatar">
    </div>
  
   <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>

    <ul>
      <li>${user.followers}<strong>Followers</strong> </li>
      <li>${user.following}<strong>Following</strong></li>
      <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>

    <div id="repos"></div>
 </div>
</div>
    `

    main.innerHTML = cardHTML;
}

async function getRepos (username) {
    try{
        const {data} = await axios(APIURL + username + '/repos?sort=created');
       addRepostoCard(data);
    }catch(err) {
        if(err.response.status) {
            createErrorCard('Problem fetching Repos')
        }
    }
}

function createErrorCard(msg) {
    const cardHTML = `
    <div class = 'card'>
    <h1>${msg}</h1>
    </div>
    `

    main.innerHTML = cardHTML;
}

function addRepostoCard(repos) {
    const repoEl = document.getElementById('repos');

    repos
    .slice(0,10)
    .forEach(repo => {
        const repoLink = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank'
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl)
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.ariaValueMax;

    if(user) {
        getUser(user)

        search.value = '';
    }
})
   

