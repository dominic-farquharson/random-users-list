# Random users list

Next.js app that allows you to view a list of random users with paginated results.

Basic styling was done using MUI, data fetching was done via nextjs server side props to allow for full SSR and validation was performed using Zod.

## Setup
1. install latest version of node 18

## Installation
1. Run `npm i`
1. Run `npm run dev` to start app.
1. Run `npm run test` to run test suite.

## Technologies Used:
1. Next.js
1. MUI
1. Zod

## Future Improvements
- Styling / responsiveness
- cache random user api responses.
- Improve FE validation and return better error messages to user.
- Move all string values (error messages, etc) to constants files.

## New Features
- Infinite scroll instead of pagination ( bi-directional to preserve storing page in URL )
- Add tabular view
- Allow user to select max results per page

## Deployment
[link](https://random-users-list-liard.vercel.app/)