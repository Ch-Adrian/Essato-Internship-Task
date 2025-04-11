# Essato-Internship-Task

This is recruitment task for Essato Company.

## Required technologies:
npm\
Nodejs\
Java 21\
Docker

## Run:
In order to open application you have to run three things:\
1. frontend:\
Go to frontend catalog and type:
> npm install\
> npm start \
2. backend:\
To run project You can use IDEA environment\
or use maven:\
inside backend directory run (for Windows):
>.\mvnw spring-boot:run to start backend\
>.\mvnw compile to build\
>.\mvnw clean to clean project\

for linux You have to replace .\mvnw with mvn.\
3. database:\
Database is placed inside docker container.
It should be available along with running springboot app.
Alternatively to use database type in console in current directory:
> docker-compose up