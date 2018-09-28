# devapp
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

#### Post API

* `'/api/posts' - GET`- Get all posts
* `'/api/posts' - POST`- Create new post
* `'/api/posts/:post_id' - GET` - Get specific post
* `'/api/posts/:post_id' - DELETE` - Delete specific post
* `'/api/posts/like/:post_id' - POST`- Like post
* `'/api/posts/unlike/:post_id' - POST`-Unlike post
* `'/api/posts/comment/:post_id' - POST`- Add comment to post
* `'/api/posts/comment/:post_id/:comment_id' - DELETE`- Delete comment

##### Inspired by MERN Stack Front To Back: Full Stack React, Redux & Node.js - Brad Traversy
