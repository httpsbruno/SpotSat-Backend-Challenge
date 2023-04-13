import { PostgresDB } from "..";
import { GeometryData } from "../../models/GeometryData";
import { PointData } from "../../models/PointData";
import { PolygonData } from "../../models/PolygonData";

class Operations extends PostgresDB {
  public async distanceBetweenTwoPoints(
    location1: GeometryData,
    location2: GeometryData
  ): Promise<string> {
    try {
      this.client.connect();

      const distanceQuery = `
                SELECT ST_Distance(
                          ST_GeomFromGeoJson($1), 
                          ST_GeomFromGeoJson($2)
                      ) AS DistanceBetween
            `;

      const result = await this.client.query(distanceQuery, [
        location1.geometry,
        location2.geometry,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows[0]);
      }

      return "";
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async locationInArea(
    location: PointData,
    area: PolygonData
  ): Promise<string> {
    try {
      this.client.connect();

      const locationInAreaQuery = `
            select a.name, ST_Contains(b.polygon, a.point) as contains
            FROM locations a, areas b
            WHERE b.name = $1 AND a.name = $2
                `;

      const result = await this.client.query(locationInAreaQuery, [
        area.name,
        location.name,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return JSON.stringify(result.rows[0]);
      }

      return "";
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async locationsInArea(area: PolygonData): Promise<string> {
    try {
      this.client.connect();

      const locationsInAreaQuery = `
                    SELECT * FROM (SELECT a.name, ST_Contains(b.polygon, a.point) as contains
                    FROM locations a, areas b
                    WHERE b.name = $1) AS Points 
                    WHERE contains = 'true' 
                    `;

      const result = await this.client.query(locationsInAreaQuery, [area.name]);

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

  public async areasInCircle(
    lat: number,
    long: number,
    r: number
  ): Promise<string> {
    try {
      this.client.connect();

      const areasInCircleQuery = `
                      SELECT 
                          id_area,
                          name,
                          ST_AsGeoJSON(polygon) as geometry
                      FROM areas 
                      WHERE ST_DWithin(polygon, 
                            ST_SetSRID(ST_MakePoint(
                              $1, $2), 4326), $3);
                    `;

      const result = await this.client.query(areasInCircleQuery, [
        lat,
        long,
        r,
      ]);

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

  public async locationsInCircle(
    lat: number,
    long: number,
    r: number
  ): Promise<string> {
    try {
      this.client.connect();

      const locationsInCircleQuery = `
                      SELECT 
                          id_location,
                          name,
                          ST_AsGeoJSON(point) as geometry
                      FROM locations 
                      WHERE ST_DWithin(point, 
                            ST_SetSRID(ST_MakePoint(
                              $1, $2), 4326), $3);
                    `;

      const result = await this.client.query(locationsInCircleQuery, [
        lat,
        long,
        r,
      ]);

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
}

export { Operations };
