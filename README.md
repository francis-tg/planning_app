# PLANNING APP SERVER

[/config/config.json](/config/config.json) database config file

## Installation 
````bash
npm install
````
## clone submodule (client Front) [Front respositry](https://github.com/francis-tg/planning_app_client.git)
````bash
git submodule init
````
````bash
git submodule update
````
### create database
````bash
npx sequelize-cli db:create
````
### migrate database
````bash
npx sequelize-cli db:migrate
````
### start project
````bash
npm run dev
````

