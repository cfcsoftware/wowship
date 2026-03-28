// utils/tenantAuthHandler.ts

export async function tenantAuthHandler<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let token = localStorage.getItem("authToken");
  // const refreshtoken = localStorage.getItem("refreshtoken");
  console.log("🔑 Retrieved Token from localStorage:", token);
  const baseUrl = localStorage.getItem("dynamicBaseUrl");
  console.log("🌐 Retrieved Base URL from localStorage:", baseUrl);

  if (!baseUrl) {
    // Immediately fail if the base URL isn't set.
    throw new Error("Missing base URL in localStorage.");
  }

  // --- START: Defensive Check for Token Format ---
  if (token) {
    try {
      // This checks if the token was accidentally stored as a JSON string like '{"access":"..."}'
      const tokenObj = JSON.parse(token);
      if (tokenObj && typeof tokenObj === 'object' && tokenObj.access) {
        console.warn("⚠️ Warning: Correcting a malformed token from localStorage. The login logic should be fixed to store only the access token string.");
        token = tokenObj.access; // Use the correct string from the object
      }
    } catch {
      // If JSON.parse fails, it means the token is likely a plain string, which is correct.
      // No action needed.
    }
  }
  // --- END: Defensive Check ---

  if (!token) {
    // Now, after the check, if the token is still missing, throw an error.
    throw new Error("Missing auth token in localStorage.");
  }

  const isFormData = options.body instanceof FormData;

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };

  console.log("✅ Final Authorization Header:", finalOptions.headers);
  console.log(`🚀 Fetching from: ${baseUrl}${endpoint}`);

  const response = await fetch(`${baseUrl}${endpoint}`, finalOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      detail: "The API returned a non-JSON error response.",
    }));
    
    // Log the detailed error from the server to the console.
    console.error("❌ API Error Response:", errorData);
    
    throw new Error(errorData.detail || `API request failed with status ${response.status}`);
  }

  return response.json();
}