// Replaying the callbacks in index.js with promises
console.log("Before");
// getUser2(1, user => {
//     getRepositories(user.gitHubUsername, (repositories) => {
//         getCommits(repositories[0], commits => {
//             console.log("List of Repo", commits);
//         });
//     });
// });

// //Promise-based approach
// getUser2(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error: ', err.message));

// Async and Await Approach //#endregion
async function displayCommits() {
  try {
    console.log("Testing....");
    const user = await getUser2(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

displayCommits();

console.log("After");

function getUser2(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({
        id: id,
        gitHubUsername: "emeksense"
      });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API for commits...");
      resolve(["commit"]);
    }, 2000);
  });
}