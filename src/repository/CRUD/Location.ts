import { PostgresDB } from "..";
import { LocationData } from "../../models/LocationData";

class LocationCRUD extends PostgresDB {
  public async insert(location: LocationData, admin: string): Promise<boolean> {
    try {
      this.client.connect();

      const insertLocationQuery = `
                INSERT INTO locations (
                    id_location,
                    name,
                    point,
                    admin_name
                ) VALUES (
                    $1,
                    $2,
                    ST_GeomFromGeoJson($3),
                    $4
                ) RETURNING id_location
            `;
      //ST_SetSRID(ST_MakePoint($3, $4), 4326),
      const result = await this.client.query(insertLocationQuery, [
        location.id,
        location.name,
        location.geometry,
        admin,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async getAllLocation(): Promise<string> {
    try {
      this.client.connect();

      const getAllQuery = `
                  SELECT * FROM locations ORDER BY created_at DESC
              `;

      const result = await this.client.query(getAllQuery);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows);
      }

      return "";
    } catch (error) {
      console.log(error);
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async getLocationbyId(id: string): Promise<string> {
    try {
      this.client.connect();

      const getLocationByIdQuery = `
                  SELECT * FROM locations 
                  WHERE id_location = $1
              `;

      const result = await this.client.query(getLocationByIdQuery, [id]);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows[0]);
      }

      return "";
    } catch (error) {
      console.log(error);
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { LocationCRUD };
