# APIs for a blogging website
### To Setup Project
* Clone the Project locally
  * git clone https://github.com/arderagarwal/blogsTask
* Open the directory
* Resolve dependencies 
  * npm start
* Start mongo server on port 27017
* Start server
  * node src/index
### Endpoints
* Creating Users
  * POST http://localhost:8080/users
  * Add userName and password in body
* Login for users
  * POST http://localhost:8080/users/login
  * Add userName and password in body
  * JWT token will be returned to be futher used for Authentication
  
