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
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async getAllLocation(): Promise<string> {
    try {
      this.client.connect();

      const getAllQuery = `
                  SELECT 
                          id_location,
                          name,
                          ST_AsGeoJSON(point) as geometry
                  FROM locations ORDER BY created_at DESC
              `;

      const result = await this.client.query(getAllQuery);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows);
      }

      return "";
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async getLocationbyId(id: string): Promise<string> {
    try {
      this.client.connect();

      const getLocationByIdQuery = `
                  SELECT 
                      id_location,
                      name,
                      ST_AsGeoJSON(point) as geometry
                  FROM locations 
                  WHERE id_location = $1
              `;

      const result = await this.client.query(getLocationByIdQuery, [id]);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows[0]);
      }

      return "";
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable!");
    }
  }

  public async getLocationbyName(name: string): Promise<string> {
    try {
      this.client.connect();

      const getLocationByNameQuery = `
                  SELECT 
                      id_location,
                      name,
                      ST_AsGeoJSON(point) as geometry
                  FROM locations 
                  WHERE name = $1
              `;

      const result = await this.client.query(getLocationByNameQuery, [name]);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows[0]);
      }

      return "";
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable!");
    }
  }

  public async update(location: LocationData, admin: string): Promise<boolean> {
    try {
      this.client.connect();

      const updateLocationQuery = `
                UPDATE locations 
                SET
                    name = $1,
                    point = $2,
                    admin_name = $3
                WHERE id_location = $4
                RETURNING id_location
            `;

      const result = await this.client.query(updateLocationQuery, [
        location.name,
        location.geometry,
        admin,
        location.id,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      this.client.connect();

      const deleteQuery = `
                  DELETE FROM locations 
                  WHERE id_location = $1
              `;

      const result = await this.client.query(deleteQuery, [id]);

      this.client.end();

      if (result.rowCount !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { LocationCRUD };
