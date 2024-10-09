const form = document.getElementById('login-form') as HTMLFormElement;

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const loginData = {
        email,
        password,
    };

    try {
        const response = await fetch('http://localhost:8082/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData: any = await response.json();
            throw new Error(errorData.message || 'Failed to log in');
        }

        const result: any = await response.json();
        console.log('Login successful:', result);

        localStorage.setItem('authToken', result.token.replace('Bearer ', ''));

        window.location.href = '/destinations.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Error logging in. Please try again.');
    }
});
