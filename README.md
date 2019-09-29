# MyDisc
## Description
MyDisc is an desktop and web aplication, which allows to create folders and store files in them. Back-end is written in Spring Boot and front end is written in ReactJS.

## What is disc?
Frontend of MyDisc application made with ReactJS and Electron

## Instalation
How to run MyDisc Application:
1. git clone [MyDisc](https://github.com/Syemon/MyDisc.git) from [Syemon](https://github.com/Syemon) to get backend
2. git clone (into client folder) [this repo](https://github.com/martyna007/disc.git) to get frontend
3. Create database in mysql named `mydisc`(in case of problems, here's [schema](https://github.com/martyna007/disc/files/3666398/schema.txt))
4. Run command:  `./gradlew build && java -jar build/libs/MyDisc-0.0.1-SNAPSHOT.jar`
5. And the run: `./gradlew bootRun`
6. In client folder run npm install, then `npm run start` to run react in browser
7. In case to run app in electron, type: `npm run electron`

Check the [Syemon's readme](https://github.com/Syemon/MyDisc/edit/master/README.md) how to install app with composer and get more detailed info about backend.

## Screenshots
![Screenshot](https://user-images.githubusercontent.com/21356522/65827025-44433780-e28e-11e9-9a19-835f10c3215a.png)
![Screenshot2](https://user-images.githubusercontent.com/21356522/65827030-4c9b7280-e28e-11e9-8c63-de997b5a0aa5.png)
![mydisc3](https://user-images.githubusercontent.com/21356522/65827260-a3a24700-e290-11e9-8ae3-7a882c2fea15.png)

## Authors
* Front-end - [Martyna Szeszko](https://github.com/martyna007) 

* Back-end - [Szymon Linowski](https://github.com/Syemon) 
