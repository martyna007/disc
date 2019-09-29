# MyDisc
## Description
MyDisc is an desktop and web aplication, which allows to create folders and store files in them. Back-end is written in Spring Boot and front end is written in ReactJS.

## What is disc?
Frontend of MyDisc application made with ReactJS and Electron

## Instalation
How to run MyDisc Application:
1. git clone [MyDisc](https://github.com/Syemon/MyDisc.git) from [Syemon](https://github.com/Syemon) to get backend
2. git clone (into client folder) [this repo](https://github.com/martyna007/disc.git) to get frontend
3. Create database in mysql named `mydisc`
4. Run command:  `./gradlew build && java -jar build/libs/MyDisc-0.0.1-SNAPSHOT.jar`
5. And the run: `./gradlew bootRun`
6. In client folder run npm install, then `npm run start` to run react in browser
7. In case to run app in electron, type: `npm run electron`

Check the [Syemon's readme](https://github.com/Syemon/MyDisc/edit/master/README.md) how to install app with composer and get more detailed info about backend.

## Authors
* Front-end - [Martyna Szeszko](https://github.com/martyna007) 

* Back-end - [Szymon Linowski](https://github.com/Syemon) 
