// To-Do List
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const tasksToday = document.getElementById('tasks-today');
const tasksCompleted = document.getElementById('tasks-completed');

// Task counter to keep track of task number
let taskCounter = 1;
let completedCount = 0;

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();  // Get the input value without spaces at the end

    if (taskText !== "") {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskNumber = document.createElement('span');
        taskNumber.textContent = `${taskCounter}. `;
        taskNumber.classList.add('task-number');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        const taskItem = document.createElement('span');
        taskItem.textContent = taskText;
        taskItem.classList.add('task-text');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        // Append elements to the task div
        taskDiv.appendChild(taskNumber);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(deleteBtn);

        taskList.appendChild(taskDiv);

        taskCounter++;
        taskInput.value = '';  // Clear input after task is added

        // Update task summary
        updateTaskSummary();

        // Add delete functionality
        deleteBtn.addEventListener('click', function() {
            taskDiv.remove();
            updateTaskSummary();  // Recalculate summary after task deletion
        });

        // Add checkbox functionality
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                taskItem.style.textDecoration = 'line-through';  
                completedCount++;
            } else {
                taskItem.style.textDecoration = 'none'; 
                completedCount--;
            }
            updateTaskSummary();  // Recalculate summary after completion status change
        });
    } else {
        alert('Please enter a task!');
    }
}

// Function to update task summary (tasks today and completed)
function updateTaskSummary() {
    const totalTasks = document.querySelectorAll('.task').length;
    tasksToday.textContent = totalTasks;
    tasksCompleted.textContent = completedCount;
}

// Notes Section
const notesTextArea = document.getElementById('notes-text');
const wordCountDisplay = document.getElementById('word-count');

// Function to update word count
function updateWordCount() {
    const wordCount = notesTextArea.value.split(/\s+/).filter(Boolean).length;
    wordCountDisplay.textContent = `Word Count: ${wordCount}`;
}

notesTextArea.addEventListener('input', updateWordCount);

// Grade Calculator - Credits Based
document.getElementById('grade-form').addEventListener('submit', addGrade);

let grades = [];
let totalCredits = 0;

function addGrade(event) {
    event.preventDefault();

    const gradeName = document.getElementById('grade-name').value.trim();
    const gradeScore = parseFloat(document.getElementById('grade-score').value);
    const gradeCredits = parseFloat(document.getElementById('grade-credits').value);

    if (gradeName && !isNaN(gradeScore) && !isNaN(gradeCredits) && gradeScore >= 0 && gradeScore <= 100 && gradeCredits > 0) {
        // Add grade to array
        const grade = { name: gradeName, score: gradeScore, credits: gradeCredits };

        grades.push(grade);

        // Update grade list
        const gradeList = document.getElementById('grade-list');
        const gradeItem = document.createElement('li');
        gradeItem.id = `grade-${grades.length - 1}`;

        gradeItem.innerHTML = `
            ${gradeName}: ${gradeScore}% (Credits: ${gradeCredits})
            <button onclick="editGrade(${grades.length - 1})">Edit</button>
            <button onclick="deleteGrade(${grades.length - 1})">Delete</button>
        `;
        gradeList.appendChild(gradeItem);

        // Clear form inputs
        document.getElementById('grade-name').value = '';
        document.getElementById('grade-score').value = '';
        document.getElementById('grade-credits').value = '';

        // Update final grade
        updateFinalGrade();
    } else {
        alert('Please fill in all fields with valid data.');
    }
}

function updateFinalGrade() {
    let totalGradePoints = 0;
    totalCredits = 0;

    grades.forEach(grade => {
        totalGradePoints += (grade.score * grade.credits);
        totalCredits += grade.credits;
    });

    // Prevent final grade from exceeding 100%
    if (totalCredits === 0) {
        document.getElementById('final-grade').textContent = '0.00';
        return;
    }

    const finalGrade = totalGradePoints / totalCredits;

    document.getElementById('final-grade').textContent = finalGrade.toFixed(2);
}

function deleteGrade(index) {
    grades.splice(index, 1); // Remove grade from array
    const gradeItem = document.getElementById(`grade-${index}`);
    gradeItem.remove(); // Remove grade item from the list
    updateFinalGrade(); // Recalculate final grade
}

function editGrade(index) {
    const grade = grades[index];
    const newScore = prompt("Enter the new grade (%):", grade.score);
    const newCredits = prompt("Enter the new credits:", grade.credits);

    if (newScore !== null && newCredits !== null) {
        const updatedScore = parseFloat(newScore);
        const updatedCredits = parseFloat(newCredits);

        // Update the grade data
        if (!isNaN(updatedScore) && updatedScore >= 0 && updatedScore <= 100 && !isNaN(updatedCredits) && updatedCredits > 0) {
            grades[index] = { name: grade.name, score: updatedScore, credits: updatedCredits };

            // Update the list item text
            const gradeItem = document.getElementById(`grade-${index}`);
            gradeItem.innerHTML = `
                ${grade.name}: ${updatedScore}% (Credits: ${updatedCredits})
                <button onclick="editGrade(${index})">Edit</button>
                <button onclick="deleteGrade(${index})">Delete</button>
            `;

            updateFinalGrade(); // Recalculate final grade after edit
        } else {
            alert("Invalid grade or credits entered.");
        }
    }
}

//Exams and assignments
// Get elements for exam and assignment sections
const addExamBtn = document.getElementById('add-exam-btn');
const addAssignmentBtn = document.getElementById('add-assignment-btn');

const examNameInput = document.getElementById('exam-name');
const examDateInput = document.getElementById('exam-date');
const assignmentNameInput = document.getElementById('assignment-name');
const assignmentDueInput = document.getElementById('assignment-due');

const examList = document.getElementById('exam-list');
const assignmentList = document.getElementById('assignment-list');

// Function to create a new exam list item with edit and delete buttons
function createExamItem(examName, examDate) {
  const li = document.createElement('li');
  li.textContent = `${examName} - ${examDate}`;

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', () => editExamItem(li, examName, examDate));

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => li.remove());

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

// Function to create a new assignment list item with edit and delete buttons
function createAssignmentItem(assignmentName, assignmentDue) {
  const li = document.createElement('li');
  li.textContent = `${assignmentName} - Due: ${assignmentDue}`;

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', () => editAssignmentItem(li, assignmentName, assignmentDue));

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => li.remove());

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

// Function to edit an exam item
function editExamItem(li, examName, examDate) {
  examNameInput.value = examName;
  examDateInput.value = examDate;

  li.remove(); // Remove the current list item
}

// Function to edit an assignment item
function editAssignmentItem(li, assignmentName, assignmentDue) {
  assignmentNameInput.value = assignmentName;
  assignmentDueInput.value = assignmentDue;

  li.remove(); // Remove the current list item
}

// Add event listener for the Add Exam button
addExamBtn.addEventListener('click', () => {
  const examName = examNameInput.value.trim();
  const examDate = examDateInput.value.trim();

  // Validate input
  if (examName === '' || examDate === '') {
    alert('Please enter both the exam name and date.');
    return;
  }

  // Create and append exam item to the list
  const examItem = createExamItem(examName, examDate);
  examList.appendChild(examItem);

  // Clear input fields
  examNameInput.value = '';
  examDateInput.value = '';
});

// Add event listener for the Add Assignment button
addAssignmentBtn.addEventListener('click', () => {
  const assignmentName = assignmentNameInput.value.trim();
  const assignmentDue = assignmentDueInput.value.trim();

  // Validate input
  if (assignmentName === '' || assignmentDue === '') {
    alert('Please enter both the assignment name and due date.');
    return;
  }

  // Create and append assignment item to the list
  const assignmentItem = createAssignmentItem(assignmentName, assignmentDue);
  assignmentList.appendChild(assignmentItem); 

  // Clear input fields
  assignmentNameInput.value = '';
  assignmentDueInput.value = '';
});

// Add event listener to trigger "Add Exam" on Enter key press
examNameInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addExamBtn.click();
  }
});

// Add event listener to trigger "Add Assignment" on Enter key press
assignmentNameInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addAssignmentBtn.click();
  }
});
