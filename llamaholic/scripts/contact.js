// Form validation and handling
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectSelect = document.getElementById('subject');
const messageTextarea = document.getElementById('message');
const validationMessage = document.querySelector('.validation-message');

// Validation rules
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    message: 'Name must be at least 2 characters long'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  message: {
    required: true,
    minLength: 10,
    message: 'Message must be at least 10 characters long'
  }
};

// Validate individual field
function validateField(field, value) {
  const rules = validationRules[field];
  
  if (!rules) return { isValid: true };
  
  // Check if required
  if (rules.required && !value.trim()) {
    return {
      isValid: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
    };
  }
  
  // Check minimum length
  if (rules.minLength && value.trim().length < rules.minLength) {
    return {
      isValid: false,
      message: rules.message
    };
  }
  
  // Check pattern (for email)
  if (rules.pattern && !rules.pattern.test(value)) {
    return {
      isValid: false,
      message: rules.message
    };
  }
  
  return { isValid: true };
}

// Validate all fields and return array of errors
function validateForm() {
  const fields = [
    { name: 'name', value: nameInput.value },
    { name: 'email', value: emailInput.value },
    { name: 'message', value: messageTextarea.value }
  ];
  
  // Use map to create validation results, then filter for errors
  const validationResults = fields.map(field => ({
    field: field.name,
    ...validateField(field.name, field.value)
  }));
  
  const errors = validationResults.filter(result => !result.isValid);
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Display validation message
function displayMessage(message, isSuccess = false) {
  validationMessage.textContent = message;
  validationMessage.style.display = 'block';
  validationMessage.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
  validationMessage.style.color = isSuccess ? '#155724' : '#721c24';
  validationMessage.style.border = isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
}

// Count words in message (using reduce)
function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .reduce((count) => count + 1, 0);
}

// Get form data as object
function getFormData() {
  return {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectSelect.value,
    message: messageTextarea.value.trim(),
    wordCount: countWords(messageTextarea.value),
    timestamp: new Date().toISOString()
  };
}

// Clear form
function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  subjectSelect.value = '';
  messageTextarea.value = '';
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();
  
  const validation = validateForm();
  
  if (!validation.isValid) {
    // Show first error
    const firstError = validation.errors[0];
    displayMessage(firstError.message, false);
    return;
  }
  
  // Get form data
  const formData = getFormData();
  
  // Check word count
  if (formData.wordCount < 5) {
    displayMessage('Message should contain at least 5 words', false);
    return;
  }
  
  // Success message
  displayMessage(
    `✓ Thank you, ${formData.name}! Your message has been received. We'll respond to ${formData.email} soon!`,
    true
  );
  
  // Log to console (in real app, would send to server)
  console.log('Form submitted:', formData);
  
  // Clear form after 2 seconds
  setTimeout(() => {
    clearForm();
    validationMessage.style.display = 'none';
  }, 3000);
}

// Real-time validation on input
function setupRealTimeValidation() {
  const inputFields = [
    { element: nameInput, field: 'name' },
    { element: emailInput, field: 'email' },
    { element: messageTextarea, field: 'message' }
  ];
  
  inputFields.forEach(({ element, field }) => {
    element.addEventListener('blur', function() {
      const result = validateField(field, this.value);
      if (!result.isValid) {
        this.style.borderColor = '#E76363';
      } else {
        this.style.borderColor = '#41521F';
      }
    });
    
    element.addEventListener('focus', function() {
      this.style.borderColor = '#E76363';
    });
  });
}

// Initialize
if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
  setupRealTimeValidation();
}

