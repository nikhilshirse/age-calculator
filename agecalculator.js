document.addEventListener('DOMContentLoaded', function() {
    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthdate').setAttribute('max', today);
    
    // Calculate button click event
    document.getElementById('calculate-btn').addEventListener('click', calculateAge);
    
    // Also calculate when pressing Enter in the date field
    document.getElementById('birthdate').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});

function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    
    if (!birthdateInput) {
        alert('Please enter your date of birth');
        return;
    }
    
    const birthdate = new Date(birthdateInput);
    const today = new Date();
    
    // Check if birthdate is in the future
    if (birthdate > today) {
        alert('Birthdate cannot be in the future');
        return;
    }
    
    // Calculate age
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();
    
    // Adjust for negative months or days
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();
        days += lastDayOfMonth;
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Update the UI
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    
    // Show additional information
    showAdditionalInfo(birthdate, today, years);
}

function showAdditionalInfo(birthdate, today, years) {
    const infoElement = document.getElementById('additional-info');
    
    // Calculate next birthday
    const nextBirthday = new Date(
        today.getFullYear(),
        birthdate.getMonth(),
        birthdate.getDate()
    );
    
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    
    const daysUntilNextBirthday = Math.ceil(
        (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );
    
    // Calculate birth day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayOfWeek = daysOfWeek[birthdate.getDay()];
    
    // Generate interesting facts based on age
    let ageFact = '';
    if (years < 1) {
        ageFact = "You're just a baby! Welcome to the world!";
    } else if (years < 5) {
        ageFact = "You're in your early childhood years - full of wonder and discovery!";
    } else if (years < 13) {
        ageFact = "You're in your childhood - enjoy these carefree years!";
    } else if (years < 20) {
        ageFact = "You're a teenager - exciting times ahead!";
    } else if (years < 30) {
        ageFact = "You're in your twenties - the world is yours to explore!";
    } else if (years < 40) {
        ageFact = "You're in your thirties - the prime of your life!";
    } else if (years < 50) {
        ageFact = "You're in your forties - wise and experienced!";
    } else if (years < 65) {
        ageFact = "You're in your fifties or early sixties - the golden years!";
    } else {
        ageFact = "You're a senior - a lifetime of wisdom and experience!";
    }
    
    // Display the information
    infoElement.innerHTML = `
        <p><strong>You were born on a ${birthDayOfWeek}.</strong></p>
        <p>${ageFact}</p>
        <p>Your next birthday is in ${daysUntilNextBirthday} days.</p>
    `;
    
    infoElement.classList.add('show');
}