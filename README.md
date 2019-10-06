# Angular 8 and Firebase Starter Project

This is an Angular 8 starter project with a functioning custom FirebaseAuthService for handling user metedata, and protected routes using AngularFireAuthGuard with built in redirects. 

NOTE: The implementation of AngularFire2 provided guards here is different compared to their documentation. There is currently an issue but the workaround can be found [here](https://github.com/angular/angularfire2/issues/2099#issuecomment-503403712). Loging in and Registering through AngularFireAuth is possible using the AuthComponent.

---

Angular Material and Bootstrap have been added along with their required configurations. To learn more about them visit their docs.
* [Angular Material](https://material.angular.io/)
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

### Get Started

Setup the [Angular](https://angular.io/guide/setup-local) environment
```
  npm install -g @angular/cli
```

Clone the project
```
  git clone https://github.com/samuelzapote/angular-firebase-starter.git
```

Enter your project folder
```
  cd angular-firebase-starter
```

Install the project dependencies
```
  npm install
```

##### Set up your Firebase

Create your [Firebase](https://firebase.google.com) account and add a new project, once complete, generate an API Key for you web app. Keep that API Key for the following step.

Learn more about setting up your Firestore database [here](https://firebase.google.com/docs/firestore) and your Authentication service [here](https://firebase.google.com/docs/auth).

NOTE: You will need to set up your Firestore permissions, which are protected by default. As well as your Authentication sign-in method, all of which can be done through the Firebase [console](https://console.firebase.google.com).


##### Set up your environment files

Create an *environment.prod.ts* and an *environment.ts* file inside the environments directory.

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

Run your project's development server
```
  ng serve
```

Once your development server has started visit <http://localhost:4200> and you will automatically navigate to your empty path currently using the landing component. Since this path is protected by the AngularFireAuthGuard, you will be redirected to the '/login' path. 

Visit the *app-routing.module.ts* file to modify this behaviour.

### Learn More

This project is using [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
