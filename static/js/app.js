let filteredEmployees = [...employees]; // Copy of all employees
let currentPage = 1;                    // Current page number
let employeesPerPage = 8;              // No. of employees to show per page

// Show employee cards
function renderEmployees() {
  const list = document.getElementById('employeeList');
  list.innerHTML = ''; // Clear previous content

  // Calculate the start and end index based on current page
  let start = (currentPage - 1) * employeesPerPage;
  let end = start + employeesPerPage;

  // Slice the employee data to get current page 
  let currentEmployees = filteredEmployees.slice(start, end);

  // ForEach Loop used to show each employee data into card
  currentEmployees.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    list.appendChild(card); // Add to DOM
  });

  renderPagination(); // Show pagination controls
}


// Pagination buttons
function renderPagination() {
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage); // Total pages needed
  const container = document.getElementById('paginationControls');
  container.innerHTML = ''; // Clear old buttons

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'pagination-btn';
    btn.onclick = () => {
      currentPage = i;       // Set selected page
      renderEmployees();     // Reload list for new page
    };
    container.appendChild(btn);
  }
}

// Filter logic
function applyFilters() {
  // Get values from filter inputs
  const fname = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();

  // Filter the employees input data in lower and check it is present in emplooee data 
  filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(fname) &&
    emp.department.toLowerCase().includes(dept) &&
    emp.role.toLowerCase().includes(role)
  );

  currentPage = 1;    // Reset to page 1 after filter
  renderEmployees();  // To refresh display
}

// Reset filter
function resetFilters() {
  // Clear input fields
  document.getElementById('filterFirstName').value = '';
  document.getElementById('filterDepartment').value = '';
  document.getElementById('filterRole').value = '';

  filteredEmployees = [...employees]; // Restore full list
  renderEmployees();
}

// Search logic
document.getElementById('searchInput').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase(); // Take input value and store in query  
  filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  ); // Filter the employees input data in lower and check it is present in emplooee data
  currentPage = 1;
  renderEmployees();
});

// Sort logic
document.getElementById('sortSelect').addEventListener('change', function (e) {
  const sortBy = e.target.value; // Get selected value from dropdown
  if (sortBy === 'firstName') {
    filteredEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName)); // Sort by first name
  } else if (sortBy === 'department') {
    filteredEmployees.sort((a, b) => a.department.localeCompare(b.department)); // Sort by department
  }
  renderEmployees();
});

// Show form
function showForm(edit = false) {
  document.getElementById('formSection').classList.remove('hidden'); // Show form section if edit true then show edit form else show add form
  document.getElementById('employeeForm').reset(); // Reset form fields
  document.getElementById('empId').value = ''; // 
  document.getElementById('formTitle').innerText = 'Add Employee'; // Set form title to 'Add Employee'
}

// Close form
function closeForm() {
  document.getElementById('formSection').classList.add('hidden'); // Hide form section
}

// Handle form submit
document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form data
  const id = document.getElementById('empId').value; // Get employee id
  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    department: document.getElementById('department').value,
    role: document.getElementById('role').value,
  };

  if (id) {
    const index = employees.findIndex(emp => emp.id === parseInt(id)); // Find index of employee to update
    employees[index] = newEmp;
  } else {
    employees.push(newEmp); // To add new employee 
  }

  filteredEmployees = [...employees];
  closeForm();
  renderEmployees();
});

// Edit employee
function editEmployee(id) {
  const emp = employees.find(emp => emp.id === id); // Find employee id to edit
  showForm(true);
  document.getElementById('empId').value = emp.id;
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
  document.getElementById('formTitle').innerText = 'Edit Employee';
}

// Delete employee by employee id
function deleteEmployee(id) {
  if (confirm('Are you sure you want to delete this employee?')) {
    employees = employees.filter(emp => emp.id !== id);
    filteredEmployees = [...employees];
    renderEmployees();
  }
}

// Initial load
renderEmployees();
