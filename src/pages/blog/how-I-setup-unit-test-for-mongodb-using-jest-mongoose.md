---
date: "2019-09-03"
title: "How I Setup Unit Test for MongoDB using Jest & Mongoose"
description: "A detailed step-by-step guide for MongoDB Unit Test with Explanation"
tags: 
  - javascript
---

<figure>

![](../../images/how-i-setup-unit-test-for-mongodb-using-jest-mongoose-0.jpeg)

<figcaption>Photo by <a href="https://unsplash.com/@goshua13?utm_source=medium&utm_medium=referral" class="figcaption-link">Joshua Aragon</a> on <a href="https://unsplash.com?utm_source=medium&utm_medium=referral" class="figcaption-link">Unsplash</a></figcaption></figure>

## Background

I am working on a backend microservices project which adopted tech stack like MongoDB, Express Framework, RabbitMQ and etc. And recently, I am assigned to develop a pretty big feature which involving changes and the logic flow across different microservices. I drafted down the flow in the screenshot below.

<figure>

![](../../images/how-i-setup-unit-test-for-mongodb-using-jest-mongoose-1.jpeg)

<figcaption>Microservices Flow and Forgive my handwriting</figcaption></figure>

It’s pretty challenging and time-consuming if you want to set up and run all the relevant projects and performs the end-to-end testing since the bug could have occurred everywhere within all these different microservices when your scope is huge.

## Solution Design

The solution that came to my mind is **unit testing the code in each microservice.**

Unit Testing is important when you’re working on microservices project. This is because you would want to ensure your code is working properly before you did the integration test. The integration test could be difficult and complicated depending on your business use case.

This is the first time where I feel like writing a unit test is way easier. However, we will focus on MongoDB Unit testing only in this article.

## Implementation

Without further ado, let’s draft out and breakdown the implementation step.

1.  Basic Express App Setup
2.  Create a User Model using Mongoose
3.  Setup Jest & MongoDB Memory Server
4.  Unit Testing

### Basic Express App Setup

The app is running using [Express](https://expressjs.com/) framework. The expected outcome of this setup is we will have a functioning application which connected to our MongoDB.

The following dependencies are required in order to complete the setup.

*   [dotenv](https://github.com/motdotla/dotenv). This is the popular library used to manage our environment variable. The common use case is you would store your MongoDB connection string here, so you can easily configure your connection string for a different environment.
*   [Mongoose](https://mongoosejs.com/docs/index.html). Data Modeling library for MongoDB.

**Why Mongoose?**

The reason why I use Mongoose instead of [MongoDB Node Driver](https://mongodb.github.io/node-mongodb-native/3.3/) is because of **Schema** and **Validation**. I would not go deep into Mongoose. Basically what Mongoose provided is allow me to **intentionally** define the field that I want and whether the field is mandatory or optional. Coding intentionally is very important and it’s our responsibility to know each line of code serving what purpose.

Seems complicated? Don’t worry about the setup. I got you covered by setting you up the required dependencies. You can download or clone the code via [Github](https://github.com/tlcheah2/unit-test-mongodb-with-jest/tree/initial-setup) and set up your own unit test project seamlessly.

### Create User Model using Mongoose

After we have successfully set up the project. Before we create the model, we must know what we want.

Which means what are we expecting from the User model. Let’s say we would want to know user’s **_name_**, **_date of birth, age_** _and login using what kind of social account._ This process is known as defining`schema` in Mongoose.

Defining the schema is easier than you think. Here are the steps and the code:

1.  Define UserSchema.
2.  Create UserModel with the defined UserSchema.

```
const mongoose = require('mongoose');

// Create a simple User's schema 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    gender: { type: String, required: true},
    dob: Date,
    loginUsing: String,
});

const userModel = new mongoose.model('User', userSchema);


module.exports = userModel
```

Now we have a working schema and model. Let’s proceed to set up Jest and the unit testing.

### Setup Jest & MongoDB Memory Server

#### Step-by-step guide 
Firstly we have to install Jest. I choose to install it as a dev dependency so that everyone who checkout this project can use it without installing any dependency globally in their own workstation.

`npm install jest --save-dev`

I would say Jest is a perfect match with MongoDB when coming to unit testing as Jest comes with the [preset with MongoDB](https://jestjs.io/docs/en/mongodb) which provided all the configuration and only minimal setup is required. I will explain more in a short while. For now, let install the preset.

`npm install @shelf/jest-mongodb --save-dev`

Then, create `jest.config.js` within your project directory.

```
module.exports = {
  preset: '@shelf/jest-mongodb',
}; 
```

After that, create `jest-mongodb-config.js` within your project directory with the following content.

```
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.0.2', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
}; 
```

That’s all for the configuration. Easy, right?

**Why Jest Preset with MongoDB?**
- **This preset assists you to configure all the settings [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server).**

**Why we need MongoDB Memory Server?** 
- **This is because when you run your unit test, you wouldn’t want your unit test dummy date to be saved into your real database. Thus, MongoDB memory server provides you the ability to store your data in memory only.**

With this preset, we can ignore most of the setup that demotivates us from and spends most of our time on the real stuff which is writing the unit test.

### Unit Testing

Now we know the **Why** and **How** part. Let’s do some unit test on the UserModel we just created. Let’s configure our mongoose connection to Mongo Memory Server and I also listed down some very simple example test cases.

Here’s the list of test cases that we’re going to test against.

*   Insert User into Database successfully. (Test Normal Use Case)
*   Insert User with Invalid Field. (Test on Schema)
*   Insert User without Required Field. (Test on Validation)

You can also refer to the gist below.

```
const mongoose = require('mongoose');
const UserModel = require('../../src/models/user');
const userData = { name: 'TekLoon', gender: 'Male', dob: new Date(), loginUsing: 'Facebook' };

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.gender).toBe(userData.gender);
        expect(savedUser.dob).toBe(userData.dob);
        expect(savedUser.loginUsing).toBe(userData.loginUsing);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.gender).toBeDefined();
    });    
})
```

## Conclusion

In my opinion, developers are always motivated and keen on doing unit testing. But however, the **dependencies mocking** and **configuration** which takes effort and time is always an **_obstacle and demotivation factor_**.

I experienced that myself which I have no clue on how to resolve the dependencies in order to continue the writing of unit test. Lastly, I skipped the unit testing and that was a bad feeling.

Now with all the preset and configuration is ready for you with simple setup, you can write the unit test with minimal effort. Trust me, your unit test will impress your teammates.

> The expressway to build trust with your programmer’s teammates: Write Tests.

Lastly, I hope that this article does inspire you to write your unit test and also giving you information writing unit test could be easier than you imagined.

## References

*   Official Jest [Documentation](https://jestjs.io/docs/en/mongodb) with MongoDB
*   Jest Preset for MongoDB-in-memory server [Github](https://github.com/shelfio/jest-mongodb)

Thanks for reading.