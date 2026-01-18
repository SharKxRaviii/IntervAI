export interface KeywordResponse {
  keywords: string[];
}

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  keywords: string[] | null;
}