# Star Wars Website


In this project, I used JavaScript, React, NextJS, Tailwind CSS, and JavaScript to build the responsive frontend of Star Wars application. Here is the final link of my [deployment](https://star-wars-maidaijaz.vercel.app/).

*  Displayed all the characters of Star Wars on the home page.
*  Implemented **Fuzzy Search** functionality on the characters displayed on home page.
*  Implemented  **Sort**, and **Filter** functionality on the characters details.
*  Displayed character basic info, planet they're from, and links to other characters from the same planet in a separate page.
*  Made home page interactive even in the absence of internet.
*  Used the powerful tools provided by **NextJS** to implement Server-Side Rendering(**SSR**) for better website performance (**99 performance score on Google PageSpeed Insights**).
* Build a fully responsive frontend of Star Wars using **TailwindCSS** and **React**.
* Added unit test using **Jest** and **React-testing-library**.
* Used **Vercel** for the final deployment of application.

For better UI/UX experience I have also added the following functionalities:

* Scroll restoration
* Fuzzy search
* Fast rendering through SSR
* Mobile and Desktop responsive
* Unit Testing

Using SSR and Image components of NextJS provides us with the best performance. Google PageSpeed Insights give the following results:

| ![Performance Score](public/perf.png?raw=true "Performance Score") |
|-|


# Installation Steps

Clone this repository, Navigate to `StarWars-main` folder and Run following commands in your terminal:

1. ```npm install```
2. ```npm run dev```

# Testing
To run test using Jest and React-testing-library, use the following comnmand:
```
npm run test
```
Added basic testing to each component. The coverage report gives the following results:
| ![Coverage Report](public/testcoverage.png?raw=true "Coverage Report") |
|-|

> Character Images taken from this repository: https://github.com/vieraboschkova/swapi-gallery.git
