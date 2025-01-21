export interface IReview {
  reviewer_id: string;
  rating: number;
  comment: string;
}

export interface INewReview {
  book_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
}
