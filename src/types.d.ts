export type ApiInformation = {
  author: string;
  apiVersion: string;
  apiName: string;
  apiDescription: string;
  apiDocumentation: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  username: string;
  bearerToken: string;
  createdAt: Date;
};
