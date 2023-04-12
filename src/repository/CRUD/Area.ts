import { PostgresDB } from "..";
import { LocationData } from "../../models/LocationData";

class AreaCRUD extends PostgresDB {
  public async insert(location: LocationData, admin: string): Promise<boolean> {
    try {
      this.client.connect();

      const insertAreaQuery = `
                INSERT INTO areas (
                    id_area,
                    name,
                    polygon,
                    admin_name
                ) VALUES (
                    $1,
                    $2,
                    ST_GeomFromGeoJson($3),
                    $4
                ) RETURNING id_area
            `;
      //ST_SetSRID(ST_MakePoint($3, $4), 4326),
      const result = await this.client.query(insertAreaQuery, [
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

  public async getAllArea(): Promise<string> {
    try {
      this.client.connect();

      const getAllQuery = `
                  SELECT * FROM areas ORDER BY created_at DESC
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

  public async getAreabyId(id: string): Promise<string> {
    try {
      this.client.connect();

      const getAreaByIdQuery = `
                  SELECT * FROM areas 
                  WHERE id_area = $1
              `;

      const result = await this.client.query(getAreaByIdQuery, [id]);

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

  public async update(location: LocationData, admin: string): Promise<boolean> {
    try {
      this.client.connect();

      const updateAreaQuery = `
                UPDATE areas 
                SET
                    name = $1,
                    polygon = $2,
                    admin_name = $3
                WHERE id_area = $4
                RETURNING id_area
            `;
      
      const result = await this.client.query(updateAreaQuery, [
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
      console.log(error);
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      this.client.connect();

      const deleteQuery = `
                  DELETE FROM areas 
                  WHERE id_area = $1
              `;

      const result = await this.client.query(deleteQuery, [id]);

      this.client.end();

      if (result.rowCount !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { AreaCRUD };
