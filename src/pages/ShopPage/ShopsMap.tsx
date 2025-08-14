import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Shop } from "../../types";

interface ShopsMapProps {
  shops: Shop[];
  handleSelectShop: (shop: Shop) => void;
}

const createCircleIcon = (count: number) =>
  new DivIcon({
    html: `<div style="
      background-color: #335b45; 
      color: #d4af37; 
      border-radius: 50%; 
      width: 30px; 
      height: 30px; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      font-weight: bold;
      border: 2px solid #d4af37;
      font-size: 16px;
      ">
      ${count}
    </div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

const ShopsMapInner: React.FC<{
  shops: Shop[];
  onSelectShop: (shop: Shop) => void;
}> = React.memo(({ shops, onSelectShop }) => {
  const center = useMemo<[number, number]>(() => {
    if (shops.length === 0) return [0, 0];
    return [
      parseFloat(shops[0].latitude ?? "0"),
      parseFloat(shops[0].longitude ?? "0"),
    ];
  }, [shops]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        showCoverageOnHover={false}
        iconCreateFunction={(cluster: { getChildCount: () => any }) => {
          const count = cluster.getChildCount();
          return createCircleIcon(count);
        }}
      >
        {shops
          .filter((shop) => shop.latitude && shop.longitude)
          .map((shop) => (
            <Marker
              key={shop.id}
              position={[
                parseFloat(shop.latitude!),
                parseFloat(shop.longitude!),
              ]}
              eventHandlers={{
                click: () => onSelectShop(shop),
              }}
              icon={createCircleIcon(1)}
            />
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
});

const ShopsMap: React.FC<ShopsMapProps> = ({ shops, handleSelectShop }) => {
  if (shops.length === 0) return <div>Магазины не найдены</div>;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ShopsMapInner shops={shops} onSelectShop={handleSelectShop} />
    </div>
  );
};

export default ShopsMap;
