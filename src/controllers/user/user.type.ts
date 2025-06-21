import { Request, Response } from "express";

export interface ICreateUserController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IGetAllUsersController {
  execute(res: Response): Promise<Response>;
}

export interface IGetUserBalanceController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IUpdateUserController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IDeleteUserController {
  execute(req: Request, res: Response): Promise<Response>;
}

export interface IGetUserByIdController {
  execute(req: Request, res: Response): Promise<Response>;
}
