const { insertData, modifyData, findFirst } = require("./dbHandler");
const bcrypt = require("bcrypt");

const DB_USERS_TABLE = process.env.DB_USERS_TABLE;

/**
 * Adds a new entry to the database.
 * @param {object} entry - The entry to add, including email, password, and hashtoken.
 * @returns {Promise<string|boolean>} The ID of the inserted entry or false if an error occurs.
 */
const addEntry = async ({ email, password, hashtoken }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await insertData(
      { email: email, password: hashedPassword, hashtoken: hashtoken },
      DB_USERS_TABLE
    );
  } catch (error) {
    console.error("Error adding entry:", error);
    return false;
  }
};

/**
 * Modifies an existing entry in the database.
 * @param {object} filter - The filter to find the entry to modify.
 * @param {object} updatedEntry - The updated entry data.
 * @returns {Promise<number|boolean>} The count of modified entries or false if an error occurs.
 */
const modifyEntry = async (filter, updatedEntry) => {
  try {
    return await modifyData(filter, updatedEntry, DB_USERS_TABLE);
  } catch (error) {
    console.error("Error modifying entry:", error);
    return false;
  }
};

/**
 * Checks if an entry exists in the database.
 * @param {object} entry - The entry to check.
 * @returns {Promise<boolean>} True if the entry exists, false otherwise.
 */
const entryExist = async (entry) => {
  try {
    const foundEntry = await findFirst(entry, DB_USERS_TABLE);
    return !!foundEntry;
  } catch (error) {
    console.error("Error checking entry existence:", error);
    return false;
  }
};

/**
 * Retrieves an entry from the database.
 * @param {object} entry - The entry to retrieve.
 * @returns {Promise<object|null>} The retrieved entry or null if not found.
 */
const getEntry = async (entry) => {
  try {
    return await findFirst(entry, DB_USERS_TABLE);
  } catch (error) {
    console.error("Error retrieving entry:", error);
    return null;
  }
};

/**
 * Validates a password against the hashed password stored in the database.
 * @param {object} entry - The entry to retrieve the hashed password from.
 * @param {string} password - The password to validate.
 * @returns {Promise<boolean>} True if the password is valid, false otherwise.
 */
const validatePassword = async (entry, password) => {
  try {
    const user = await getEntry(entry);
    return user ? await bcrypt.compare(password, user.password) : false;
  } catch (error) {
    console.error("Error validating password:", error);
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
