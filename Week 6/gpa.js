// gpa.js

// Function to get grades from input field
function getGrades() {
  const gradesInput = document.querySelector("#grades").value;
  // Split by comma, trim whitespace, and convert to uppercase
  const gradesArray = gradesInput.split(",").map(grade => grade.trim().toUpperCase());
  return gradesArray;
}

// Function to convert a letter grade to GPA points
function lookupGrade(grade) {
  let points = 0;
  if (grade === 'A') {
    points = 4.0;
  } else if (grade === 'B') {
    points = 3.0;
  } else if (grade === 'C') {
    points = 2.0;
  } else if (grade === 'D') {
    points = 1.0;
  } else if (grade === 'F') {
    points = 0.0;
  }
  return points;
}

// Function to calculate GPA from an array of grades
function calculateGpa(grades) {
  // Convert each grade to points using lookupGrade
  const gradePoints = grades.map(lookupGrade);
  
  // Calculate the total points using reduce
  const totalPoints = gradePoints.reduce((sum, points) => sum + points, 0);
  
  // Calculate the average (GPA)
  const gpa = totalPoints / grades.length;
  
  // Round to 2 decimal places
  return gpa.toFixed(2);
}

// Function to display the GPA in the output element
function displayGpa(gpa) {
  const outputElement = document.querySelector("#output");
  outputElement.textContent = `GPA: ${gpa}`;
}

// Click handler to orchestrate all the functions
function clickHandler() {
  const grades = getGrades();
  const gpa = calculateGpa(grades);
  displayGpa(gpa);
}

// Add event listener to the button
document.querySelector("#submitButton").addEventListener("click", clickHandler);

