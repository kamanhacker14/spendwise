# SpendWise

## Project Description
SpendWise is a simple budgeting web app. You set a monthly budget, add expenses with a category, and the dashboard shows total spent, remaining balance, a progress bar and feedback (on track, careful, or over budget). Data is saved in the browser with localStorage. This project was deployed to the internet using GitHub and Netlify.

## Technologies Used
- HTML5
- CSS3
- JavaScript (vanilla, DOM manipulation, localStorage)
- Git and GitHub (version control and hosting the code)
- Netlify (hosting and continuous deployment)

## GitHub Repository Information
- Repository name: `spendwise`
- Repository URL: https://github.com/YOUR-USERNAME/spendwise
- Visibility: Public
- Branch deployed: `main`

## Live Netlify Website URL
https://YOUR-SITE-NAME.netlify.app

## Deployment Process Summary
1. Reviewed the project structure: `index.html`, `style.css`, `script.js`, `404.html`, `netlify.toml` all in the root folder, with relative file paths.
2. Created a public GitHub repository and pushed the project with `git init`, `git add .`, `git commit` and `git push`.
3. Logged in to Netlify with GitHub, chose **Add new site > Import an existing project**, and selected the `spendwise` repository.
4. Set the publish directory to the project root (no build command needed because the site is static) and deployed.
5. Renamed the site under **Site configuration > Change site name** to `YOUR-SITE-NAME`.
6. Tested continuous deployment: changed the footer version from v1.0 to v1.1, pushed to GitHub, and Netlify rebuilt the site automatically. The change appeared on the live URL.
7. Tested the live site: the page loads, the CSS and JavaScript load, budget and expenses can be added, filtered and deleted, data persists after refresh, and the 404 page works.

## Challenges Encountered During Deployment
- Choosing the correct publish directory in Netlify. Fixed by publishing the root folder, since there is no build step.
- Making sure file names and paths matched exactly. Netlify runs on a case-sensitive server, so `Style.css` and `style.css` are different files.
- Remembering to push to GitHub before expecting the live site to change.
- Site name already taken. Fixed by choosing a more unique name.

## Lessons Learned
- Continuous deployment saves time: every push to GitHub updates the live site automatically.
- Clean, relative file paths and a clear folder structure prevent broken pages after deployment.
- Always test the live URL, not only the local version.
- A README with the live link and process notes makes the project easier for others to understand.

## Author
Kaman Jonathan
