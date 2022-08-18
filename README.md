# socialnetwork_mongo

TODO:
Users

- GET all users (DONE)
- GET single user by \_id and populated thought and friend
- POST a new user (DONE)
- PUT update a user by \_id
- DELETE user by \_id (bonus - remove user's associated thoughts) (DONE)

User's friend's

- POST add new friend to user friend list (DONE)
- DELETE friend from user friend list

Thoughts

- GET all thoughts (DONE)
- GET single thought by id (DONE)
- POST create new thought and push to user's thoughts array field (DONE)
- PUT update thought by \_id
- DELETE remove thought by \_id

Reactions

- POST reaction stored in single thought's reactions array field
- DELETE pull and remove a reaction by reactionId val
