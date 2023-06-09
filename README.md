# Padlet23

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Must-haves
- [x] Share Padlets
  - Share button for every Padlet in detail view
  - User permissions can be set
  - Share link can be copied
  - Available depending on permissions
- [x] add Posts - Plus button in Padlet Show view
- [x] edit Posts - Textfelder = Inputfelder + debounce put / post Request
- [x] comment on Posts
  - Comments below posts in detail view
  - Sum of comments icon at Post card
- [x] rate Posts - Sum of rating icon at Post card
- [X] delete Posts - Delete button in detail view
- [x] delete Padlet - Delete button in detail view
- [x] accept or decline Padlet share requests
- [x] respect permissions for Padlets & Posts & Comments
  - Backend does not save content if not authorized & Frontend does not show possibilites in UI

## Nice-to-haves
- [x] theme switcher
- [x] image or file content for Posts
- [x] image suggestions for Posts from unsplash
- [x] search for Padlets
- [x] search for Posts
- [x] random images for Padlets and Posts
- [ ] user profile
- [x] register user
- [ ] show a comment icon with amount of comments
