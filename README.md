# 2020-ng-customizablechat

_This project is a chat application fully developed using Angular for the frontend and NestJS for the backend,
the database corresponds to a cloud MongoDB database. It includes the development of the library customizable-chat 
uploaded to NPM, which allows the user to introduce completely a frontend chat library using HTTP and WebSockets._

## Starting  🔧

_The next instructions will allow you to install the project, deploy the different sections and allow you to start developing._

For the backend directory:
```
npm install 
npm run start
```

For the frontend directory:
```
npm install
ng serve -o
```

For the library directory:
```
npm install
```

In case you want to modify the library in the proper directory for development 
```
ng build customizable-chat
```

For the upload of a version compile it for production
```
ng build customizable-chat --prod
```

## Executing the tests ⚙️

_In the library directory_
```
ng test customizable-chat --code-coverage
```


## Build with 🛠️


* [Angular](http://www.dropwizard.io/1.0.2/docs/) - Frontend framework
* [NestJs](https://maven.apache.org/) - Backend framework
* [MongoDB Atlas](https://rometools.github.io/rome/) - Database
* [Docker](https://rometools.github.io/rome/) - Deployment in containers

## Author ✒️


* **Diego Pascual Ferrer** - *Full Development* - [Diegopasfer1909](https://github.com/Diegopasfer1909)


## Licencia 📄

This project is under the license Apache, version 2.0 - check the file [LICENSE.md](LICENSE.md) for more details


---
With love ❤️ from [Diegopasfer1909](https://github.com/Diegopasfer1909) 😊
