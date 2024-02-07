/**
 * Database handler class for MongoDB.
 * Provides methods for creating, selecting, inserting, modifying, and removing data,
 * as well as finding data by key and retrieving all data from a table.
 */
const { MongoClient } = require("mongodb");

class DATABASE {
  #uri; // Private field to store MongoDB connection URI

  /**
   * Constructor for the DATABASE class.
   * @param {string} DatabaseName - The name of the database.
   */
  constructor(DatabaseName) {
    this.#uri = process.env.DB_URI; // Store the MongoDB connection URI from environment variables
    this.client = new MongoClient(this.#uri); // Create a new MongoDB client
    this.db = this.openConnection(DatabaseName); // Open a connection to the specified database
    this.table; // Property to store the selected table
  }

  /**
   * Creates a new collection in the database.
   * @param {string} tableName - The name of the collection to create.
   * @returns {Promise<object>} A promise that resolves to the created collection.
   */
  createTable = async (tableName) => {
    try {
      const collection = this.db.collection(tableName); // Get the collection from the database
      await collection.createIndex({ key: 1 }); // Create an index on 'key' for faster lookups
      console.log(`Collection '${tableName}' created successfully.`);
      return collection;
    } catch (err) {
      console.error(`Error creating collection '${tableName}':`, err);
    }
  };

  /**
   * Selects a table/collection in the database.
   * @param {string} tableName - The name of the table/collection to select.
   */
  selectTable = (tableName) => {
    try {
      this.table = this.db.collection(tableName); // Set the 'table' property to the selected collection
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Inserts data into the selected table/collection.
   * @param {object} data - The data to insert.
   * @returns {Promise<string>} A promise that resolves to the ID of the inserted document.
   */
  insertData = async (data) => {
    try {
      if (!this.table) return false;
      const result = await this.table.insertOne(data); // Insert data into the collection
      console.log("Data inserted successfully:", result.insertedId);
      return result.insertedId;
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  };

  /**
   * Method to modify data in the selected table/collection based on a filter.
   * @param {object} filter - The filter to apply for modification.
   * @param {object} update - The update to apply.
   * @returns {Promise<number>} A promise that resolves to the count of modified documents.
   */
  modifyData = async (filter, update) => {
    try {
      if (!this.table) return false;
      const result = await this.table.updateOne(filter, { $set: update });
      console.log("Data modified successfully:", result.modifiedCount);
      return result.modifiedCount;
    } catch (err) {
      console.error("Error modifying data:", err);
    }
  };

  /**
   * Method to remove data from the selected table/collection based on a filter.
   * @param {object} filter - The filter to apply for removal.
   * @returns {Promise<number>} A promise that resolves to the count of deleted documents.
   */
  removeData = async (filter) => {
    try {
      if (!this.table) return false;

      const result = await this.table.deleteOne(filter);
      console.log("Data removed successfully:", result.deletedCount);
      return result.deletedCount;
    } catch (err) {
      console.error("Error removing data:", err);
    }
  };

  /**
   * Method to find the first document in the selected table/collection based on a filter.
   * @param {object} filter - The filter to apply for the search.
   * @returns {Promise<object>} A promise that resolves to the found document.
   */
  findFirst = async (filter) => {
    try {
      if (!this.table) return false;

      const result = await this.table.findOne(filter);
      return result;
    } catch (err) {
      console.error("Error finding data by key:", err);
    }
  };

  /**
   * Method to find all documents in the selected table/collection based on a filter.
   * @param {object} filter - The filter to apply for the search.
   * @param {function} callback - Optional callback function to process the results.
   * @returns {Promise<object[]|*>} A promise that resolves to an array of documents or the result of the callback function.
   */
  findAll = async (filter, callback) => {
    try {
      if (!this.table) return false;

      const result = await this.table.find(filter).toArray();
      if (callback) return callback(await result);
      else return result;
    } catch (err) {
      console.error("Error finding data by key:", err);
    }
  };

  /**
   * Opens a connection to the MongoDB database.
   * @param {string} DatabaseName - The name of the database to connect to.
   * @returns {object} The database object.
   */
  openConnection = (DatabaseName) => {
    try {
      this.client.connect(); // Connect to the MongoDB server
      return this.client.db(DatabaseName); // Return the database object
    } catch (err) {
      console.error("Error connecting to MongoDB", err);
    }
  };

  /**
   * Closes the connection to the MongoDB database.
   */
  closeConnection = () => {
    this.client.close(); // Close the MongoDB client connection
  };
}

module.exports = { DATABASE };
