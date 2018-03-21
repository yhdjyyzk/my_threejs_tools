import Polygon from 'zrender/src/graphic/shape/Polygon';
import Rect from 'zrender/src/graphic/shape/Rect';
import Group from 'zrender/src/container/Group';
import lngLat2Mercator from '../functions/lngLat2Mercator';

/*
 * @param {ZRender} zr
 * @param {Object} geojson. xiping.json
 **/
export default function drawGeo(zr, geojson) {
   let g = new Group();
   zr.add(g);
   let center = [400, 400];

   let {features} = geojson;
   let {geometry} = features[0];
   let {coordinates} = geometry;
   let coords = [];
   let r = 400;

   for(let i = 0; i < coordinates.length; i++) {
      let coord = coordinates[i];

      for(let j = 0; j < coord.length; j++) {
         let c = lngLat2Mercator(coord[j][0], coord[j][1], r);
         coords.push([400 - c.x, 600 - c.y]);
      }
   }

   let p = new Polygon({
      shape: {
         points: coords
      },
      style: {
         stroke: 'red',
         lineWidth: 1,
         fill: 'blue',
         strokeNoScale: true
      },
      scale: [100, 100],
   });

   let bounding = p.getBoundingRect();
   let origin = [
      bounding.x + bounding.width / 2,
      bounding.y + bounding.height / 2
   ];
   p.attrKV("origin", origin);

   let rect = new Rect({
      shape: p.getBoundingRect(),
      style:{
         stroke: 'red',
         lineWidth: 2,
         fill: null
      }
   });

   g.add(p);
   g.add(rect);
}