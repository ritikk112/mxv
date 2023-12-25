const axios = require("axios");
const fs = require("fs");

async function makeApiCall(url, body) {
  try {
    const response = await axios.post(url, body, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return response;
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
    return null;
  }
}

async function main() {
  const apiCalls = [
    {
      url: "https://acs.postman-beta.tech/api/v1/object-groups",
      body: {
        object: {
          type: "workspace",
          id: "4h3u783-434j-1xcf",
        },
      },
    },
    {
      url: "https://acs.postman-beta.tech/api/v1/object-groups",
      body: {
        object: {
          type: "workspace",
          id: "4h3u783-434j-2xcf",
        },
      },
    },
    {
      url: "https://acs.postman-beta.tech/api/v1/object-groups",
      body: {
        object: {
          type: "workspace",
          id: "4h3u783-434j-3xcf",
        },
      },
    },
    {
      url: "https://acs.postman-beta.tech/api/v1/object-groups",
      body: {
        object: {
          type: "workspace",
          id: "4h3u783-434j-4xcf",
        },
      },
    },
    {
      url: "https://acs.postman-beta.tech/api/v1/object-groups",
      body: {
        object: {
          type: "workspace",
          id: "4h3u783-434j-5xcf",
        },
      },
    },
  ];

  const responses = await Promise.all(
    apiCalls.map((call) => makeApiCall(call.url, call.body))
  );

  // Save the responses
  responses.forEach((response, index) => {
    if (response) {
      console.log(`Data from API ${index + 1}:`, response.status);
    }
  });
}

main();
