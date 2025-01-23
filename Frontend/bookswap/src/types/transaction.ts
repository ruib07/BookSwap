export interface INewTransaction {
  book_id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
}

export interface ITradeBookModalProps {
  bookId: string;
  receiverId: string;
  onClose: () => void;
}
