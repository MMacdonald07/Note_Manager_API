# Note_Manager_API
This REST API works very similarly to my task manager API, allowing the user to create a profile for which they can add notes that are stored in a MongoDB database. The user will also have the ability to read, update and delete their profile and the notes created. This API comes with its own authentication system so that the user can log into their exisiting profile with a POST request, preventing any other users from tampering with a profile they don't have access to the credentials for. Furthermore, passwords are hashed for security purposes prior to storing them in the database.

## Installation

### Clone
Clone this repository to your machine using https://github.com/MMacdonald07/Note_Manager_API.git

### Setup
This API requires MongoDB to be installed and active so a database can be altered while the program is running. This can be done [here](https://docs.mongodb.com/manual/administration/install-community).

Use the package manager npm to install prerequisite node modules so the program can run:

```bash
npm install
```

After this, some environmental variables will need setting up: the port \(can set to 3000\), your json webtoken secret, sendgrid API key and your MongoDB database URL \(can set to mongodb://127.0.0.1:27017/notes-manager\).

## Usage
To open the program ordinarily on your device:

```bash
npm run start
```

Developer mode can also be used - this will run the script with nodemon so the server is restarted upon saving a file:

```bash
npm run dev
```

From here, load localhost:3000 on an API client e.g. Postman.

In Postman, set up an environmental variable of "authToken" and add the following code to "Tests" for the Create user request:

```bash
if (pm.response.code === 201) {
    pm.environment.set('authToken', pm.response.json().token) 
}
```

For login user:

```bash
if (pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().token) 
}
```

From here, select no authorization for both requests and the remainder of requests to inherit authorization from parent. This will set up the authentication so all requests can be made as long as the user is logged in.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.