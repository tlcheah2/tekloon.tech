---
title: "How to Perform Upsert in Mongoose"
date: "2020-09-19"
tags:
  - nodejs

---

This post discussed how you can perform bulk upsert with Mongoose. Upsert is the combination of insert and update, if it is a new record, it will perform the **CREATE** operation while if the existing record found, it will **UPDATE** on the existing record.

Without further ado, let's start.

## Upsert in Mongoose

Learning is enhanced with a real case study. Imagine that you are the Backend Developer for a job portal. Here is the given requirement:

- Candidates are able to add new working experience and edit their existing working experiences.

```javascript
const mongoose = require('mongoose');

const workExpSchema = mongoose.Schema({
  experience_id: {
    type: Number,
    index: true,
    required: true,
  },
  jobTitle: String,
  jobDescription: String,
  startDate: Date,
  endDate: Date,
});

const WorkExp = mongoose.model('work_experience', workExpSchema);

module.exports = {
  WorkExp,
};
```

We can easily use the API provided by Mongoose `findOneAndUpdate` to perform the upsert by simply setting the option `{ upsert: true }`. Refer to the code below.

```json
const { WorkExp } = require('../models/workExperience');

const sampleWorkExp = {
  experience_id: 1,
  jobTitle: 'Backend Developer',
  jobDescription: 'Responsible in developing API - ...'
};

const filter = { experience_id: sampleWorkExp.experience_id };

const upsertedWorkExperiences = await WorkExp.findOneAndUpdate(filter, sampleWorkExp, {
	new: true, // Always returning updated work experiences.
	upsert: true, // By setting this true, it will create if it doesn't exist
	projection: { _id: 0, __v: 0 }, // without return _id and __v
});
```

## Conclusion

Here are the key points of this article.

- We can perform upsert using `findOneAndUpdate` in Mongoose.
- By simply setting option `{ upsert: true }`, we can have both update and insert functions.

Thank you for reading. See you in the next article.

## References

- [Mongoose - findOneAndUpate](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate)