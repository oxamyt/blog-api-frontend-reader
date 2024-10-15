export async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = "Failed to submit form";

    if (url.includes("login")) {
      errorMessage =
        errorData.message || "Invalid credentials. Please try again.";
    } else if (url.includes("register")) {
      errorMessage =
        errorData.message || "Username already exists. Please choose another.";
    }

    throw new Error(errorMessage);
  }
  return await response.json();
}

export async function postRequestLogout() {
  const response = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to logout. Please try again.");
  }
}

export async function getPostsRequest(url, token) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Please Login First");
  return await response.json();
}

export async function getSinglePostRequest(id, token) {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function postRequestComment(id, token, data) {
  const response = await fetch(`http://localhost:3000/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create comment. Please try again.");
  }
  return await response.json();
}

export async function deleteRequestComment(id, commentId, token) {
  const response = await fetch(
    `http://localhost:3000/posts/${id}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      errorMessage || "Failed to delete comment. Please try again."
    );
  }

  if (response.status === 204) {
    return { success: true };
  }

  return await response.json();
}

export async function putRequestComment(id, commentId, data, token) {
  const response = await fetch(
    `http://localhost:3000/posts/${id}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      errorMessage || "Failed to edit comment. Please try again."
    );
  }

  return await response.json();
}
