---
title: "Angular Unit Testing: Login"
date: 2019-06-25
template: "post"
draft: false
slug: "/posts/angular-unit-testing-login/"
category: "Web Development"
tags:
  - "Typescript"
  - "Angular"
  - "Unit Testing"
description: "This article documented how I write unit test for Login Features."
# socialImage: "/media/42-line-bible.jpg"
---

### Angular Unit Testing: Login

This article documented how I write unit test for Login Features.

Before I started, I'll have prepare 

- An Angular Project with Login Component. You can find the code [here](https://github.com/tlcheah2/angular-unit-testing).
- [Isolated Test](#isolated-test)
- [Shallow Test](#shallow-test)
- [Integrated Test](#integrated-test)

#### Isolated Test

I am only going to test component class logic for Isolated Test without rendering. 

There are 5 test cases: 

1.) Ensure the component is successfully created *(Boilerplate Test Case)*

2.) Ensure the component initial state is correct

3.) `submitted` should `true` and `authError` should be `false` when onSubmit funtion called.

4.) Verify the form field value updated correctly

5.) Form should be `invalid` when blank field entered

```typescript
describe('Login Component Isolated Test', () => {
  let component: LoginComponent;

  beforeEach(async(() => {
    component = new LoginComponent(routerSpy, new FormBuilder(), loginServiceSpy);
  }));

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.authError).toBeFalsy();
    expect(component.authErrorMsg).toBeUndefined();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onSubmit(blankUser);
    expect(component.submitted).toBeTruthy();
    expect(component.authError).toBeFalsy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.username, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  }));
});
```



#### Shallow Test

The main test I focus in Shallow Test is template rendering. For e.g, I would ensure the `button.click()` will trigger the `onSubmit` function call and make sure error message is displayed when input field is invalid.

 There are 6 test cases:

1.) Ensure username, password field and login button is rendered.

2.) Render Username error message when username is blank.

3.) Render Password error message when password is blank.

4.) Render both username & password error message when username & password is blank.

5.) Display red outline for username input field when username is blank.

6.) Display red outline for password input field when password is blank.

```typescript
describe('Login Component Shallow Test', () => {

  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['username'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [LoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter username');
  });

  it('Display Password Error Msg when Username is blank', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter username');

    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('is-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('is-invalid');
  });
});
```



#### Integrated Test

After ensuring 

- The component logic passed in Isolated test 
- The logic and template rendering passed in Shallow Test

I'll test the LoginService and Router to ensure the whole component and dependencies (**LoginService & Router**) behave correctly.

There are 2 test cases:

1.) Ensure LoginService `login` is called when login`button.onClick()`

2.) Ensure navigate to `HomeComponent` when `login` successfully

```typescript
describe('Login Component Integrated Test', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;
  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['username'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));

  }));

  it('loginService login() should called ', fakeAsync(() => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(loginServiceSpy.login).toHaveBeenCalled();
  }));

  it('should route to home if login successfully', fakeAsync(() => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
    advance(fixture);

    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
    // expecting to navigate to id of the component's first hero
    expect(navArgs).toBe('/home', 'should nav to Home Page');
  }));
  
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});
```



#### Conclusion

This is basically my journey on how I wrote my Angular Unit Testing for Login.

[Show me Full Code](https://github.com/tlcheah2/angular-unit-testing)

#### References

Reading tons of Angular Unit Testing articles also helps a lot. Here are the articles that I read and re-read a lot of times.

[Three ways to test Angular Components](https://vsavkin.com/three-ways-to-test-angular-2-components-dcea8e90bd8d)

[Angular Component Testing with Examples](https://medium.com/@bencabanes/angular-component-testing-with-examples-7c52b2b7035e)

[Angular Testing in Depth: Components](https://auth0.com/blog/angular-testing-in-depth-components/)

[Angular Testing](https://angular.io/guide/testing) (Official Angular Guide)

