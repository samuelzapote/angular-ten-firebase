# Angular 8 and Firebase Starter Project

This is an Angular 8 and Firebase starter project with a custom service for handling user metadata, and protected routes using angularfire2 guards with built in redirects. Login and Register using the AngularFire2 authentication service.

*NOTE*: AgularFire2 guards are implemented differently here, compared to the version provided in their documentation. There is currently an issue but the workaround can be found [here](https://github.com/angular/angularfire2/issues/2099#issuecomment-503403712).

---

Includes Angular Material and Bootstrap as well as their required configurations. Visit the following docs for more information.
* [Angular Material](https://material.angular.io/)
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

#### Getting Started

Install the [Angular CLI](https://angular.io/guide/setup-local)
```
npm install -g @angular/cli
```

Clone the project into your directory
```
git clone https://github.com/samuelzapote/angular-firebase-starter.git
```

cd into the project folder
```
cd angular-firebase-starter
```

Install the required dependencies
```
npm install
```

---

#### Setting up Firebase

Create a [Firebase](https://firebase.google.com) account and add a new project, once complete, [generate](https://firebase.google.com/docs/web/setup) an API Key for your web app. Keep that API Key for the following step.

Learn more about setting up your Firestore database [here](https://firebase.google.com/docs/firestore) and your Authentication service [here](https://firebase.google.com/docs/auth).

*NOTE*: You will need to set up your Firestore permissions, which are protected by default. As well as your Authentication sign-in method, all of which can be done through the Firebase [console](https://console.firebase.google.com).

---

#### Set up the environment files

Create an *environment.prod.ts* and an *environment.ts* file inside the /src/environments directory.

*environment.prod.ts*
```typescript
export const environment = {
  production: true,
  firebaseConfig: {
    // Place your Firebase API key here
  }
};
```

*environment.ts*
```typescript
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    // Place your Firebase API key here
  }
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
```

---

Run the development server
```
ng serve
```

Once the development server has started visit <http://localhost:4200> and you will automatically navigate to your empty path currently using the Landing component. Since this path is protected by the AngularFireAuthGuard, you will be redirected to the '/login' path. 

Use the *app-routing.module.ts* file to modify this behaviour.

#### Learn More

This project is using [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
