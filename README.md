# 🏸 Website | Badminton Administratives stuffs and Players Managment

## Objectives

This website is a continuation of the program [here](https://github.com/William-Dbt/badminton-tournament_managment), the main goal is to manage players for classes and take advantage of internet to do some administrative work inside our club.  
This project is not official, the first goal is to practise developing useful applications that can be used every day to simplify tasks about the club where I practise badminton.  

## Infrastructure

I'm using Docker for the infrastructure of the website and I use a Makefile to make things easier to start.  

Frontend : ReactJS

Backend : NestJS, Prisma (PostgreSQL)

## Usage

Some .envSample are provided in the `frontend/` and `backend/` folders. Rename them by .env and change the content to whatever you like.  
To start the application you have to run `npm install` in both folders, change contents of .env to whatever you want (follow the example of the frontend env) and just launch the Makefile by calling `make` in the terminal.  
By default, the website is on port `4000`, the backend is `3333` and the prisma database is on `5555`

## Notes & Idea to implement

- Administration HUB:
	* Manage registrations of students and supervisors (thoses who are present in classes)  
	* Manage groups of students and assign supervisors to them  
	* Manage students and supervisors (CRUD)  
	* ...

- Registration form orchestrated by the administration panel for supervisors (and relatives to see stats of their children ?)  
	* Decide when to open the form for registration

- Start matches and tournaments (later)

...  

I'm working blind on this, the main goal is to learn to use React and implement a real application that can maybe be used later.  
This application can be used to track students and get personals infos in case of problems  
