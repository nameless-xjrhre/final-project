# Final Project

## Running the Application

_Prerequisites: [Node.js](https://nodejs.org/en/)_

1. Install pnpm using `npm install -g pnpm@next-7`
2. Run `pnpm install`
3. On another terminal, `cd frontend && pnpm install`
4. On another terminal, `cd backend && pnpm install`

On the backend directory, add a `.env` file with the following format:

```
DATABASE_URL=
```

The `DATABASE_URL` is the url for your postgreSQL database

6. In the backend directory, run `pnpm run migrate`
7. In the frontend directory, run `pnpm run dev`
8. In the backend directory, run `pnpm run dev`

To accesss the frontend client, visit http://localhost:3000 on the browser.

Similarly, to access the backend server, visit http://localhost:4000/graphql.
