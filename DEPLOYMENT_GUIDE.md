# Deployment Guide (do these steps yourself)

The code and README are ready. These steps need your GitHub and Netlify accounts, so you must do them.

## Part 1: Readiness check
Open `index.html` in your browser. Confirm styles load, you can add an expense, and refresh keeps data.

## Part 2: GitHub
1. On github.com click **New repository**. Name: `spendwise`. Choose **Public**. Do NOT add a README (we have one).
2. In a terminal inside this folder:
```
git init
git add .
git commit -m "Initial commit: SpendWise"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/spendwise.git
git push -u origin main
```

## Part 3: Netlify
1. Go to app.netlify.com and sign in with GitHub.
2. **Add new site > Import an existing project > GitHub** > select `spendwise`.
3. Branch: `main`. Build command: leave empty. Publish directory: `.` (or leave default).
4. Click **Deploy**. Wait for "Published".

## Part 4: Custom site name
**Site configuration > General > Site details > Change site name**. Use something like `spendwise-kaman` -> `https://spendwise-kaman.netlify.app`.

## Part 5: Continuous deployment test
1. Edit `index.html` footer: change `SpendWise v1.0` to `SpendWise v1.1`.
2. Run:
```
git add .
git commit -m "Update version to v1.1"
git push
```
3. In Netlify > **Deploys**, watch a new deploy start by itself. Refresh your live site and see v1.1.

## Part 6: Final testing checklist
- [ ] Live page opens, styling is applied
- [ ] script.js works (set budget, add/delete/filter expenses)
- [ ] Refresh keeps data
- [ ] Open a wrong URL (e.g. /abc) and see the 404 page
- [ ] Test on your phone

## Finish
1. In `README.md` replace `YOUR-USERNAME` and `YOUR-SITE-NAME` with your real values. Edit the Challenges section to match what really happened to you.
2. Commit and push (this also triggers another deploy).
3. Submit ONLY the GitHub repository link in the LMS.
