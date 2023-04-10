class PasswordValidator {
    public password: string;
  
    public errors: string;
  
    public constructor(password: string) {
      this.errors = '';
      this.password = this.validate(password);
    }
  
    private validate(password: string): string {
      if (password.length === 0) {
        this.errors += 'password:password required|';
  
        return '';
      }
  
      if (password.trim().length !== 4) {
        this.errors += 'password:invalid password|';
  
        return '';
      }
  
      if (!Number(password)){
        this.errors += 'password:is not a number|';
  
        return '';
      }
  
      return password.trim();
    }
  }
  
  export { PasswordValidator };