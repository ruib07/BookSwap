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
![HomePage](https://github.com/user-attachments/assets/ba47c343-97cb-4c93-a1b5-e0e6a610758b)

Books Page:
![BooksPage](https://github.com/user-attachments/assets/f0370812-a42e-4334-92ed-5e3b521fc568)

Book Details Page:
![BookDetailsPage](https://github.com/user-attachments/assets/9c3c51ce-5ba2-487e-b3e5-5c86c3f94e21)

Add Book Page:
![AddBookPage](https://github.com/user-attachments/assets/128ec79a-5479-4daf-9537-3293e700a39a)

Add Book Image Page:
![AddBookImagePage](https://github.com/user-attachments/assets/aef86f7b-e1d1-4173-a1a2-0c489aa6c994)

Book Transaction:
![BookTransactionPage](https://github.com/user-attachments/assets/c3faa457-efc5-49ae-ae64-98f30829a336)

Profile/My Info Page:
![MyInfoPage](https://github.com/user-attachments/assets/72a26e2e-91a6-4d68-a04a-80642215eb0c)

Profile/My Books Page:
![MyBooksPage](https://github.com/user-attachments/assets/d2be7c48-848f-4981-a6c8-c697439387e6)

Profile/My Reviews Page:
![MyReviewsPage](https://github.com/user-attachments/assets/35095f67-03eb-4e53-abe6-851927f21e7b)

Account Registration Page:
![RegisterUserPage](https://github.com/user-attachments/assets/57901466-9a79-4835-b2cb-71cd8ff5a498)

Login Page:
![LoginPage](https://github.com/user-attachments/assets/e3edb117-e940-41d1-acdf-e160b0ac8522)

PasswordRecovery/Send Email Page:
![RecoverPasswordEmailPage](https://github.com/user-attachments/assets/7153b856-22c0-4f9c-85b8-ec495cf4b46f)

PasswordRecovery/Change Password Page:
![ChangePasswordPage](https://github.com/user-attachments/assets/dc625928-537e-46f7-ab32-d14316e73105)
