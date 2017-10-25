export class User {

  constructor(
    public id: string,
    public email: string,
    public firstname: string,
    public lastname: string,
    public displayName: string,
    public phoneNumber: string,
    public created: Date,
    public updated?: Date,
    public hasResetInProgress?: boolean,
    public isActive?: boolean,
    public seances?: string[]
  ) { }

}
