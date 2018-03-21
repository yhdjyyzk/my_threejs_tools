/**
 * Created by ZhaokangYuan on 2018/3/21.
 */
function lngLat2Mercator(lng, lat, radius) {
    let x = radius * Math.cos(lng / 180 * Math.PI);
    let y = radius * Math.tan(lat / 180 * Math.PI);
    return {x, y};
}

export default lngLat2Mercator;