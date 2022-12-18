# Example of a NestJS Clean Architecture Implementation

![CI](https://github.com/jtsato/nestjs-clean-architecture-example/actions/workflows/continuous-integration.yml/badge.svg)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jtsato_nestjs-clean-architecture-example&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jtsato_nestjs-clean-architecture-example)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jtsato_nestjs-clean-architecture-example&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jtsato_nestjs-clean-architecture-example)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jtsato_nestjs-clean-architecture-example&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jtsato_nestjs-clean-architecture-example)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jtsato_nestjs-clean-architecture-example&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jtsato_nestjs-clean-architecture-example)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jtsato_nestjs-clean-architecture-example&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jtsato_nestjs-clean-architecture-example)

**Table of Contents**

* [Technology stack](#technology-stack)
* [Prerequisites](#prerequisites)
* [Solution Architecture](#solution-architecture)
* [Testing Strategy](#testing-strategy)
* [Mutation Reports](#mutation-reports)
* [Building and Running the solution](#building-and-running-the-solution)
* [Further Information](#further-information)
* [Resources](#resources)

***

## Technology stack

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Shell Script](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326DE6?style=for-the-badge&logo=kubernetes&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)

## Prerequisites

* [Node.js](https://nodejs.org/en/download/)

## Solution Architecture

##### Core: Entities
* Represent your domain object
* Apply only logic that is applicable in general to the whole entity

##### Core: Use Cases
* Represent your business actions, it’s what you can do with the application. Expect one use case for each business action.
* Pure business logic
* Define interfaces for the data that they need in order to apply some logic. One or more providers will implement the interface, but the use case doesn’t know where the data is coming from.
* The use case doesn't know who triggered it and how the results are going to be presented.
* Throws business exceptions.

##### Providers
* Retrieve and store data from and to a number of sources (database, network devices, file system, 3rd parties, etc.)
* Implement the interfaces defined by the use case
* Use whatever framework is most appropriate (they are going to be isolated here anyway).
* Note: if using an ORM for database access, here you'd have another set of objects in order to represent the mapping to the tables (don't use the core entities as they might be very different).

##### Entrypoints
* They are ways of interacting with the application, and typically involve a delivery mechanism (e.g. REST APIs, scheduled jobs, GUI, other systems).
* Trigger a use case and convert the result to the appropriate format for the delivery mechanism
* A GUI would use MVC (or MVP) in here; the controller would trigger a use case

##### Configuration
* Wires everything together.
* Frameworks (e.g. for dependency injection) are isolated here
* Has the "dirty details" like Main class, web server configuration, datasource configuration, etc.

## Testing Strategy
##### Unit Tests
* for TDD (a.k.a. Tests first, to drive design).
* Cover every little detail, aim for 100% coverage.
* “Dev to dev” documentation: What should this class do?
* Test individual classes in isolation, very fast.

##### Integration Tests
* Test integration with slow parts (http, database, etc.)
* “Dev” documentation: Does this work as expected?
* Test one layer in isolation (e.g. only rest endpoint, or only data provider). Slow
* Use whatever library makes it easy

## Mutation Reports
* [Application](https://jtsato.github.io/nestjs-clean-architecture-example/mutation-report/index.html)

***

## Building and Running the solution
* cleaning the solution:
```
rd node_modules /s /q
```
* building the solution:
```
yarn build
```
* running unit tests and generating coverage report:
```
yarn test:cov
```
* running mutation tests:
```
yarn test:mutation
```
* starting the solution:
```
yarn start:dev
```

***

## Further Information:
- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular
- https://github.com/viavarejo-internal/open-platform-notification-system-git-hooks-bash#semantic-commit-messages

***

## Resources
##### Blogs & Articles
* The Clean Architecture https://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html
* Screaming Architecture http://blog.8thlight.com/uncle-bob/2011/09/30/Screaming-Architecture.html
* NODB https://blog.8thlight.com/uncle-bob/2012/05/15/NODB.html
* Hexagonal Architecture http://alistair.cockburn.us/Hexagonal+architecture

##### Videos & Presentations
* Clean Architecture https://www.youtube.com/results?search_query=clean+architecture

##### Further Information
* [Confluence](http://confluence.viavarejo.com.br/display/AAOP/Open+Plataform+-+Home)

***
