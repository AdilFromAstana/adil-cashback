import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ShopDetailsModal from "./ShopDetailsModal";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

type Shop = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

interface ShopsMapProps {
  shops: Shop[];
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
    return [shops[0].latitude, shops[0].longitude];
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
        iconCreateFunction={(cluster: { getChildCount: () => number }) => {
          const count = cluster.getChildCount();
          return createCircleIcon(count);
        }}
      >
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.latitude, shop.longitude]}
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

const ShopsMap: React.FC<ShopsMapProps> = ({ shops }) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [modalVersion, setModalVersion] = useState(0);

  const handleSelectShop = (shop: Shop) => {
    if (selectedShop?.id === shop.id) {
      setSelectedShop(null);
      setTimeout(() => setSelectedShop(shop), 0);
    } else {
      setSelectedShop(shop);
    }
  };

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

      {selectedShop && (
        <ShopDetailsModal
          key={selectedShop.id + "_" + modalVersion} // modalVersion - счетчик состояния
          shop={selectedShop}
          onClose={() => {
            setSelectedShop(null);
            setModalVersion((v) => v + 1);
          }}
        />
      )}
    </div>
  );
};

export default ShopsMap;
