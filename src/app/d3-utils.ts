import * as d3 from 'd3';
import { ModelCell } from './entity/model/s2';

export function redisplay(
    svg: any,
    geoProjection: d3.GeoProjection,
    widthSVG: number,
    heightSVG: number,
    displayLand: boolean,
    displayGraticule: boolean,
    geoJSON: GeoJSON.FeatureCollection,
) {
    svg
        .attr('width', widthSVG)
        .attr('height', heightSVG)
        ;
    const geoPath = d3.geoPath()
        .projection(geoProjection);
    if (displayLand) {
        // Display geo data
        function updatePath(s) {
            s
                .attr('id', d => `bound-${d.id}`)
                .attr('class', 'bound')
                .attr('stroke', 'gray')
                .attr('stroke-width', '1')
                .attr('d', geoPath)
                .attr('fill', '#66BB6A')
                ;
        }
        const sPath = svg.selectAll('.bound').data(geoJSON.features);
        const sPathEnter = sPath.enter().append('path');
        const sPathExit = sPath.exit();
        updatePath(sPath);
        updatePath(sPathEnter);
        sPathExit.remove();
    } else {
        d3.selectAll('.bound').remove();
    }
    if (displayGraticule) {
        // Display geo graticule
        const gg = d3.geoGraticule().lines();
        function updateSgg(s) {
            s
                .attr('class', 'graticule')
                .attr('stroke', '#eee')
                .attr('stroke-width', '1')
                .attr('d', geoPath)
                .attr('fill', 'none')
                ;
        }
        const sGg = svg.selectAll('.graticule').data(gg);
        const sGgEnter = sGg.enter().append('path');
        const sGgExit = sGg.exit();
        updateSgg(sGg);
        updateSgg(sGgEnter);
        sGgExit.remove();
    } else {
        svg.selectAll('.graticule').remove();
    }
}


export function redisplayLine(
    svg: any,
    geoProjection: d3.GeoProjection,
    cells: Array<ModelCell>,
    display: boolean,
) {
    svg.selectAll('.line').remove();
    if (display) {
        const geoJSON = {
            type: 'FeatureCollection',
            features: [
                newLinesFromCells(cells),
            ],
        };
        svg.selectAll('.line').remove();
        // Display geo data
        const geoPath = d3.geoPath()
            .projection(geoProjection);
        function updatePath(s) {
            s
                .attr('id', d => `line-${d.id}`)
                .attr('class', 'line')
                .attr('stroke', '#DAA520')
                .attr('stroke-width', '2')
                .attr('fill', 'none')
                .attr('d', geoPath)
                ;
        }
        const sPath = svg.selectAll('.line').data(geoJSON.features);
        const sPathEnter = sPath.enter().append('path');
        const sPathExit = sPath.exit();
        updatePath(sPath);
        updatePath(sPathEnter);
        sPathExit.remove();
    }
}


export function redisplayCells(
    svg: any,
    geoProjection: any,
    cells: Array<ModelCell>,
    display: boolean,
) {
    // Display geo data
    const geoPath = d3.geoPath()
        .projection(geoProjection);
    if (display) {
        function updatePath(s) {
            s
                .attr('id', d => `cell-${d.properties.id}`)
                .attr('class', 'cell')
                .attr('stroke', '#00CED1')
                .attr('stroke-width', '2')
                .attr('d', geoPath)
                .attr('fill', 'none')
                // .attr('opacity', 0.5)
                ;
        }
        const polygons = cells.map(v => newPolygonFromCell(v));
        const geoJSON = {
            type: 'FeatureCollection',
            features: polygons,
        };
        const sPath = svg.selectAll('.cell').data(geoJSON.features);
        const sPathEnter = sPath.enter().append('path');
        const sPathExit = sPath.exit();
        updatePath(sPath);
        updatePath(sPathEnter);
        sPathExit.remove();
    } else {
        svg.selectAll('.cell').remove();
    }
}

export function redisplaySelectedCells(
    svg: any,
    cells: Array<ModelCell>,
) {
    svg.selectAll('.cell').attr('fill', 'none');
    for (const cell of cells) {
        svg.select(`#cell-${cell.id}`).attr('fill', 'red');
    }
}


export function redisplayCursorCell(
    svg: any,
    cell: ModelCell,
) {
    svg.selectAll('.cursor-cell').attr('fill', 'none');
    svg.select(`#cell-${cell.id}`).attr('fill', 'yellow');
}


export function redisplayPoint(
    svg: any,
    id: string,
    lat: number,
    lng: number,
    geoProjection: any,
) {
    const p = geoProjection([lng, lat]);
    svg.select(`#${id}`).remove();
    svg.append('circle')
        .attr('id', id)
        .attr('class', 'point')
        .attr('cx', p[0])
        .attr('cy', p[1])
        .attr('r', 5)
        .attr('stroke', 'black')
        .attr('stroke-width', '1')
        .attr('fill', 'black')
        ;
}


export function clearPoint(
    svg: any,
) {
    svg.selectAll('.point').remove();
}

function newPolygonFromCell(cell: ModelCell): GeoJSON.Feature {
    let points = cell.boundLoop.points.map(p => [p.longitude, p.latitude]);
    points.push([
        cell.boundLoop.points[0].longitude,
        cell.boundLoop.points[0].latitude,
    ]);
    points = points.reverse();
    return {
        type: 'Feature',
        properties: cell as any,
        geometry: {
            type: 'Polygon',
            coordinates: [
                points,
            ],
        },
    };
}


function newLinesFromCells(cells: Array<ModelCell>): GeoJSON.Feature {
    return {
        type: 'Feature',
        properties: [],
        geometry: {
            type: 'LineString',
            coordinates: cells.map(cell => [cell.center.longitude, cell.center.latitude]),
        },
    };
}
