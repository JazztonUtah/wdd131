// Get input elements
const cardNumberInput = document.getElementById('card-number');
const cardHolderInput = document.getElementById('card-holder');
const expiryMonthInput = document.getElementById('expiry-month');
const expiryYearInput = document.getElementById('expiry-year');
const cvvInput = document.getElementById('cvv');

// Credit Card Number Formatting
cardNumberInput.addEventListener('input', function(e) {
    // Remove all non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 16 digits
    value = value.substring(0, 16);
    
    // Add space after every 4 digits
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    // Update the input value
    e.target.value = formattedValue;
});

// Card Holder Formatting
cardHolderInput.addEventListener('input', function(e) {
    // Remove numbers and special characters
    e.target.value = e.target.value.replace(/[0-9]/g, '');
});

// Expiry Month Formatting
expiryMonthInput.addEventListener('input', function(e) {
    // Remove all non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 2 digits
    value = value.substring(0, 2);
    
    // Validate month (01-12)
    if (value.length === 2) {
        const month = parseInt(value);
        if (month > 12) {
            value = '12';
        } else if (month === 0) {
            value = '01';
        }
    }
    
    e.target.value = value;
    
    // Auto-focus to year input when month is complete
    if (value.length === 2) {
        expiryYearInput.focus();
    }
});

// Expiry Year Formatting
expiryYearInput.addEventListener('input', function(e) {
    // Remove all non-digit characters
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 2);
});

// CVV Formatting
cvvInput.addEventListener('input', function(e) {
    // Remove all non-digit characters and limit to 4 digits
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
});

// Form submission
const form = document.getElementById('credit-card-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const cardNumber = cardNumberInput.value;
    const cardHolder = cardHolderInput.value;
    const expiryMonth = expiryMonthInput.value;
    const expiryYear = expiryYearInput.value;
    const cvv = cvvInput.value;
    
    // Display success message
    alert(`Payment Submitted Successfully!\n\nCard: ${cardNumber}\nHolder: ${cardHolder}\nExpiry: ${expiryMonth}/${expiryYear}\nCVV: ${'*'.repeat(cvv.length)}`);
    
    // Reset form
    form.reset();
});
