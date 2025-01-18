export interface IBook {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  status: string;
}

export interface INewBook {
  title: string;
  author: string;
  description: string;
  genre: string;
  status: string;
  owner_id: string;
}

export interface IBookImage {
  book_id: string;
  image_url: string;
}
