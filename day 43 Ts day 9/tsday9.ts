interface ApiResponse<T> {
    status: number;
    data: T;
  }
  
  function handleResponse<T>(response: ApiResponse<T>): T {
    console.log("Status:", response.status);
    return response.data;
  }
  
  const userResponse = handleResponse({ status: 200, data: { name: "Madan", age: 20 } });
  