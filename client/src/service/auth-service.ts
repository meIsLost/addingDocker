export const authApi = {
  async login(data: { email: string; password: string }): Promise<void> {
    const response = await fetch("/v1/login", {
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

    console.log("Login successful");
  },
} as const;
