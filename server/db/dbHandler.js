const { MongoClient } = require("mongodb");

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
let cachedDb = null;

/**
 * Opens a connection to the MongoDB database.
 * @returns {object} An object containing the database.
 */
async function openConnection() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  cachedDb = db;
  return db;
}

/**
 * Closes the connection to the MongoDB database.
 * @param {object} client - The MongoDB client object.
 */
async function closeConnection(client) {
  try {
    await client.close();
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

/**
 * Creates a new collection in the database.
 * @param {string} tableName - The name of the collection to create.
 * @returns {object} The created collection.
 */
async function createTable(tableName) {
  let db = await openConnection(dbName);
  try {
    const collection = db.collection(tableName);
    await collection.createIndex({ key: 1 });
    console.log(`Collection '${tableName}' created successfully.`);
    return collection;
  } catch (error) {
    console.error(`Error creating collection '${tableName}':`, error);
    throw error;
  }
}

/**
 * Inserts data into the specified collection.
 * @param {object} data - The data to insert.
 * @param {string} tableName - The name of the collection.
 * @returns {string} The ID of the inserted document.
 */
async function insertData(data, tableName) {
  let db = await openConnection(dbName);
  try {
    const collection = db.collection(tableName);
    const result = await collection.insertOne(data);
    console.log("Data inserted successfully:", result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}

/**
 * Modifies data in the specified collection.
 * @param {object} filter - The filter for matching documents.
 * @param {object} update - The update to apply to matching documents.
 * @param {string} tableName - The name of the collection.
 * @returns {number} The number of documents modified.
 */
async function modifyData(filter, update, tableName) {
  let db = await openConnection(dbName);
  try {
    const collection = db.collection(tableName);
    const result = await collection.updateOne(filter, { $set: update });
    console.log("Data modified successfully:", result.modifiedCount);
    return result.modifiedCount;
  } catch (error) {
    console.error("Error modifying data:", error);
    throw error;
  }
}

/**
 * Removes data from the specified collection.
 * @param {object} filter - The filter for matching documents.
 * @param {string} tableName - The name of the collection.
 * @returns {number} The number of documents removed.
 */
async function removeData(filter, tableName) {
  let db = await openConnection(dbName);
  try {
    const collection = db.collection(tableName);
    const result = await collection.deleteOne(filter);
    console.log("Data removed successfully:", result.deletedCount);
    return result.deletedCount;
  } catch (error) {
    console.error("Error removing data:", error);
    throw error;
  }
}

/**
 * Finds the first document matching the specified filter in the specified collection.
 * @param {object} filter - The filter for matching documents.
 * @param {string} tableName - The name of the collection.
 * @returns {object} The first matching document.
 */
async function findFirst(filter, tableName) {
  let db = await openConnection(dbName);
  try {
    const collection = db.collection(tableName);
    return await collection.findOne(filter);
  } catch (error) {
    console.error("Error finding data by key:", error);
    throw error;
  }
}

/**
 * Finds all documents matching the specified filter in the specified collection.
 * @param {object} filter - The filter for matching documents.
 * @param {string} tableName - The name of the collection.
 * @param {function} callback - The callback function to execute on the result.
 * @returns {Array} An array of matching documents.
 */
async function findAll(filter, tableName, callback) {
  let db = await openConnection(dbName);
  try {
    const collection = db.collection(tableName);
    const result = await collection.find(filter).toArray();
    return callback ? callback(result) : result;
  } catch (error) {
    console.error("Error finding data by key:", error);
    throw error;
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
