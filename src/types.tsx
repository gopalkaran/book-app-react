export interface BookBody {
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
}

export interface Book extends BookBody {
  id: string;
  status: string;
}
