---
title: "Step by Step Guide on How to make API Call in Angular (ES6 Promise)"
date: "2020-06-12"
tags:
  - angular
---

This post documented down how to make APIs call to the backend server in order to display the data in your Angular App.

## Making API Call using HttpClient

Angular Framework provides a module named `HttpClientModule` which allows you to perform the Http Call to the backend server and retrieve data. 

## Step by Step Guide to Make an API call

1. Import the `HttpClientModule` into your `AppModule`.

    ```js
   import { HttpClientModule } from '@angular/common/http';

    @NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule, // Import HttpClientModule into the App Module
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
    })

    export class AppModule { }
    ```

    Angular Framework introduce `Service` which is where you should perform your API call and write your HttpClient code which we will do in Step 2.

2. Create a LoginService and Inject `HttpClient` into the Service.

    ```js
    import { HttpClient } from '@angular/common/http';

    @Injectable({
        providedIn: 'root'
    })
    export class LoginService {

        constructor(
            private http: HttpClient
        ) {}
    }
    ```

    Next, we will implement a `POST` request using the HttpClient that we have injected via the constructor.
 
3. Create a `login` function where accepting `username` and `password` and perform the `POST` API call.

    ```js
    import { HttpClient } from '@angular/common/http';

    export interface UserLoginBody {
        username: string;
        password: string;
    }

    @Injectable({
        providedIn: 'root'
    })
    export class LoginService {

        constructor(
            private http: HttpClient
        ) {}

        login(userloginBody: UserLoginBody) {
            const url = 'https://hostname.com/login'; // Replace it with your own API path
            this.http.post(url, userloginBody).toPromise()
                .then((res) => {
                    // If you wish to return the body of response only
                    return res.data;
                });
        }   
    }
    ```

## Converting Http Request Observable to Promise 

Angular Framework promotes `RxJs` way, thus the original `this.http.post` return the `Observable`. 
    
However, Angular framework also expose an API where you could change the Observable to `Promise` using `toPromise()` like the example above. 

It is always good to learn the `Rx` way if you plan to use Angular framework for long-term in your development career. But you could use Promise as well if you're more familiar with `Promise` instead.

Thanks Angular for providing such flexibility.

## Conclusion

In short, this post provides a step-by-step guide on how to make an API call in Angular and how to use Promise in Angular.








