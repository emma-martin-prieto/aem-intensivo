document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('footerContactForm');
    const submitBtn = document.getElementById('formSubmit');
    const responseMsg = document.getElementById('formResponse');
    const debugBox = document.getElementById('formDebug');

    if (!form || !submitBtn || !responseMsg) {
        return;
    }

    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const phoneInput = document.getElementById('formPhone');
    const messageInput = document.getElementById('formMessage');

    if (!nameInput || !emailInput || !phoneInput || !messageInput) {
        return;
    }

    const validate = () => {
        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const phoneVal = phoneInput.value.trim();
        const messageVal = messageInput.value.trim();

        const isNameValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nameVal) && nameVal !== '';
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
        const isMessageValid = messageVal.length >= 20 && messageVal.length <= 300;
        const isPhoneValid = phoneVal === '' || /^[0-9]+$/.test(phoneVal);

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');

        if (nameError) {
            nameError.classList.toggle('u-error-show', !!nameVal && !isNameValid);
        }

        if (emailError) {
            emailError.classList.toggle('u-error-show', !!emailVal && !isEmailValid);
        }

        if (phoneError) {
            phoneError.classList.toggle('u-error-show', !!phoneVal && !isPhoneValid);
        }

        if (messageError) {
            messageError.classList.toggle('u-error-show', !!messageVal && !isMessageValid);
        }

        submitBtn.disabled = !(isNameValid && isEmailValid && isMessageValid && isPhoneValid);
    };

    form.addEventListener('input', validate);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submittedData = {
            nombre: nameInput.value.trim(),
            email: emailInput.value.trim(),
            telefono: phoneInput.value.trim(),
            mensaje: messageInput.value.trim()
        };

        console.log('Datos enviados desde Contact Section:', submittedData);

        form.classList.add('contact-section-lp__form--hidden');
        responseMsg.classList.add('contact-section-lp__success--visible');

        if (debugBox) {
            debugBox.hidden = false;
            debugBox.innerHTML = `
                <h4>Datos introducidos</h4>
                <p><strong>Nombre:</strong> ${submittedData.nombre}</p>
                <p><strong>Email:</strong> ${submittedData.email}</p>
                <p><strong>Teléfono:</strong> ${submittedData.telefono || 'No indicado'}</p>
                <p><strong>Mensaje:</strong> ${submittedData.mensaje}</p>
            `;
        }
    });
});