/**
 * Created by ZhaokangYuan on 2016/1/15.
 */
function lngLat2Coordinate(lng, lat, radius) {
	let len = radius * Math.cos(lat / 180 * Math.PI);
	let x = radius * Math.sin(lng / 180 * Math.PI);
	let y = len;

	return {x, y};
}

export default lngLat2Coordinate;