export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration {
  username: string;
  email: string;
  password: string;
}

export interface ISendEmail {
  email: string;
}

export interface IChangePassword {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}
