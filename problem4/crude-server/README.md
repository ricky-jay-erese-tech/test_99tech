# CRUD Server with Express & MongoDB

## Requirements
Before running the project, ensure you have the following installed:

- **MongoDB Compass** (GUI for MongoDB)
- **MongoDB Database** installed on your system
- **Command Prompt (cmd) / Terminal**

---

## Setting Up & Running the Server

### **1️. Start MongoDB**
Navigate to the database folder level and start MongoDB:
```sh
mongod.exe --dbpath db
```

### **2️. Install Dependencies & Start Server**
Navigate to the project root level (`crude-server`) and run:
```sh
npm install
npm run dev
```

This will start the Express server on **http://localhost:5000**.

---

## Testing the Server with `curl`
Use the following `curl` commands in **Command Prompt (cmd)** or **Terminal** to test the API.

### Create a Document
```sh
curl -X POST http://localhost:5000/api/resources \
     -H "Content-Type: application/json" \
     -d "{\"name\": \"Test Resource\", \"description\": \"Sample Description\"}"
```

### Get All Documents
```sh
curl -X GET http://localhost:5000/api/resources
```

### Update a Document
Replace `{id}` with the actual document ID:
```sh
curl -X PUT http://localhost:5000/api/resources/{id} \
     -H "Content-Type: application/json" \
     -d "{\"name\": \"Updated Name\"}"
```

### Delete a Document
Replace `{id}` with the actual document ID:
```sh
curl -X DELETE http://localhost:5000/api/resources/{id}
```

---

## Verify Data in MongoDB Compass
1. Open **MongoDB Compass**
2. Connect to **`mongodb://localhost:27017`**
3. Navigate to **`cruddb > resources`**
4. Verify that your data has been stored successfully 

---

## Done!
Your Express.js CRUD API is now up and running with MongoDB!