
export interface GalleryImage {
  id: string;
  url: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: number;
  size: number;
  type: string;
}

export interface AIAnalysisResult {
  title: string;
  description: string;
  tags: string[];
}
