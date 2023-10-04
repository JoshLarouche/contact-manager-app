# contact-manager-app
A simple web app to consume and create REST APIs

## Running the App Locally

### Prerequisites
- Git
- Python 3.6+
- npm (Node.js package manager)

### Clone the Repository

```bash
git clone git@github.com:JoshLarouche/contact-manager-app.git
cd contact-manager-app
```

### Set Up a Virtual Environment (optional but recommended)

```bash
python -m venv venv
source ./venv/bin/activate
```

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Apply Database Migrations
```bash
python manage.py migrate
```

### Start the Django Development Server

```bash
python manage.py runserver
```

### Install JavaScript Dependencies (in a separate terminal)

```bash
cd app
npm install
```

## Running the App in a Docker Container

### Prerequisites
- Docker
- Docker Compose

### Build Docker Containers

```bash
docker-compose build
```

### Start the App in a Docker Container

```bash
docker-compose up
```

### Stopping the Docker Containers

```bash
docker-compose down
```

Make sure to have the necessary prerequisites installed before following these steps.

For running the app locally, you have the option to set up a virtual environment for Python, which is recommended for isolating dependencies.

For running the app in a Docker container, ensure that Docker and Docker Compose are installed on your system.

### Testing

To run the frontend tests, in the app folder,
```bash
npm test a
```

To run the backend tests, in the root folder,
```bash
python manage.py test
```

### Authentication
One of the user stories required user authentication and I have implemented that with the use of OAuth. Below are the sample user credentials.

| Email               | Password     |
|---------------------|--------------|
| admin@contactmanager.com | admin123!    |

# Contact Management Application Test Cases

This README contains a list of test cases for the Contact Management Application based on the user stories provided.

I have implemented some executable tests in the application but due to time constraints I kept to simple examples.

## User Story 1: View All Existing Contacts

### Test Case 1.1: Access the Application
- **Preconditions:** None
- **Steps:**
  1. Access the application link as an unauthenticated public user.
- **Expected Result:** The user can access the application successfully.

### Test Case 1.2: View All Contacts
- **Preconditions:**
  - The application is accessible to the user.
- **Steps:**
  1. Navigate to the contacts section of the application.
- **Expected Result:** The user can view a list of all 10 existing contacts, including their name, email, phone, website, and company name.

### Test Case 1.3: Verify Empty Contacts List
- **Preconditions:**
  - The application is accessible to the user.
  - There are no existing contacts in the system.
- **Steps:**
  1. Access the contacts section of the application.
- **Expected Result:** The user sees a message indicating that there are no contacts to display.

### Test Case 1.4: Verify Contact Details
- **Preconditions:**
  - The application is accessible to the user.
  - The user is viewing the list of all existing contacts.
- **Steps:**
  1. Click on a contact's name in the list.
- **Expected Result:** The user is directed to a contact details page showing all information (name, email, phone, website, and company name) for the selected contact.

## User Story 2: Filter Contacts by Name

### Test Case 2.1: Enter Text in Name Filter
- **Preconditions:**
  - The application is accessible to the user.
  - The user is on the contacts page.
- **Steps:**
  1. Locate the name filter input field.
  2. Enter text in the name filter input field.
- **Expected Result:** The user is able to enter text in the name filter.

### Test Case 2.2: Apply Name Filter
- **Preconditions:**
  - The application is accessible to the user.
  - The user has entered text in the name filter.
- **Steps:**
  1. Observe the list of contacts displayed after applying the filter.
- **Expected Result:** The list of contacts displayed should only include names that contain the text entered by the user.

### Test Case 2.3: Clear Name Filter
- **Preconditions:**
  - The application is accessible to the user.
  - The user has entered text in the name filter.
- **Steps:**
  1. Locate the clear button (if available) next to the name filter.
  2. Click the clear button.
- **Expected Result:** The name filter is cleared, and the user sees the full list of contacts again.

### Test Case 2.4: Case Insensitive Filtering
- **Preconditions:**
  - The application is accessible to the user.
  - The user is on the contacts page.
- **Steps:**
  1. Enter text in the name filter using a combination of uppercase and lowercase letters.
- **Expected Result:** The filter should be case-insensitive and display contacts with names that match the provided text regardless of letter casing.

## Bonus User Story 1: Create a New Contact

### Test Case 3.1: Click "Create Contact" Button
- **Preconditions:**
  - The application is accessible to the user.
  - The user is on the contacts page.
- **Steps:**
  1. Locate the "Create contact" button.
  2. Click the "Create contact" button.
- **Expected Result:** The user is able to click the "Create contact" button.

### Test Case 3.2: Create New Contact
- **Preconditions:**
  - The application is accessible to the user.
  - The user has clicked the "Create contact" button.
- **Steps:**
  1. Provide the required information (name, email, phone, website, company name).
  2. Submit the information to create a new contact.
- **Expected Result:** A new contact is created and displayed along with the other existing contacts.

### Test Case 3.3: Provide Incomplete Information
- **Preconditions:**
  - The application is accessible to the user.
  - The user has clicked the "Create contact" button.
- **Steps:**
  1. Provide only partial information (e.g., name and email) for creating a new contact.
  2. Submit the information.
- **Expected Result:** The system should not allow the creation of a new contact with incomplete information and should display an error message.

### Test Case 3.4: Duplicate Contact Creation
- **Preconditions:**
  - The application is accessible to the user.
  - The user has clicked the "Create contact" button.
  - The contact information provided matches an existing contact.
- **Steps:**
  1. Provide information for creating a new contact where the combination of name and email matches an existing contact.
  2. Submit the information.
- **Expected Result:** The system should prevent the creation of a duplicate contact and display an error message.

## Bonus User Story 2: Authentication and Contact Creation

### Test Case 4.1: Authentication Failure
- **Preconditions:** 
  - The user has an account.
  - The application is accessible to the user.
- **Steps:**
  1. Enter incorrect account credentials.
  2. Attempt to log in.
- **Expected Result:** Authentication should fail, and the system should display an error message.

### Test Case 4.2: Invalid User Access (Edit Contact)
- **Preconditions:**
  - The application is accessible to the user.
  - The user has an account.
  - The user is authenticated but doesn't have the necessary permissions to edit contacts.
- **Steps:**
  1. Attempt to access the "edit contact" functionality.
- **Expected Result:** The user, even when authenticated, should not be able to access the "edit contact" functionality if they don't have the required permissions.

These test cases provide comprehensive coverage for the main functionality described in the user stories, including various scenarios and edge cases.

## Notes

I have completed all of the base criteria and bonus criteria to some degree, including setting up a CI pipeline that runs CodeQL successfully and an inital start on a docker build and push workflow.

### Assumptions

 I assumed bonus user story 2 meant that an authenticated user could update a contact, not just create one as an unauthenticated user can.

### To Be Completed

- remove commented out code
- improve test coverage
- improve dockerization
- improve CI pipeline
- clean up styling