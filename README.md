# APIs for a blogging website
### To Setup Project
* Clone the Project locally
  * git clone https://github.com/arderagarwal/blogsTask
* Open the directory
* Resolve dependencies 
  * npm install
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
* Login for Admin
  * POST http://localhost:8080/admin/login
  * Add userName and password in body
  * JWT token will be returned to be futher used for Authentication  
* View all the blogs
  * Get http://localhost:8080/blogs
* Create a blog
  * POST http://localhost:8080/blogs
  * Header required
     ** Authentication : Bearer <JWT>
  * Body
     ** title, content
  
