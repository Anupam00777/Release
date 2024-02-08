const { insertData, modifyData, findFirst } = require("./dbHandler");
const bcrypt = require("bcrypt");

const DB_NAME = process.env.DB_NAME;
const DB_USERS_TABLE = process.env.DB_USERS_TABLE;

/**
 * Function to add a new entry to the database.
 * @param {object} entry - The entry to add, including email, password, and hashtoken.
 * @returns {Promise<string|boolean>} A promise that resolves to the ID of the inserted entry or false if an error occurs.
 */
const addEntry = async ({ email, password, hashtoken }) => {
  try {
    return await insertData(
      {
        email: email,
        password: await bcrypt.hash(password, 10), // Hash the password before storing
        hashtoken: hashtoken,
      },
      DB_USERS_TABLE
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Function to modify an existing entry in the database.
 * @param {object} entry - The filter to find the entry to modify.
 * @param {object} updatedEntry - The updated entry data.
 * @returns {Promise<number|boolean>} A promise that resolves to the count of modified entries or false if an error occurs.
 */
const modifyEntry = async (entry, updatedEntry) => {
  try {
    return await modifyData(entry, updatedEntry, DB_USERS_TABLE);
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Function to check if an entry exists in the database.
 * @param {object} entry - The entry to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the entry exists, false otherwise.
 */
const entryExist = async (entry) => {
  try {
    const expr = await findFirst(entry, DB_USERS_TABLE);
    return expr !== null && expr !== undefined;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Function to get an entry from the database.
 * @param {object} entry - The entry to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the retrieved entry or null if not found.
 */
const getEntry = async (entry) => {
  try {
    return await findFirst(entry, DB_USERS_TABLE);
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Function to validate a password against the hashed password stored in the database.
 * @param {object} entry - The entry to retrieve the hashed password from.
 * @param {string} password - The password to validate.
 * @returns {Promise<boolean>} A promise that resolves to true if the password is valid, false otherwise.
 */
const validatePassword = async (entry, password) => {
  try {
    const user = await getEntry(entry);
    return user ? await bcrypt.compare(password, user.password) : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  addEntry,
  modifyEntry,
  entryExist,
  getEntry,
  validatePassword,
};
