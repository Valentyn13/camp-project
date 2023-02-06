export interface IResTodo {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  status: boolean;
}

export interface ICreate {
  title: string;
  content: string;
}
