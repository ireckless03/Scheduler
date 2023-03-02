# Interview Scheduler
## Project Description

The Interview Scheduler is a Single Page Application (SPA) designed to streamline the tracking of student interviews. It has been created using the most current tools and techniques to ensure optimal user experience. The application uses both built-in and customized hooks in React, which allow users to add, edit, and delete appointments in real time. All data is securely stored in a PostgreSQL database by the API server, and communication between the client and server is conducted over HTTP using JSON format. To ensure the highest level of quality assurance, the project adheres to Test Driven Development (TDD) best practices. This includes both individual component testing and end-to-end testing.

## Project Features
- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- A user can view each day as well as appointment information
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- A user can change the details of an existing interview 
- A user can cancel an existing interview, with a confirmation to prevent accidental cancellations
- Days display current remaining spots


### Home Page
!['Home-page'](https://github.com/ireckless03/Scheduler/blob/b558327abfaa2969c158a59ae47f43d1872fd21f/public/images/home-page.png)
_Selecting a weekday on the left/top panel, a user can view existing appointments and available slots for each day._


### Add new appointment
!['book-appointment'](https://github.com/ireckless03/Scheduler/blob/master/public/images/add-appointment.png)
_A user can add interviews to available slots by typing a student name and adding interviewer from the list (an error message will be shown if a student name field is left blank)._


### Interview cancelation
!['delete-appointment'](https://github.com/ireckless03/Scheduler/blob/master/public/images/delete-appointment.png)
_A user can cancel an existing appointment by pressing the delete icon and interacting with a warning message by pressing a confirm button._


 **Note** : _For full functionality both must run concurrently: the client and the API server applications (see database* setup below)._


## Installation
```
npm install
```

## Running Webpack Development Server
```
npm start
```

## Running Jest Test Framework
```
npm test
```

## Running Storybook Visual Testbed
```
npm run storybook
```

## API server/*Database Setup

For full functionality both must run concurrently: the client and the API server applications.
- Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in README to install and setup the database
- Fork and clone this repo
- Navigate to the root directory and install dependencies with `npm install`
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project `npm start`

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, CSS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

