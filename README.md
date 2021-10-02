# **Favorite Restaurant List**

## **Features**
### CRUD
- Create
  - Create new favorite restaurant
- Read
  - View all restaurants stored in Server
  - View individual restaurant by clicking **image** or **Detail** button
  - Sort list by restaurant **name** or **rating**
  - Filter restaurants by **rating** or **category**
- Update
  - Edit restaurant info by clicking **Edit** button 
- Delete
  - Delete restaurant


# **Building Environment**

- [Node.js   v4.17.1LTS](https://nodejs.org/en/)  
- [npm   v6.14.15](https://www.npmjs.com/)    
- [MongoDB v4.2.15](https://www.mongodb.com/try/download/community)
- [Robot3T v1.1.4](https://robomongo.org/)

## **Modules Installed**
```json
"dependencies": {
    "express": "^4.17.1",
    "express-handlebars": "^5.3.4",
    "method-override": "^3.0.0",
    "mongoose": "^6.0.7"
  }
  ```
# **How to use**
1. Clone project via local terminal via Github [link](https://github.com/JackJackHuo/RestaurantList_CRUD.git)

> `$ git clone https://github.com/JackJackHuo/RestaurantList_CRUD.git`

2. Install modules required for this project ,listed in package.json

> `$ npm install`

3. 1 Initiate express server

> `$ npm run start`

3. 2 if you want to update server automatically whenever code is being modified. Please install nodemon in advance

> `$ npm install -g nodemon `
> `$ npm run dev`

4. Open browser and key in url **localhpst:3000**





