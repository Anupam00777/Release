const { MongoClient } = require("mongodb");

const uri = process.env.DB_URI;

async function openConnection(DatabaseName) {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    return client.db(DatabaseName);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err; // Throw error to be caught by caller
  }
}

async function closeConnection(client) {
  try {
    await client.close();
  } catch (err) {
    console.error("Error closing MongoDB connection", err);
    throw err; // Throw error to be caught by caller
  }
}

async function createTable(tableName, db) {
  try {
    const collection = db.collection(tableName);
    await collection.createIndex({ key: 1 });
    console.log(`Collection '${tableName}' created successfully.`);
    return collection;
  } catch (err) {
    console.error(`Error creating collection '${tableName}':`, err);
    throw err; // Throw error to be caught by caller
  }
}

async function insertData(data, table) {
  try {
    const result = await table.insertOne(data);
    console.log("Data inserted successfully:", result.insertedId);
    return result.insertedId;
  } catch (err) {
    console.error("Error inserting data:", err);
    throw err; // Throw error to be caught by caller
  }
}

async function modifyData(filter, update, table) {
  try {
    const result = await table.updateOne(filter, { $set: update });
    console.log("Data modified successfully:", result.modifiedCount);
    return result.modifiedCount;
  } catch (err) {
    console.error("Error modifying data:", err);
    throw err; // Throw error to be caught by caller
  }
}

async function removeData(filter, table) {
  try {
    const result = await table.deleteOne(filter);
    console.log("Data removed successfully:", result.deletedCount);
    return result.deletedCount;
  } catch (err) {
    console.error("Error removing data:", err);
    throw err; // Throw error to be caught by caller
  }
}

async function findFirst(filter, table) {
  try {
    const result = await table.findOne(filter);
    return result;
  } catch (err) {
    console.error("Error finding data by key:", err);
    throw err; // Throw error to be caught by caller
  }
}

async function findAll(filter, table, callback) {
  try {
    const result = await table.find(filter).toArray();
    if (callback) return callback(await result);
    else return result;
  } catch (err) {
    console.error("Error finding data by key:", err);
    throw err; // Throw error to be caught by caller
  }
}

module.exports = {
  openConnection,
  closeConnection,
  createTable,
  insertData,
  modifyData,
  removeData,
  findFirst,
  findAll,
};
