# awork Test Automation Project

This project contains automated tests for the awork web UI and API (project entity creation), demonstrating CRUD operations and a simple UI flow testing.

## Project Structure

```
project-root/
│
├── API Tests/
│   └── project.test.js
│
├── UI Tests/
│   └── project.test.js
│
├── api.js
├── config.js
├── jest.config.js
└── README.md
```

## Setup

1. Sign up for a free 14-day trial of awork at https://app.awork.com and set up your workspace with a basic project.
2. Go to `Settings` → `Integrations` and create a new API client under `API access`.
3. Click `…` in the list and `Manage API keys` to copy the API key.
4. Clone this repository to your local machine.
5. Install dependencies:

   ```
   npm install
   ```

6. Create a `.env` file in the root directory with the following content:

   ```
   API_KEY=your_api_key_here
   PASSWORD=your_awork_UI_platform_password_here
   ```

   Replace `your_api_key_here` with the API key you copied in step 3, and `your_awork_UI_platform_password_here` with your awork account password.

## Running Tests

To run all tests:

```
npm run test:all
```

To run only API tests:

```
npm run test:api
```

To run only UI tests:

```
npm run test:ui
```

## API Tests

The API tests demonstrate CRUD operations on a project entity:

- Create a project
- Fetch the created project
- Update the project
- Fetch the updated project
- Delete the project
- Ensure the project has been deleted

## UI Tests

The UI tests demonstrate a simple user flow in awork:

- Login to awork
- Create a new project
- Add a task to the project
- Add a comment to the task

## Technologies Used

- JavaScript
- Jest (Testing framework)
- Axios (HTTP client for API tests)
- Selenium WebDriver (for UI tests)
- Chromedriver

## Documentation

For more information on the awork API, visit the [awork Developer Documentation](https://developers.awork.com/).

## Notes

- The UI tests assume that you have Chrome installed on your machine.
- Make sure to keep your API key and password confidential and do not commit the `.env` file to version control.

