export type INote = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IGenericResponse = {
  status: string;
  message: string;
};

export type INoteResponse = {
  status: string;
  note: INote;
};

export type INotesResponse = {
  status: string;
  results: number;
  notes: INote[];
};


export type ICase = {
  id: string;
  title: string;
  host: string;
  uri: string;
  method: string;
  request_body: string;
  expected_result: string;
  category: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};


export type ICaseResponse = {
  status: string;
  case: ICase;
};

export type ICasesResponse = {
  status: string;
  results: number;
  cases: ICase[];
};
