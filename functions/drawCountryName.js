/**
 * 可以在三维地球上绘制国家的名称
 */

function drawCountryName(scene,radius) { //场景、地球半径
	var loader = new THREE.FontLoader();

	loader.load("./data/helvetiker1_regular.typeface.js", function (font) {
		d3.json("./data/countries.json", function (data) {
			var objs = new THREE.Object3D();

			data.forEach(function (d) {

				var country = d["country_cn"];
				var lat = d["location"].split(",")[0];
				var lng = d["location"].split(",")[1];

				var textGeo = new THREE.TextGeometry(country, {
					font: font,
					size: 3,
					height: 1,
					curveSegments: 2
				});

				var textMaterial = new THREE.MeshBasicMaterial({ color: "white" });

				var mesh = new THREE.Mesh(textGeo, textMaterial);

				var coor = LngLat2Coordinate(lng, lat, radius);

				mesh.position.x = coor["x"];
				mesh.position.y = coor["y"];
				mesh.position.z = coor["z"];

				mesh.rotation.y = Math.PI / 4;

				var angle = 0;
				if(coor["x"] > 0 && coor["z"] > 0) {
					angle = Math.atan(coor["x"] / coor["z"]);
				}
				else if(coor["x"] > 0 && coor["z"] < 0) {
					angle = Math.atan(Math.abs(coor["z"] / coor["x"])) + Math.PI / 2;
				}
				else if(coor["x"] < 0 && coor["z"] < 0) {
					angle = -(Math.atan(Math.abs(coor["z"] / coor["x"])) + Math.PI / 2);
				}
				else if(coor["x"] < 0 && coor["z"] > 0) {
					angle = -(Math.atan(coor["z"] / coor["x"]) + Math.PI / 2);
				}
				mesh.rotation.y = angle;
				objs.add(mesh);
			});

			scene.add(objs);
		});
	});
}
