import { PostgresDB } from "..";
import { PointData } from "../../models/PointData";

class Operations extends PostgresDB {
  public async distanceBetweenTwoPoints(
    location1: PointData,
    location2: PointData
  ): Promise<string> {
    try {
      this.client.connect();

      const distanceQuery = `
                SELECT ST_Distance($1, $2) AS DistanceBetween
            `;

      const result = await this.client.query(distanceQuery, [
        location1.point,
        location2.point,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        console.log(result.rows);
        return JSON.stringify(result.rows[0]);
      }

      return "";
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { Operations };
