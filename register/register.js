// Import template functions from Templates.js
import { participantTemplate, successTemplate } from './Templates.js';

// Initialize participant count
let participantCount = 1;

// Function to add a new participant
function addParticipant() {
    participantCount++;
    const addButton = document.getElementById('add');
    const newParticipantHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
    
    // Add event listener to the new delete button
    const newSection = document.querySelector(`.participant${participantCount}`);
    const deleteButton = newSection.querySelector('.delete-participant');
    deleteButton.addEventListener('click', deleteParticipant);
}

// Function to delete a participant
function deleteParticipant(event) {
    const participantNumber = event.target.getAttribute('data-participant');
    const participantSection = document.querySelector(`.participant${participantNumber}`);
    
    // Only allow deletion if there's more than one participant
    const allParticipants = document.querySelectorAll('[class^="participant"]');
    if (allParticipants.length > 1) {
        participantSection.remove();
    } else {
        alert('You must have at least one participant registered.');
    }
}

// Function to calculate total fees
function totalFees() {
    // The selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array
    // so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, 
    // then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    
    // Sum up all of the fees using reduce
    const total = feeElements.reduce((sum, element) => {
        // Convert the value to a number and add it to the sum
        return sum + (parseFloat(element.value) || 0);
    }, 0);
    
    return total;
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();
    
    // Get the adult name
    const adultName = document.getElementById('adult_name').value;
    
    // Calculate total fees
    const fees = totalFees();
    
    // Count actual participants in the DOM (not deleted ones)
    const actualParticipants = document.querySelectorAll('[class^="participant"]').length;
    
    // Create info object
    const info = {
        adultName: adultName,
        numParticipants: actualParticipants,
        totalFees: fees
    };
    
    // Hide the form
    const form = document.getElementById('registrationForm');
    form.style.display = 'none';
    
    // Show the summary
    const summary = document.getElementById('summary');
    summary.classList.remove('hide');
    
    // Insert the success message
    const summaryMessage = document.getElementById('summaryMessage');
    summaryMessage.textContent = successTemplate(info);
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Add Participant" button
    const addButton = document.getElementById('add');
    addButton.addEventListener('click', addParticipant);
    
    // Add event listener to the form submission
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', submitForm);
    
    // Add event listeners to existing delete buttons
    const deleteButtons = document.querySelectorAll('.delete-participant');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteParticipant);
    });
});

