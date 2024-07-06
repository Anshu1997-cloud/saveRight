
document.addEventListener('DOMContentLoaded', () => {
    const phoneForm = document.getElementById('phone-form');
    const otpForm = document.getElementById('otp-form');
    const loader = document.getElementById('loader');
    const loginStep1 = document.getElementById('login-step-1');
    const loginStep2 = document.getElementById('login-step-2');
    const welcomePage = document.getElementById('welcome-page');
    const otpInputs = document.querySelectorAll('.otp-input');

    let phoneNumber = "";
    let generatedOtp = ""; 

    if (phoneForm) {
        phoneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('phone');
            phoneNumber = phoneInput ? phoneInput.value : '';
            if (/^\d{10}$/.test(phoneNumber)) {
                loader.classList.remove('d-none');
                setTimeout(() => {
                    loader.classList.add('d-none');
                    loginStep1.classList.add('d-none');
                    loginStep2.classList.remove('d-none');
                }, 1000);

                generateOtp(phoneNumber); 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a valid 10-digit phone number!',
                });
            }
        });
    }

    function generateOtp(phoneNumber) {
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
        console.log("Generated OTP:", generatedOtp); 

        const url = "https://saveright.in/auth/signup";
        const headers = {
            "Content-Type": "application/json"
        };
        const data = {
            "isdCode": "+91",
            "phone": phoneNumber,
            "otp": generatedOtp 
        };

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error occurs: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("OTP sent successfully:", data);
        })
        .catch(error => {
            console.error("Failed to send OTP:", error);
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
                    const isOtpValid = otp === generatedOtp; 
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