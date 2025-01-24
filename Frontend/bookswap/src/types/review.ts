export interface IReview {
  id: string;
  book_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface INewReview {
  book_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
}
