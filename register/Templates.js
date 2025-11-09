// Template function to create HTML for a new participant
export function participantTemplate(count) {
    return `
    <section class="participant${count}">
        <button type="button" class="delete-participant" data-participant="${count}" title="Remove Participant">×</button>
        <p>Participant ${count}</p>
        <div class="form-group">
            <label for="fname${count}">First Name *</label>
            <input type="text" id="fname${count}" name="fname${count}" required>
        </div>
        <div class="form-group">
            <label for="lname${count}">Last Name *</label>
            <input type="text" id="lname${count}" name="lname${count}" required>
        </div>
        <div class="form-group">
            <label for="age${count}">Age *</label>
            <input type="number" id="age${count}" name="age${count}" min="8" max="18" required>
        </div>
        <div class="form-group">
            <label>Gender *</label>
            <div class="radio-group">
                <label>
                    <input type="radio" name="gender${count}" value="male" required>
                    <span>Male</span>
                </label>
                <label>
                    <input type="radio" name="gender${count}" value="female" required>
                    <span>Female</span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="fee${count}">Registration Fee *</label>
            <input type="number" id="fee${count}" name="fee${count}" min="0" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="grade${count}">Grade *</label>
            <select id="grade${count}" name="grade${count}" required>
                <option value="">Select Grade</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
            </select>
        </div>
        <div class="form-group">
            <label for="allergies${count}">Allergies</label>
            <textarea id="allergies${count}" name="allergies${count}" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label for="diet${count}">Special Dietary Needs</label>
            <textarea id="diet${count}" name="diet${count}" rows="3"></textarea>
        </div>
    </section>
    `;
}

// Template function for success message
export function successTemplate(info) {
    return `Thank you ${info.adultName} for registering. You have registered ${info.numParticipants} participant${info.numParticipants > 1 ? 's' : ''} and owe $${info.totalFees.toFixed(2)} in Fees.`;
}

