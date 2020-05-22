---
title: "Sequelize Logging"
date: "2020-05-11"
tags:
  - javascript
  - nodejs
---

Did you know Sequelize Logging enabled by default? That's why you are able to see your SQL query in your terminal console like below.

```
Executing (default): SELECT `id`, `name`, `address`, `age`, `gender` FROM `client`;
```

However, did you know that what you're looking is only the small subset of the logging?

## Can I retrieve more sequelize logging?

You can see more logging information by spreading the parameters.

```
const sequelize = new Sequelize(
    'database',
    'username',
    'password', 
    {
        logging: (...msg) => {
            console.log(msg);
        },
    },
);

// Sample Output of Sequelize Logging
[ SELECT `id`, `name`, `address`, `age`, `gender` FROM `client`,
  { plain: true,
    raw: false,
    logging: [Function: logging],
    showWarnings: false,
    where: ...,
    originalAttributes:
     [ 'id', 'age' ... ],
    attributes:
     [ 'id', 'name', 'age'... ],
    tableNames: [ 'client' ],
    type: 'SELECT',
    model: client } ]
```

## Can I disable the sequelize logging? (It disturb me during debug)

Disable logging is easy as you can just set the logging to `false` like below.

```
const sequelize = new Sequelize(
    'database',
    'username',
    'password', 
    {
        logging: false,
    },
);
```