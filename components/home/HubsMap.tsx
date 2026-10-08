import { geoConicConformal, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry, Polygon } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";

type Hub = {
  name: string;
  lon: number;
  lat: number;
  home?: boolean;
  dx?: number;
  dy?: number;
  anchor?: "start" | "end" | "middle";
};

const HUBS: Hub[] = [
  { name: "Vilnius", lon: 25.28, lat: 54.69, home: true, dx: 12, dy: -10 },
  { name: "Riga", lon: 24.1, lat: 56.95, dx: -12, dy: -10, anchor: "end" },
  { name: "Tallinn", lon: 24.75, lat: 59.44, dx: 12, dy: -8 },
  { name: "Warsaw", lon: 21.01, lat: 52.23, dx: -12, dy: 16, anchor: "end" },
  { name: "Berlin", lon: 13.4, lat: 52.52, dx: -12, dy: -8, anchor: "end" },
  { name: "Paris", lon: 2.35, lat: 48.86, dx: -12, dy: 16, anchor: "end" },
  { name: "Belgrade", lon: 20.46, lat: 44.82, dx: 12, dy: 16 },
  { name: "London", lon: -0.12, lat: 51.51, dx: -12, dy: -8, anchor: "end" },
  { name: "Brussels", lon: 4.35, lat: 50.85, dx: 12, dy: -8 },
];

const W = 1000;
const H = 620;

const FRAME: Feature<Polygon> = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [[
      [-12, 36],
      [-12, 62],
      [34, 62],
      [34, 36],
      [-12, 36],
    ]],
  },
};

const projection = geoConicConformal()
  .rotate([-12, 0])
  .parallels([40, 60])
  .fitExtent(
    [
      [20, 20],
      [W - 20, H - 20],
    ],
    FRAME,
  );

const path = geoPath(projection);
const topology = world as unknown as Topology;
const countries = feature(
  topology,
  topology.objects.countries as GeometryCollection,
) as FeatureCollection<Geometry>;
const countryPaths = countries.features
  .map((country) => path(country))
  .filter((value): value is string => Boolean(value));
const points = HUBS.map((hub) => {
  const coordinates = projection([hub.lon, hub.lat]);
  return {
    ...hub,
    x: coordinates?.[0] ?? 0,
    y: coordinates?.[1] ?? 0,
  };
});

export function HubsMap({ label }: { label: string }) {
  const home = points.find((point) => point.home);

  return (
    <figure className="hubs-map relative mt-10 overflow-hidden border border-surface-border bg-legal-black-panel/40">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={label}
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="#111114" stroke="#2a2a30" strokeWidth={0.6} strokeLinejoin="round">
          {countryPaths.map((countryPath, index) => (
            <path key={index} d={countryPath} />
          ))}
        </g>
        {home && (
          <g
            stroke="currentColor"
            strokeWidth={0.8}
            strokeDasharray="3 5"
            className="text-waveform-cyan/40"
          >
            {points
              .filter((point) => !point.home)
              .map((point) => (
                <line
                  key={point.name}
                  x1={home.x}
                  y1={home.y}
                  x2={point.x}
                  y2={point.y}
                />
              ))}
          </g>
        )}
        {points.map((point) => (
          <g key={point.name} className="text-waveform-cyan">
            {point.home && (
              <circle
                cx={point.x}
                cy={point.y}
                r={7}
                fill="currentColor"
                opacity={0.25}
                className="hubs-map-pulse"
              />
            )}
            <circle
              cx={point.x}
              cy={point.y}
              r={point.home ? 5 : 3.5}
              fill="currentColor"
            />
            <text
              x={point.x + (point.dx ?? 10)}
              y={point.y + (point.dy ?? -6)}
              textAnchor={point.anchor ?? "start"}
              fill="#d4d4d8"
              fontSize={13}
              letterSpacing={1.2}
              className="hubs-map-label font-mono uppercase"
            >
              {point.name}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
