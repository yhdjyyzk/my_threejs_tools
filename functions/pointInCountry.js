var PointInCountry = function () {
    this.isInGraph = function (countryMap, point) {
        var isIn = false;
        var typeMap = countryMap.geometry.type;
        var coordinates = countryMap.geometry.coordinates

        if (typeMap == "Polygon") {
            var coordinate = coordinates[0];
            var isInOutPolygon = isInPolygon(coordinate, point);
            if (isInOutPolygon) {
                for (var i = coordinates.length - 1; i >= 1; i--) {
                    coordinate = coordinates[i];
                    var isInInnerPolygon = isInPolygon(coordinate, point);
                    if (isInInnerPolygon)
                        return false;
                };
                return true;
            }
        } else if (typeMap == "MultiPolygon") {

            for (var j = coordinates.length - 1; j >= 0; j--) {
                var coordinate = coordinates[j][0];
                var isInOutPolygon = isInPolygon(coordinate, point);
                if (isInOutPolygon) {
                    for (var i = coordinates[j].length - 1; i >= 1; i--) {
                        coordinate = coordinates[j][i];
                        var isInInnerPolygon = isInPolygon(coordinate, point);
                        if (isInInnerPolygon)
                            return false;
                    };
                    return true;
                }
            };
        }
        return false;
    }

    function isInPolygon(coordinate, point) {
        if (coordinate.length > 3) {
            var arrayCrossPoint = new Array();
            for (var j = coordinate.length - 1; j >= 1; j--) {
                var p1 = coordinate[j];
                var p2 = coordinate[j - 1];
                var isPoint = getCrossPoint(p1, p2, point);
                if (isPoint != 0) {
                    arrayCrossPoint[arrayCrossPoint.length] = isPoint;
                };
            };

            var countPU = 0;
            var countPD = 0;

            for (var j = 0; j < arrayCrossPoint.length; j++) {

                if (point[1] < arrayCrossPoint[j][1] + 0.0000000001 && point[1] > arrayCrossPoint[j][1] - 0.0000000001) {
                    return true;
                }
                if (point[1] < arrayCrossPoint[j][1]) {
                    countPU++;
                }
                if (point[1] > arrayCrossPoint[j][1]) {
                    countPD++;
                }
            };
            if (countPU % 2 == 1 && countPD % 2 == 1) {
                return true;
            };
        };
        return false;
    }

    function getCrossPoint(p1, p2, p) {
        var x1 = p1[0];
        var x2 = p2[0];
        var y1 = p1[1];
        var y2 = p2[1];
        var x0 = p[0];
        var y0 = p[1];

        var x = p[0];
        if (x1 == x2 && x2 == x0) {
            var minY = y1 < y2 ? y1 : y2;
            return [x0, minY];
        }

        if ((x1 <= x && x < x2) || (x2 < x && x <= x1)) {
            var y = (y2 * x0 - y1 * x0 + y1 * x2 - y2 * x1) / (x2 - x1);
            return [x0, y];
        }
        return 0;
    }
}