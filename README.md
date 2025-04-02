# End-to-End Testing 🚀

## Introduction 📋

This is a simple web application with the following features:

- A login page where users can enter their username and password to login. 🔐
- A home page where users can see a counter and perform the following actions:
    - Increment the counter ➕
    - Decrement the counter ➖
    - Reset the counter 🔄
    - Logout 🚪

## End-to-End Tests 🧪

End-to-end tests for the application are written using **Playwright**. The tests cover the following scenarios:

### Test 1: Login Flow 🔑

- Visit the login page
- Enter the username and password
- Click the login button
- Verify that the user is redirected to the home page if the login is successful
- Verify that the user sees an error message if the login is unsuccessful

### Test 2: Counter Functionality 🔢

- Visit the home page
- Verify that every click on the increment button increments the counter value by 1
- Verify that every click on the decrement button decrements the counter value by 1
- Verify that the reset button resets the counter value to 0

### Test 3: Logout Functionality 🚪

- Visit the home page
- Logout the user
- Verify that the user is redirected to the login page
- Verify that the user cannot access the home page and is redirected to the login page if not logged in

## Setup 🛠️

### Prerequisites 📦

- Node.js
- npm
- Playwright

### Installation 💻

1. Clone the repository:
    ```sh
    git clone https://github.com/dev-bhadani/e2e-tests.git
    cd e2e-tests
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the Application ▶️

To start the application in development mode:
```sh
  npm start
```
This will start the application on `http://localhost:3000`.

### Running the Tests 🧪
To run the end-to-end tests, use the following command:
```sh
  npm playwright test
```
