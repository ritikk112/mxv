const axios = require("axios");

const BASE_URL = "https://acs.postman-beta.tech/api/v1/object-groups";
const token = 'YWxpYmFiYToyU1F2VHg0WUNRM0ZlazU3cDhmRw==';
const PARALLEL_RUNS = 2;

function generateRandomID() {
  return Math.random().toString(36).substr(2, 10);  // Generate random alphanumeric string
}

async function makeApiCall(body) {
  try {
    const response = await axios.post(BASE_URL, body, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error making API call", error);
    return null;
  }
}

async function main() {
  const apiCalls = Array(PARALLEL_RUNS).fill(null).map(() => ({
    object: {
      type: "workspace",
      id: generateRandomID()
    }
  }));

  const responses = await Promise.all(apiCalls.map(body => makeApiCall(body)));

  // Display the responses
  responses.forEach((response, index) => {
    if (response) {
      console.log(`Data from API ${index + 1}:`, response.status);
    }
  });
}

main();
