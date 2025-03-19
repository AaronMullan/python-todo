const toggleTodo = async (id: number, completed: boolean) => {
  if (!API_ENDPOINT) {
    setError(
      "API endpoint is not configured. Please check your environment variables."
    );
    return;
  }

  try {
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    const baseUrl = API_ENDPOINT.replace(/\/$/, "");
    const url = `${baseUrl}/todos/${id}`;
    console.log("Updating todo at:", url);
    console.log("Request body:", {
      title: todo.title,
      description: todo.description,
      completed,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: defaultHeaders,
      mode: "cors",
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        completed,
      }),
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Updated todo:", data);
    setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
  } catch (error) {
    console.error("Error updating todo:", error);
    setError(error instanceof Error ? error.message : "Failed to update todo");
  }
};

const deleteTodo = async (id: number) => {
  if (!API_ENDPOINT) {
    setError(
      "API endpoint is not configured. Please check your environment variables."
    );
    return;
  }

  try {
    const baseUrl = API_ENDPOINT.replace(/\/$/, "");
    const url = `${baseUrl}/todos/${id}`;
    console.log("Deleting todo at:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: defaultHeaders,
      mode: "cors",
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    // Try to parse the response as JSON, but don't fail if it's not JSON
    try {
      const data = await response.json();
      console.log("Delete response:", data);
    } catch (e) {
      console.log("Delete response was not JSON");
    }

    setTodos(todos.filter((todo) => todo.id !== id));
  } catch (error) {
    console.error("Error deleting todo:", error);
    setError(error instanceof Error ? error.message : "Failed to delete todo");
  }
};
