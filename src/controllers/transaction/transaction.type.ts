import { Request, Response } from "express";

export interface ICreateTransactionController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IGetAllTransactionsController {
  execute(res: Response): Promise<Response>;
}

export interface IGetTransactionBalanceController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IUpdateTransactionController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IDeleteTransactionController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IGetTransactionByIdController {
  execute(req: Request, res: Response): Promise<Response>;
}
