document.addEventListener('DOMContentLoaded', () => {
    const phoneForm = document.getElementById('phone-form');
    const otpForm = document.getElementById('otp-form');
    const loader = document.getElementById('loader');
    const loginStep1 = document.getElementById('login-step-1');
    const loginStep2 = document.getElementById('login-step-2');
    const welcomePage = document.getElementById('welcome-page');
    const otpInputs = document.querySelectorAll('.otp-input');

    if (phoneForm) {
        phoneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('phone');
            const phoneNumber = phoneInput ? phoneInput.value : '';
            if (/^\+91\d{10}$/.test(phoneNumber)) {
                loader.classList.remove('d-none');
                setTimeout(() => {
                    loader.classList.add('d-none');
                    loginStep1.classList.add('d-none');
                    loginStep2.classList.remove('d-none');
                }, 1000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a valid phone number!',
                });
            }
        });
    }

    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const otp = Array.from(otpInputs).map(input => input.value).join('');
            if (/^\d{6}$/.test(otp)) {
                loader.classList.remove('d-none');
                setTimeout(() => {
                    loader.classList.add('d-none');
                    const isOtpValid = otp === '123456'; 
                    if (isOtpValid) {
                        loginStep2.classList.add('d-none');
                        welcomePage.classList.remove('d-none');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Invalid OTP entered!',
                        });
                    }
                }, 1000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a valid 6-digit OTP!',
                });
            }
        });
    }

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});