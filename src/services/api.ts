const BASE_URL = "http://localhost:8080/"
export const login = async (credentials) => {
    const response = await fetch(`${BASE_URL}auth/login/httpOnly`, {
        method: "POST", // POST
        headers: {
            "Content-Type": "application/json", // Ensure the server knows you're sending JSON
        },
        body: JSON.stringify(credentials), // Pass login credentials in the body
        credentials: 'include', // Send cookies with the request
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

}

interface registerDetails {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export const register = async ({username, password, email, firstname, lastname}:registerDetails) => {
    console.log(username, password, email, firstname, lastname)
    try {
        const response = await fetch(`${BASE_URL}auth/register`, {
            method: "POST", // POST
            headers: {
                "Content-Type": "application/json", // Ensure the server knows you're sending JSON
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                firstName: firstname,
                lastName: lastname,
            }), // Pass register vars in the body
        });

        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : {}
    } catch (e) {
        return {success: false, message: e.toString() || "An unexpected error occurred."};
    }
}

export const validateToken = async () => {
    const response = await fetch(`${BASE_URL}auth/validate`, {
        method: "GET",
        credentials: 'include', // Include cookies in the request
    })

    if (!response.ok) {
        throw new Error('Failed to validate token');
    }

    return await response.json();
}

export const logout = async () => {
    const response = await fetch(`${BASE_URL}auth/logout`, {
        method: "POST", // POST
        headers: {
            "Content-Type": "application/json", // Ensure the server knows you're sending JSON
        },
        credentials: 'include', // Send cookies with the request
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(await response.json());
}