import { useParams, useNavigate } from "react-router-dom";
import Button from "@withpark/ui/components/Button";
import Card from "@withpark/ui/components/Card";
import usePlace from "../../api/queries/usePlace";
import { PlaceIcon } from "@withpark/assets/icons/PlaceIcon";

const PlaceDetailPage = () => {
  const navigate = useNavigate();

  const { placeDocumentId } = useParams<{ placeDocumentId: string }>();
  const { data: place, isLoading, error } = usePlace(placeDocumentId ?? "");

  const handleBackToList = () => {
    navigate("/place");
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#666",
        }}
      >
        파크골프장 정보를 불러오는 중...
      </div>
    );
  }

  if (error || !place) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#666",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          파크골프장 정보를 불러올 수 없습니다.
        </div>
        <Button onClick={handleBackToList}>목록으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* 뒤로가기 버튼 */}
      <div style={{ marginBottom: "24px" }}>
        <Button variant="secondary" onClick={handleBackToList}>
          ← 목록으로 돌아가기
        </Button>
      </div>

      {/* 파크골프장 상세 정보 */}
      <Card>
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            {place.area}
          </div>

          <h1
            style={{
              margin: "0 0 16px 0",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {place.name}
          </h1>

          {place.address && (
            <div
              style={{
                fontSize: "16px",
                color: "#666",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <PlaceIcon size={16} /> {place.address}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              fontSize: "15px",
              color: "#777",
            }}
          >
            {place.size && <div>🏌️ 규모: {place.size}</div>}
            {place.holeCount && <div>⛳ 홀 수: {place.holeCount}</div>}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlaceDetailPage;
