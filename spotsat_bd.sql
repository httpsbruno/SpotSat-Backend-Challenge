CREATE TABLE users (
	"id_user" character(36) NOT NULL,
	"username" character(150) NOT NULL,
	"password" character(20) NOT NULL ,
	"isadmin" boolean NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
	"admin_name" character(150) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id_user")
) WITH (
  OIDS=FALSE
);

CREATE TABLE locations (
	"id_location" character(36) NOT NULL,
	"name" character(150) NOT NULL,
	"point" geometry(Point, 4326)  NOT NULL ,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"admin_name" character(150) NOT NULL,
	CONSTRAINT "locations_pk" PRIMARY KEY ("id_location")
) WITH (
  OIDS=FALSE
);

CREATE TABLE areas (
	"id_area" character(36) NOT NULL,
	"name" character(150) NOT NULL,
	"polygon" geometry(Polygon, 4326)  NOT NULL ,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"admin_name" character(150) NOT NULL,
	CONSTRAINT "areas_pk" PRIMARY KEY ("id_area")
) WITH (
  OIDS=FALSE
);


--Lista de locais dentro de uma área
SELECT * FROM (SELECT a.name, ST_Contains(b.polygon, a.point) as contains
FROM locations a, areas b
WHERE b.name = 'Area 2') as Points 
Where contains = 'true' 

-- verificar se um lugar está em uma área
SELECT a.name, ST_Contains(b.polygon, a.point) as contains
FROM locations a, areas b
WHERE b.name = 'Area 2' AND a.name = 'Ponto 1'

--distancia de dois lugares
SELECT ST_Distance('0101000020E6100000A431AF47503447C020D17DD4B98337C0','0101000020E6100000A431AF47503447C020D17DD4B98337C0') as Distance


--lugares dentro de um raio
SELECT ST_PointInsideCircle('0101000020E6100000A431AF47503447C020D17DD4B98337C0','-46.44921906466416','-23.48591223480146',0.05) as tes

--areas dentro de um raio
SELECT ST_GeomFromGeoJson(ST_asgeojson(
	ST_Buffer(
		ST_GeographyFromText(
			'POINT(-46.44921906466416 -23.48591223480146)'), 2000))); 

SELECT * FROM (SELECT a.name, ST_Contains(ST_GeomFromGeoJson(ST_asgeojson(
	ST_Buffer(
		ST_GeographyFromText(
			'POINT(-46.44921906466416 -23.48591223480146)'), 5400))), a.polygon) as contains
	FROM areas a) as AreasInCircle
WHERE contains = 'true'

SELECT * FROM areas WHERE ST_DWithin(polygon, 
ST_SetSRID(ST_MakePoint(-46.44921906466416, -23.48591223480146), 4326), 0.05);


SELECT * FROM (
	SELECT a.name, ST_Contains(ST_GeomFromGeoJson(ST_asgeojson(
		ST_Buffer(ST_GeographyFromText(
		'POINT(-46.44921906466416 -23.48591223480146)'), 5400))),
		a.point) as contains
	FROM locations a) LocationsInCircle
WHERE contains = 'true'

SELECT * FROM locations WHERE ST_DWithin(point, 
ST_SetSRID(ST_MakePoint(-46.44921906466416, -23.48591223480146), 4326), 0.05);

SELECT point FROM
			locations where name ='Ponto 1'
SELECT ST_AsGeoJSON('0101000020E6100000A431AF47503447C020D17DD4B98337C0');


SELECT 
     id_area,
         name,
            ST_AsGeoJSON(polygon) as geometry
   FROM areas ORDER BY created_at DESC
  
SELECT 
     id_location,
         name,
            ST_AsGeoJSON(point) as geometry
   FROM locations ORDER BY created_at DESC
   