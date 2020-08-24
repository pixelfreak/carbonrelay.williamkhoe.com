# Carbon Relay Coding Challenge

The app is deployed at: [https://carbonrelay.vercel.app/](https://carbonrelay.vercel.app/). Any commit to `master` triggers re-deployment.

To run it in development: 
1. Clone this repo.
2. Go to the root directory of this project and do `npm install`.
3. Confirm that `.env.local` file is in the root directory (this file is included in the emailed zip).
4. Run `npm run dev`.
5. View the site at `localhost:3000`.

# Architecture
- [Next.js](https://nextjs.org/) is chosen for speed of development and its out-of-the-box features such as code-splitting, static/SSR/Serverless Functions, CSS-in-JS, and dynamic routing capabilites.

# Assumptions
- All data are stored in localStorage. No check is done if we hit the storage limit of 5-10MB.
- Adding a movie to a list can only be done from the movie details page.
- Currently no ability to rename list.
