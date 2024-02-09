const { MongoClient } = require("mongodb");

const uri = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

async function openConnection(DatabaseName) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    return { client, db: client.db(DatabaseName) };
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}

async function closeConnection(client) {
  try {
    await client.close();
  } catch (err) {
    console.error("Error closing MongoDB connection", err);
    throw err;
  }
}

async function createTable(tableName) {
  let { client, db } = await openConnection(DB_NAME);
  try {
    const collection = db.collection(tableName);
    await collection.createIndex({ key: 1 });
    console.log(`Collection '${tableName}' created successfully.`);
    return collection;
  } catch (err) {
    console.error(`Error creating collection '${tableName}':`, err);
    throw err;
  } finally {
    if (client) {
      await closeConnection(client);
    }
  }
}

async function insertData(data, tableName) {
  let { client, db } = await openConnection(DB_NAME);
  try {
    const table = await db.collection(tableName);
    const result = await table.insertOne(data);
    console.log("Data inserted successfully:", result.insertedId);
    return result.insertedId;
  } catch (err) {
    console.error("Error inserting data:", err);
    throw err;
  } finally {
    if (client) {
      await closeConnection(client);
    }
  }
}

async function modifyData(filter, update, tableName) {
  let { client, db } = await openConnection(DB_NAME);
  try {
    const table = await db.collection(tableName);
    const result = await table.updateOne(filter, { $set: update });
    console.log("Data modified successfully:", result.modifiedCount);
    return result.modifiedCount;
  } catch (err) {
    console.error("Error modifying data:", err);
    throw err;
  } finally {
    if (client) {
      await closeConnection(client);
    }
  }
}

async function removeData(filter, tableName) {
  let { client, db } = await openConnection(DB_NAME);
  try {
    const table = await db.collection(tableName);
    const result = await table.deleteOne(filter);
    console.log("Data removed successfully:", result.deletedCount);
    return result.deletedCount;
  } catch (err) {
    console.error("Error removing data:", err);
    throw err;
  } finally {
    if (client) {
      await closeConnection(client);
    }
  }
}

async function findFirst(filter, tableName) {
  let { client, db } = await openConnection(DB_NAME);
  try {
    const table = await db.collection(tableName);
    const result = await table.findOne(filter);
    return result;
  } catch (err) {
    console.error("Error finding data by key:", err);
    throw err;
  } finally {
    if (client) {
      await closeConnection(client);
    }
  }
}

async function findAll(filter, tableName, callback) {
  let { client, db } = await openConnection(DB_NAME);
  try {
    const table = await db.collection(tableName);
    const result = await table.find(filter).toArray();
    if (callback) return callback(await result);
    else return result;
  } catch (err) {
    console.error("Error finding data by key:", err);
    throw err;
  } finally {
    if (client) {
      await closeConnection(client);
    }
  }
}

module.exports = {
  createTable,
  insertData,
  modifyData,
  removeData,
  findFirst,
  findAll,
};
