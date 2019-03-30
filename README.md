# slack-app-integration
Slack app to save data from a channel to mysql db

This project requires node.js installed in your system. get it from here [node.js](http://nodejs.org)

## Follow this to get started:

1. Create a database `slack_app` in your mysql

2. Import `slack-app.sql` file in your DB.

3. Rename `config.json.example` to `config.json`

4. Install all required modules by run this command in your terminal `npm i`. (Make sure your are in  the project directory before running this commnad)

5. After install, run `npm run shh` to start ssh tunnel for slack app endpoint.

6. open new terminal and run `npm start`.

7. After that, go to [https://akshay-laxcon.serveo.net](https://akshay-laxcon.serveo.net) to see all updates from slack channel.

