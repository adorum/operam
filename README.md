# Stanford Image Catagory Tree

This is simple tree data structure scraped from http://imagenet.stanford.edu/synset?wnid=n02486410 and visualized using ReactJS framework

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM or YARN)

## Installation

* `git clone https://github.com/adorum/operam.git`
* `cd operam/`
* `npm run install-all`

## Running / Development

* At first run `node scraper.js` to scrape the data and to store it to database
* In a new terminal run `npm start` to start the application
* Application runs  in the browser on [http://localhost:3000](http://localhost:3000).

## Running Tests

* `npm test`

## NOTES

* Complexity of algorithm which transforms liner array to tree is O(n)
* On a FrontEnd side I used `create-react-app` generator, which generates a basic skeleton of React application
* On the backend side there is used `express`
