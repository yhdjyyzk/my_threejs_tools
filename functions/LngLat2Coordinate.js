/**
 * Created by ZhaokangYuan on 2016/1/15.
 */
function lngLat2Coordinate(lng, lat, radius) {
    let x = radius * Math.cos(lng / 180 * Math.PI);
    let y = radius * Math.tan(lat / 180 * Math.PI);
    return {x, y};
}

export default lngLat2Coordinate;