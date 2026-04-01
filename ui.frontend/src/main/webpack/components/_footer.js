document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('footerContactForm');
    const submitBtn = document.getElementById('formSubmit');
    const responseMsg = document.getElementById('formResponse');

    if (form) {
        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        const phoneInput = document.getElementById('formPhone');
        const messageInput = document.getElementById('formMessage');

        const validate = () => {
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const phoneVal = phoneInput.value.trim();
            const messageVal = messageInput.value.trim();

            // Validaciones
            const isNameValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nameVal) && nameVal !== "";
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
            const isMessageValid = messageVal.length >= 20 && messageVal.length <= 300;
            
            // Teléfono: Si está vacío es válido. Si tiene algo, debe ser solo números.
            const isPhoneValid = phoneVal === "" || /^[0-9]+$/.test(phoneVal);

            // Gestión visual de errores
            document.getElementById('nameError').classList.toggle('u-error-show', (nameVal && !isNameValid));
            document.getElementById('emailError').classList.toggle('u-error-show', (emailVal && !isEmailValid));
            document.getElementById('phoneError').classList.toggle('u-error-show', (phoneVal && !isPhoneValid));
            document.getElementById('messageError').classList.toggle('u-error-show', (messageVal && !isMessageValid));

            // Botón habilitado solo si los obligatorios están bien Y el opcional no tiene errores
            submitBtn.disabled = !(isNameValid && isEmailValid && isMessageValid && isPhoneValid);
        };

        form.addEventListener('input', validate);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("¡Formulario enviado con éxito!");
            form.classList.add('footer-lp__form--hidden');
            responseMsg.classList.add('footer-lp__success--visible');
        });
    }
});