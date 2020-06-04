export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('UserLoginId');
	if(token) return true;
	  return false;
  }
}