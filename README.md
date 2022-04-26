# Final Project

## Running the Application

_Prerequisites: [Node.js](https://nodejs.org/en/)_

1. Run `npm install`
2. On another terminal, `cd frontend && npm install`
3. On another terminal, `cd backend && npm install`

On the backend directory, add a `.env` file with the following format:

```
DATABASE_URL=
```

The `DATABASE_URL` is the url for your postgreSQL database

4. In the backend directory, run `npm run migrate`
5. In the frontend directory, run `npm run dev`
6. In the backend directory, run `npm run dev`

To accesss the frontend client, visit http://localhost:3000 on the browser.

Similarly, to access the backend server, visit http://localhost:4000/graphql.
