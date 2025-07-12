
---

## How to Run

1. Download or clone the repository.
2. Open the `index.html` file in any modern browser (Chrome/Firefox).
3. No need for a server — runs fully in the browser.

---
---
## Structure

employee-directory/
├── index.html # Main HTML page
├── README.md # Project description
├── static/
│ ├── css/
│ │ └── style.css # Styling (Flexbox/Grid responsive)
│ └── js/
│ ├── data.js # Mock employee data
│ └── app.js # JavaScript logic (UI + interactivity)

---

## Features

### Dashboard (Employee List)

- Displays Employee ID, Name, Email, Department, and Role.
- Buttons to **Edit** or **Delete** each employee.

### Add / Edit Form

- Form fields:
  - First Name
  - Last Name
  - Email
  - Department
  - Role
- Validates input (required fields, valid email).
- Can edit existing employee or add a new one.
- Form is toggled via "Add Employee" button or Edit.

### Search

- Instant search on **name** and **email**.
- Case-insensitive filtering.

### Filtering

- Filter by:
  - First Name
  - Department
  - Role

### Sorting

- Sort by:
  - First Name (A–Z)
  - Department (A–Z)

### Pagination

- It Shows 8 Employee per page.
- Buttons to jump between pages dynamically.
- Pagination updates after search/filter/sort.

---

## Technologies Used

- HTML5
- CSs 
- JavaScript

---



