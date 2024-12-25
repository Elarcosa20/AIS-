(function () {
    'use strict';
    const form = document.getElementById('surveyForm');
    
    form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Please answer all questions before submitting the survey.");
    } else {
        event.preventDefault();
        alert("Thank you for submitting the survey!");
        form.reset();
        form.classList.remove('was-validated');
    }
    form.classList.add('was-validated');
    }, false);
})();