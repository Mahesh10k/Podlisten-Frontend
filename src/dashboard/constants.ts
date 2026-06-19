export interface PODCAST_API_RESPONSE {
  _id: string;
  title: string;
  category: string;
  audioUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
}

export interface PODCAST_PAYLOAD {
  title: string;
  category: string;
  email: string;
  thumbnail: File | null;
  file: File | null;
}
