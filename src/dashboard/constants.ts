export interface PODCAST_API_RESPONSE {
  _id: string;
  title: string;
  category: string;
  audioUrl: string;
  thumbnailUrl: string;
  email: string;
  createdAt?: Date;
}

export interface PODCAST_PAYLOAD {
  title: string;
  category: string;
  email: string;
  thumbnail: File | null;
  file: File | null;
}

export interface USERS_API_RESPONSE {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  id: string;
  favourites: string[];
}

export interface ERROR_OBJECT {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
