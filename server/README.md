# Backend for social media app 'SocialSphere'

## Node js using Express js and Mongodb

### API Endpoints

base = <domain>/api/v1

auth: /auth -->
POST /login
POST /register

user: /user -->
GET /:userId
PATCH /:userId/
GET /:userId/friends
PATCH /:userId/friends/:friendId (if not friend, make friend else unfriend)

posts: /posts -->
GET /
GET /:userId
POST /:userId
PATCH /:postId/:userId/like (if not liked, like else unlike)
POST /:postId/:userId/comment
DEL /:postId/:userId/comment
GET /:postId/commentedUsers

### Schemas

#### User schema:

id
full name
email
password
imagePath
bio
location
dob
gender
contact
friends
timestamp

#### Post schema:

id
userId
desc
imagePath
searchTag
likes
comments
timestamp
