# Intro

This repo contains an exercise that we'd like to work through with you to give you a feel for how we work and to give us a feel for how you work. First we'll go over the objective of the application that we're building in this exercise. Next, you'll find a list of stories that we'd like to implement. After that, there are instructions on how to get started with development. Finally, you'll find some guidelines to use to submit your solution. If you have any questions, please feel free to reach out to us in the Slack channel that we added you to.

# Objective

For this exercise, we want to build an app to work with some simulated time and expense data. The data is contained in two CSV files called time.csv and expenses.csv located in the `/data` directory of the repo. Below, you'll find a few stories that we'd like to implement. Please read through them and let us know if you have any questions. Note that we've included wireframes for each story so that you can get a visual of the desired functionality. Since these are wireframes, you're free to implement the styling however you feel is the most practical and intuitive. Do your best to make things look nice, but don't feel like the the UI has to be pixel-perfect.

For the application state management please use Redux.

If you need a UI library, please use Material UI. For everything else, feel free to use any library that you think will make things easier (lodash, axios, etc.). Feel free to search on Google, StackOverflow, etc. That said, we want to see what you're capabable of as an individual programmer, so please don't get anyone else's help on this project. If you need clarification on anything, please reach out to us and we'll be happy to provide clarification.

Please use React and try to use a functional approach (filter/map/reduce, immutability, etc.) when writing the code instead of an imperative approach (for/while, mutations, etc.).

# Stories

## Users should be able to see entries

The wireframe for this story is wireframes/see_entries.png

As a User,  
Because I want to be able to see time and expense entries,  
When I click on the "Upload CSV" button,  
Then I should be able to select a file from my computer containing time entries,  
And when I select a file from my computer,  
Then I should see the list of entries that I uploaded from the file displayed in a table,  
And when I click the "Upload CSV" button again,  
Then I should be able to select another file from my computer containing expense entries,  
And when I select a file from my computer,  
Then the new entries should be added to the table,  
And I should be able to see the entries from both CSV files in the table,

Notes: 
- We want to parse the the CSV on the frontend using the [File Reader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL#Example). Please don't worry about sending the CSV to the server.
- If you're applying for a fullstack position, please store the time and expense data in MongoDB via the Express server that we have setup. We setup a couple of example endpoints to just make sure that everything is wired together correctly. Please feel free to change it as you see fit. The application data must be persistent, that is, if the user uploads entries and then refreshes the page he should be able to see the entries he uploaded before. If you're just applying for a frontend position, you don't need to worry about working on the endpoints or storing the data in the database.

## Users should be able to see the total dollar amount for entries

The wireframe for this story is wireframes/totals.png

As a User,  
Because I want to know how much money I've billed in time and expenses,  
When I'm viewing entries that I've uploaded from a CSV,  
Then I should see one total for time,  
And I should see another total for expenses,  
And I should see another total for time and expenses combined.  

## Users should be able to sort entries

The wireframes for this story are wireframes/sorting_first_time.png, wireframes/sorting_second_time.png, and wireframes/sorting_different_column.png

As a User,  
Because I want to be able easily find specific entries,  
When I click on the name of a column,  
Then I should see a down arrow next to the name of the column,  
And the entries should be sorted by that column descending,  
And if I click on the name of the column again,  
Then the arrow next to the column name should point up,  
And I should see the entries should be sorted by that column ascending,  
And if I click on the name of another column,  
Then the down arrow should disappear from the previous column name and should appear next to the column name that I just clicked,  
And the entries should be sorted by that column descending.

# Development

Fork this repo and pull it down locally on your machine for development. If you're not sure how to fork a repo, you can find GitHub's documentation on it here: https://help.github.com/articles/fork-a-repo/. Before starting, please create a branch called `develop` and push all of your changes to that branch.

## Installation

The project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) for the client and a simple [Express](https://github.com/expressjs/express) server with [Mongoose](https://github.com/Automattic/mongoose). To install the app:

1. Make sure you have [yarn](https://yarnpkg.com/en/) installed.
2. Make sure you have [MongoDB](https://www.mongodb.com/) installed. (Fullstack developers only.)
3. Run `yarn install`. Please use yarn and not npm. Using npm creates a `package-lock.json` which sometimes prevents/messes up a `yarn install`.

## Run the app

1. Start up the client with Webpack dev server using create-react-app's default settings: `yarn start:client`.
2. Start the Mongo daemon: `mongod` (Fullstack developers only.)
3. Run `yarn start:server` to start up Express server with [nodemon](https://github.com/remy/nodemon). (Fullstack developers only.)

# Submission

Once you're ready to submit your solution, please do the following:

1. Create a pull request against the master branch from **your** repo. Please don't open the pull request against the master branch from our repo. We don't want other candidates having access to your awesome solution. :eyes:
2. Give @jdguzmans access to your repo.
3. Send the link to the PR in the Slack channel that we added you to.

Thanks for taking the time to work through this exercise with us. We're excited to see what you come up with! Happy coding! :rocket:
