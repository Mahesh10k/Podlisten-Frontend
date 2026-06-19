import type { PODCAST_PAYLOAD } from "@/dashboard/constants";

const DOMAIN = "https://podlisten-server-production.up.railway.app";
const PODCAST_URL = `${DOMAIN}/podcasts`;
const UPLOAD_URL = `${DOMAIN}/upload`;
const USERS_URL = `${DOMAIN}/users`;
const LOGIN_URL = `${DOMAIN}/login`;
const FAVOURITES_URL = `${DOMAIN}/favourites`;
const token = localStorage.getItem("token");

export const getPodcasts = async () => {
  try {
    const response = await fetch(PODCAST_URL);

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const uploadPodcast = async (body: PODCAST_PAYLOAD) => {
  const formData = new FormData();

  formData.append("title", body.title);
  formData.append("category", body.category);
  formData.append("email", body.email);

  if (body.thumbnail) {
    formData.append("thumbnail", body.thumbnail);
  }

  if (body.file) {
    formData.append("file", body.file);
  }

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
};

export const deletePodcast = async (id: string) => {
  try {
    const response = await fetch(PODCAST_URL, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (body: unknown) => {
  try {
    const response = await fetch(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (body: unknown) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(USERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const addFavourites = async (podcastId: string, email: string) => {
  try {
    const response = await fetch(FAVOURITES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ podcastId, email }),
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const deleteFavourite = async (podcastId: string, email: string) => {
  try {
    const response = await fetch(FAVOURITES_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ podcastId, email }),
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};
