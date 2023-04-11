import { PostgresDB } from "..";
import { LoginData } from "../../models/LoginData";

class UserCRUD extends PostgresDB {
  public async insert(login: LoginData, admin: string): Promise<boolean> {
    try {
      this.client.connect();

      const insertAccountQuery = `
                INSERT INTO users (
                    id_user,
                    username,
                    password,
                    isadmin,
                    admin_name
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4, 
                    $5
                ) RETURNING id_user
            `;

      const result = await this.client.query(insertAccountQuery, [
        "asdfdsfdsf5",
        login.username,
        login.password,
        true,
        admin
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable Account");
    }
  }
}

export { UserCRUD };
