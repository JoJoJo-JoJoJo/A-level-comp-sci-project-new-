# My NEA project for A-level Computer Science

## To clone this project

1. Make a fork of the project

2. Clone the project into a repository of your choice (most likely with https or ssh)

3. Open a terminal and run `cd frontend`

4. Then run `pnpm i`

5. Create a project build for the frontend with `pnpm build`

6. Open a 2nd terminal and run `cd backend`

7. Then run `pnpm i`

8. Serve the completed frontend build to port 8080 with `pnpm start` (in frontend terminal) - alternatively you can choose the port yourself in the webpack config under `devServer.port`

9. In the backend terminal use `pnpm start` to run the server, or alternatively use `pnpm dev` to run the server in dev mode (includes live reloading)
