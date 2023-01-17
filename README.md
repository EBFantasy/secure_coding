## SE 2 | StartUP

**command : npm run all (or you can enter "npm run lint && npm run build && npm run start && individually")**



## SE 2 | 2.2 Project

**Question 1**: Why should you reset the database before each test case? Give examples of issues you may meet otherwise.

To exclude the effect of data that already exists in the database. For example, if we already have a piece of data in the database that is the same as the one we are going to insert, this will cause the test process to go smoothly even if our function to insert into the database does not succeed.



## SE 2 | 2.3 Project

**Question 2**: What kind of error is currently thrown in test case "should raise error if email is missing"? Is it an SQL error (occurring in the database server) or a validation error before the query got executed? What should it be, so it is easy and secure to format an error message to the end user (considering security, message internationalisation, etc.)?

The missing email message is an SQL error that occurs after the query operation is executed.



## SE 2 | 2.4 Project

**Question 3**: why do we need both a database constrain and a validation in typescript for the same check?

First of all, it is necessary to add constraints to the database and to perform validation in the program, which ensure the integrity and consistency of the database data. However, relying on database constraints alone is not enough. Programs can write data in the database using non-correct methods, or third-party applications may write incorrect data to the database. In such cases, in-program validation can prevent non-compliant data from entering the database at the program level.



## SE 2 | 3.1 Project

**Question 1**: please write a small paper about that naming convention.

REST endpoint naming conventions is a way of defining resources in RESTful API. These conventions usually include:

- using nouns instead of verbs,
- using plural forms to represent collections
- using short, descriptive names, etc. 

These conventions help to make the API more readable and understandable, and also help to use standard HTTP methods (such as GET, POST, PUT and DELETE) to operate on resources. 



**Question 2**: considering they use REST naming convention, what would do `POST /web-api/users` and `POST /web-api/sessions` endpoints?

- The POST /web-api/users endpoint may be used to create a new user.
- The POST /web-api/sessions endpoint may be used to create a new session.