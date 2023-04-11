import { PostgresDB } from "..";
import { LocationData } from "../../models/LocationData";

class AreaCRUD extends PostgresDB {
  public async insert(location: LocationData, admin: string): Promise<boolean> {
    try {
      this.client.connect();

      const insertAccountQuery = `
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
      const result = await this.client.query(insertAccountQuery, [
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
      throw new Error("503: service temporarily unavailable Account");
    }
  }

  public async update(location: LocationData, admin: string): Promise<boolean>{
    try {
        this.client.connect();
  
        const insertAccountQuery = `
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
        const result = await this.client.query(insertAccountQuery, [
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
        throw new Error("503: service temporarily unavailable Account");
      }
  }
}

export { AreaCRUD };