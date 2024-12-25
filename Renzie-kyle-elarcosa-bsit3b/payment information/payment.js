(function () {
    'use strict';

    const form = document.getElementById('paymentForm');
    const nameOnCard = document.getElementById('nameOnCard');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const cardNumberError = document.getElementById('cardNumberError');
    const expiryDateError = document.getElementById('expiryDateError');

    nameOnCard.addEventListener('input', function () {
        if (nameOnCard.value.charAt(0) === ' ') {
            nameOnCard.value = nameOnCard.value.trimStart();
        }
    });

    cardNumberInput.addEventListener('input', function () {
        cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
        if (cardNumberInput.value.length === 16) {
            cardNumberInput.classList.remove('is-invalid');
            cardNumberInput.classList.add('is-valid');
        } else {
            cardNumberInput.classList.remove('is-valid');
            cardNumberInput.classList.add('is-invalid');
        }
    });

    cvvInput.addEventListener('input', function () {
        cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
    });

    flatpickr("#expiryDate", {
        dateFormat: "m/Y",
        allowInput: true,
        onChange: function(selectedDates, dateStr, instance) {
            const [month, year] = dateStr.split('/');
            expiryDateInput.classList.remove('is-invalid');
            expiryDateInput.classList.add('is-valid');
        },
        onClose: function(selectedDates, dateStr, instance) {
            const [month, year] = dateStr.split('/');
            if (month < 1 || month > 12 || year.length !== 4) {
                expiryDateInput.classList.add('is-invalid');
            } else {
                expiryDateInput.classList.remove('is-invalid');
            }
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const cardNumber = cardNumberInput.value;
        const expiryDate = expiryDateInput.value;
        const cvv = cvvInput.value;

        if (cardNumber.length !== 16) {
            cardNumberInput.classList.add('is-invalid');
        } else {
            cardNumberInput.classList.remove('is-invalid');
        }

        const [inputMonth, inputYear] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (!expiryDate ||
            !inputMonth ||
            !inputYear ||
            inputMonth < 1 ||
            inputMonth > 12 ||
            inputYear.length !== 4 ||
            (inputYear < currentYear || (inputYear == currentYear && inputMonth < currentMonth))) {
            expiryDateInput.classList.add('is-invalid');
        } else {
            expiryDateInput.classList.remove('is-invalid');
        }

        if (!cvv || cvv.length !== 3) {
            cvvInput.classList.add('is-invalid');
        } else {
            cvvInput.classList.remove('is-invalid');
        }

        if (form.checkValidity() && cardNumber.length === 16 && expiryDate && cvv.length === 3) {
            alert("Payment submitted successfully!");
            form.reset();
        }

        form.classList.add('was-validated');
    }, false);
})();
