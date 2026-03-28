// utils/SaasAuthHandler.ts

export async function SaasAuthHandler<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let saastoken = localStorage.getItem("saasAuthToken");
  // const refreshtoken = localStorage.getItem("saasrefreshtoken");
  const saasBaseUrl = localStorage.getItem("saasDynamicBaseUrl");

  if (!saastoken || !saasBaseUrl) {
    // Immediately fail if the base URL or token isn't set.
    throw new Error("Missing auth token or base URL in localStorage.");
  }

  // --- START: Defensive Check for Token Format ---
  if (saastoken) {
    try {
      // This checks if the token was accidentally stored as a JSON string like '{"access":"..."}'
      const tokenObj = JSON.parse(saastoken);
      if (tokenObj && typeof tokenObj === 'object' && tokenObj.access) {
        console.warn("⚠️ Warning: Correcting a malformed token from localStorage. The login logic should be fixed to store only the access token string.");
        saastoken = tokenObj.access; // Use the correct string from the object
      }
    } catch {
      // If JSON.parse fails, it means the token is likely a plain string, which is correct.
      // No action needed.
    }
  }
  // --- END: Defensive Check ---

  if (!saastoken) {
    // Now, after the check, if the token is still missing, throw an error.
    throw new Error("Missing auth token in localStorage.");
  }

  const isFormData = options.body instanceof FormData;

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${saastoken}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };

  console.log("✅ Final Authorization Header:", finalOptions.headers);
  console.log(`🚀 Fetching from: ${saasBaseUrl}${endpoint}`);

  const response = await fetch(`${saasBaseUrl}${endpoint}`, finalOptions);

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