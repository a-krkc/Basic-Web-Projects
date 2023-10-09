const form = document.getElementById("github-form");
const nameInput = document.getElementById("github-name");
const clearLastSearchs = document.getElementById("clear-last-users");
const listLastSearchs = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
init();

function init() {
  form.addEventListener("submit", getData);
  clearLastSearchs.addEventListener("click", clearSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  const username = nameInput.value.trim();

  if (username === "") {
    ui.inputFieldState(username);
  } else {
    nameInput.style.borderColor = "green";
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.inputFieldState(response.user.message);
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUsersToStorage(username);
          ui.UserInfo(response.user);
          ui.RepoInfo(response.repo);
          ui.inputFieldState();
        }
      })
      .catch((err) => console.log(err));
  }

  e.preventDefault();
}

function getAllSearched() {
  const users = Storage.getSearchedUsersFromStorage();
  users.map((user) => {
    const li = document.createElement("li");
    li.classList = "list-group-item bg-color";
    li.textContent = user;
    listLastSearchs.appendChild(li);
  });
}

function clearSearched() {
  Storage.clearAllSearchedUsersFromStorage();
  ui.deleteSearchedUserFromUI();
}
