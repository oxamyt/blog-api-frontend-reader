export async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to submit form");
  return await response.json();
}

export async function getPostsRequest(url, token) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch posts");
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
