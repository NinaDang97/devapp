# devapp
* Overview

* Demo

### Endpoint - Method - Description
#### User API
* `'/api/users/signup' - POST` - Signup user
* `'/api/users/login' - POST` - Login user

#### Profile API
* `'/api/profile' - GET` - Get current user's profile
* `'/api/profile' - POST` - Create/Edit profile
* `'/api/profile' - DELETE` - Delete current user's profile and account
* `'/api/profile/all' - GET` - Get all profile
* `'/api/profile/handle/:handle' - GET` - Get profile by handle
* `'/api/profile/user/:user_id' - GET` - Get profile by _id
* `'/api/profile/experience' - POST` - Add experience to current profile
* `'/api/profile/education' - POST` - Add education to current profile
* `'/api/profile/experience/:exp_id' - DELETE` - Delete experience from current user's profile
* `'/api/profile/education/:edu_id' - DELETE` - Delete education from current user's profile

