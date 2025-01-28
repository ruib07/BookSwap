To run this project, you have to complete the following steps:

- Create a .env file with the database credentials you want and one .env file on the frontend with the api url
- Install Docker and run a terminal on the backend folder the following command: docker compose --env-file env/test.env up -d
- Create a user with password and a database on postgres
- Install the postgres extension on VS Code
- Connect to the server where your database is
- Go to services/passwordReset.js and change line 23 to your email
- On the backend file, run the following commands:
  - npm i
  - npm run knex:migrate:test
  - npm run test
  - npm run start:test
- Open a terminal on the react frontend folder and run: npm i and npm start

With this steps, you can have the project on your computer without any problem. Have a great day 😄

Home Page:
<img width="1702" src="![home](HomePage.png)">

Books Page:
<img width="1703" src="![books](BooksPage.png)">

Book Details Page:
<img width="1706" src="![bookdetails](BookDetailsPage.png)">

Add Book Page:
<img width="1704" src="![addbook](AddBookPage.png)">

Add Book Image Page:
<img width="1706" src="![addbookimage](AddBookImagePage.png)">

Book Transaction:
<img width="1706" src="![booktransaction](BookTransactionPage.png)">

Profile/My Info Page:
<img width="1706" src="![myinfo](MyInfoPage.png)">

Profile/My Books Page:
<img width="1706" src="![mybooks](MyBooksPage.png)">

Profile/My Reviews Page:
<img width="1706" src="![myreviews](MyReviewsPage.png)">

Account Registration Page:
<img width="1706" src="![accountregistration](RegisterUserPage.png)">

Login Page:
<img width="1706" src="![login](LoginPage.png)">

PasswordRecovery/Send Email Page:
<img width="1706" src="![sendemail](RecoverPasswordEmailPage.png)">

PasswordRecovery/Change Password Page:
<img width="1703" src="![changepassword](ChangePasswordPage.png)">
