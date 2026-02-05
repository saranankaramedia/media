document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-form');

    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Form එක submit වෙන එක මුලින්ම නවත්වනවා

            const submitBtn = eventForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';

            // Form එකේ තියෙන data ඔක්කොම ගන්නවා
            // FormData(eventForm) ලෙස යෙදූ විට checkbox එකේ data ද auto යැවේ
            const formData = new FormData(eventForm);

            // AJAX request එක හදලා server එකට යවනවා
            const r = new XMLHttpRequest();
            r.onreadystatechange = function() {
                if (r.readyState === 4) {
                    const response = r.responseText.trim();

                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Register Now';

                    if (r.status === 200 && response === "success") {
                        document.getElementById('registration-form-content').style.display = 'none';
                        document.getElementById('success-message').style.display = 'block';
                        document.getElementById('register').scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        Swal.fire({
                            icon: '',
                            title: 'Registration Failed!',
                            text: response || 'An unknown error occurred. Please try again.',
                            background: '#333',
                            color: '#fff',
                            confirmButtonColor: '#f63b3bff'
                        });
                    }
                }
            };

            r.open("POST", "registerSchoolProcess.php", true);
            r.send(formData);
        });
    }
});