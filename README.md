# socialnetwork_mongo

TODO:
Users

- GET all users (DONE)
- GET single user by \_id and populated thought and friend
- POST a new user
- PUT update a user by \_id
- DELETE user by \_id (bonus - remove user's associated thoughts)

User's friend's

- POST add new friend to user friend list
- DELETE friend from user friend list

Thoughts

- GET all thoughts
- GET single thought by id
- POST create new thought and push to user's thoughts array field
- PUT update thought by \_id
- DELETE remove thought by \_id

Reactions

- POST reaction stored in single thought's reactions array field
- DELETE pull and remove a reaction by reactionId val
