# API

## Run Server

---

-   run: `cd api`
-   run: `npm install`
-   run: `npx prisma generate`
-   create `.env` file
-   copy environment variables
-   set `DATABASE_URL="postgresql://user:passoword@localhost:5432/compsigh"`  
    `user`: your postgres user  
    `password`: the password fot that user  
    `5432`: the default port, change it if necessary
-   run your postgres server
-   run: `npx prisma migrate dev -n init`
-   run: `npm run dev`

---

## SwaggerUI

<http://localhost:8080/api/v1/docs>

### Send Request:

---

-   open an endpoint
-   hit the **Try it out** button
-   fill out the body and/or url params (required fields are indicated as: **\*required**)
-   hit the **Execute** button
-   **Note:** endpoints that require authentication have a **lock** logo

### SignIn

---

-   send request `POST /auth/signin` with appropiate credentials (`email` and `password`)
-   on sucess response body should contain an `accessToken` field and status code **200 Ok**
-   copy `accessToken` (without quotes)
-   hit the **Authorize** button located at the upper right corner of the page
-   on the value field type the word `Bearer`
-   type a space `" "`
-   paste the previously copied `accessToken`
-   hit the **Authorize** button
-   you are signed in!

### SignUp

---

-   send request `POST /auth/signup` with appropiate information (**body**)
-   on sucess the response body should be **empty** and status code **201 Created**
-   an email shoud be sent with verification `code` (the email is printed to the api console for now).
-   copy the `code`
-   send request `POST /auth/email/verify` (with `email` and `code`)
-   this request works exactly like **SignIn**

---
