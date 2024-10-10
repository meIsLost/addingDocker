export const userApi = {
  async signUp(data: {
    email: string;
    password: string;
    username: string;
    name: string;
  }): Promise<{ message: string }> {
    const response = await fetch("/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Ensure cookies are sent with the request
    });

    if (!response.ok) {
      const errorResponse = await response.json<Error>();
      console.error("Login failed:", errorResponse.message);
    }

    const result = await response.json<{ message: string; token: string }>();
    console.log("Login successful");
    return { message: result.message };
  },
} as const;
