class UI {
  constructor() {
    this.profileDiv = document.getElementById("profile");
    this.repoDiv = document.getElementById("repos");
  }

  inputFieldState(state) {
    if (state === "") {
      nameInput.style.borderColor = "red";
      nameInput.placeholder = "Girilen kullanıcı adı geçersiz!";
    } else if (state === "Not Found") {
      nameInput.style.borderColor = "blue";
      nameInput.placeholder = "Kullanıcı Bulunamadı!";
    } else {
      nameInput.style.borderColor = "green";
      nameInput.placeholder = "Lütfen bir kullanıcı adı girin!";
    }

    setTimeout(() => {
      nameInput.style.borderColor = "#ced4da";
      nameInput.value = "";
    }, 2000);
  }

  UserInfo(user) {
    this.profileDiv.innerHTML = `
    <div class="card card-body mb-3 bg-color">
          <div class="row">
            <div class="col-md-4">
              <a href="${user.html_url}" target="_blank">
                <img class="img-fluid mb-2" src="${
                  user.avatar_url || "Avatar Bulunamadı"
                }" />
              </a>
              <hr />
              <div id="fullName"><strong>${
                user.login || "Kullanıcı Adı Bulunamadı"
              }</strong></div>
              <hr />
              <div id="bio">${user.bio || "Bio Bulunamadı"}</div>
            </div>
            <div class="col-md-8">
              <button class="btn btn-secondary">
                Takipçi <span class="badge badge-light">${
                  user.followers || " 0"
                }</span>
              </button>
              <button class="btn btn-info">
                Takip Edilen <span class="badge badge-light">${
                  user.following || ": 0"
                }</span>
              </button>
              <button class="btn btn-danger">
                Repolar <span class="badge badge-light">${
                  user.public_repos || "Repo Bulunamadı."
                }</span>
              </button>
              <hr />
              <ul class="list-group">
                <li class="list-group-item borderzero bg-color">
                  <img src="src/images/company.png" width="30px" />
                  <span id="company">${
                    user.company || "Şirket Bilgisi Bulunamadı."
                  }</span>
                </li>
                <li class="list-group-item borderzero bg-color">
                  <img src="src/images/location.png" width="30px" />
                  <span id="location">${
                    user.location || "Şirket Lokasyon Bilgisi Bulunamadı."
                  }</span>
                </li>
                <li class="list-group-item borderzero bg-color">
                  <img src="src/images/mail.png" width="30px" />
                  <span id="company">${
                    user.email || "Şirket Mail Bilgisi Bulunamadı."
                  }</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    `;
  }

  RepoInfo(repos) {
    this.repoDiv.innerHTML = "";

    repos.map((repo) => {
      this.repoDiv.innerHTML += `
    <div class="mb-2 card-body">
      <div class="row">
        <div class="col-md-2">
          <a href="${repo.html_url}" target="_blank" id="repoName">${
        repo.name
      }</a>
        </div>
        <div class="col-md-6">
          <button class="btn btn-secondary">
            Starlar <span class="badge badge-light" id="repoStar">${
              repo.stargazers_count || " 0"
            }</span>
          </button>
          <button class="btn btn-info">
            Forklar <span class="badge badge-light" id="repoFork">${
              repo.forks_count || " 0"
            }</span>
          </button>
        </div>
      </div>
    </div>
    <hr />
    `;
    });
  }

  addSearchedUserToUI(username) {
    const users = Storage.getSearchedUsersFromStorage();
    if (users.indexOf(username) === -1) {
      const li = document.createElement("li");
      li.classList = "list-group-item bg-color";
      li.textContent = username;
      listLastSearchs.appendChild(li);
    }
  }

  deleteSearchedUserFromUI() {
    // listLastSearchs.innerHTML = "";

    while (listLastSearchs.firstElementChild !== null) {
      listLastSearchs.removeChild(listLastSearchs.firstElementChild);
    }
  }
}
