import Card from "@withpark/ui/components/Card";
import type { Place } from "../../../types/place";
import { PlaceIcon } from "@withpark/assets/icons/PlaceIcon";
import { GolfIcon } from "@withpark/assets/icons/GolfIcon";

interface PlaceCardProps {
  place: Place;
  onPlaceClick?: (placeDocumentId: string) => void;
}

const PlaceCard = ({ place, onPlaceClick }: PlaceCardProps) => {
  const handleCardClick = () => {
    onPlaceClick?.(place.documentId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card onClick={handleCardClick}>
      {/* 내용 섹션 */}
      <div style={{ padding: "8px 0" }}>
        {/* 헤더 - 지역과 골프장명 */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              marginBottom: "8px",
            }}
          >
            {place.area}
          </div>
          <h3
            style={{
              margin: "0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#2d3748",
            }}
          >
            {place.name}
          </h3>
        </div>

        {/* 골프장 정보 */}
        <div style={{ marginBottom: "12px" }}>
          {place.address && (
            <div
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <PlaceIcon size={14} /> {place.address}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              fontSize: "13px",
              color: "#888",
            }}
          >
            {place.size && (
              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <GolfIcon size={14} /> {place.size}
              </span>
            )}
            {place.holeCount && (
              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <GolfIcon size={14} /> {place.holeCount} 홀
              </span>
            )}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <div style={{ fontSize: "11px", color: "#aaa" }}>
            {formatDate(place.updatedAt)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlaceCard;
