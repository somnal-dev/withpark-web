import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@withpark/ui/components/Card";
import Select from "@withpark/ui/components/Select";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import usePopularPlaces from "../../../api/queries/usePopularPlaces";
import IconButton from "@withpark/ui/components/IconButton";
import { LikeIcon } from "@withpark/assets/icons/LikeIcon";
import { CommentIcon } from "@withpark/assets/icons/CommentIcon";
import { GolfIcon } from "@withpark/assets/icons/GolfIcon";
import { PlaceIcon } from "@withpark/assets/icons/PlaceIcon";

const PopularPlaces = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const navigate = useNavigate();

  const {
    data: popularPlaces,
    isLoading,
    error,
  } = usePopularPlaces({
    limit: 5,
    area: selectedArea || undefined,
  });

  // 스타일 객체들
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    } as const,
    errorMessage: {
      textAlign: "center",
      color: "#999",
      padding: "20px",
      fontSize: "14px",
    } as const,
    placeItem: {
      padding: "12px",
      border: "1px solid #f0f0f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa",
      cursor: "pointer",
      transition: "background-color 0.2s",
    } as const,
    placeContent: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    } as const,
    leftSection: { flex: 1 } as const,
    areaTag: {
      backgroundColor: "#e3f2fd",
      color: "#1976d2",
      padding: "2px 6px",
      borderRadius: "3px",
      fontSize: "10px",
      fontWeight: "500",
    } as const,
    placeName: {
      fontWeight: "bold",
      fontSize: "14px",
      color: "#333",
      marginBottom: "4px",
    } as const,
    address: {
      fontSize: "11px",
      color: "#666",
      marginBottom: "6px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    } as const,
    golfInfo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "11px",
      color: "#888",
    } as const,
    rightSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "4px",
    } as const,
    statsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "11px",
    } as const,
    likeStats: {
      color: "#ff6b6b",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    } as const,
    commentStats: {
      color: "#000000",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    } as const,
    dateText: {
      fontSize: "9px",
      color: "#aaa",
    } as const,
    emptyMessage: {
      textAlign: "center",
      color: "#666",
      padding: "30px 20px",
      fontSize: "14px",
    } as const,
  };

  // 지역 옵션들
  const areaOptions = [
    { value: "", label: "전체" },
    ...[
      "서울",
      "경기",
      "인천",
      "강원",
      "충북",
      "충남",
      "대전",
      "세종",
      "전북",
      "전남",
      "광주",
      "경북",
      "경남",
      "대구",
      "울산",
      "부산",
      "제주",
    ].map((area) => ({ value: area, label: area })),
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAreaChange = (value: string | number) => {
    setSelectedArea(value.toString());
  };

  const handlePlaceClick = (placeId: number) => {
    navigate(`/place?id=${placeId}`);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#f0f8ff";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#fafafa";
  };

  return (
    <Card
      title="인기 파크골프장"
      titleAction={
        <Select
          options={areaOptions}
          value={selectedArea}
          onChange={handleAreaChange}
          size="small"
          placeholder="지역 선택"
        />
      }
    >
      {isLoading ? (
        <LoadingBar type="dots" message="인기 파크골프장을 불러오는 중..." />
      ) : error ? (
        <div style={styles.errorMessage}>데이터를 불러올 수 없습니다</div>
      ) : popularPlaces?.data && popularPlaces.data.length > 0 ? (
        <div style={styles.container}>
          {popularPlaces.data.map((place, _) => (
            <div
              key={place.id}
              style={styles.placeItem}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handlePlaceClick(place.id)}
            >
              <div style={styles.placeContent}>
                <div style={styles.leftSection}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <div style={styles.areaTag}>{place.area}</div>
                  </div>

                  <div style={styles.placeName}>{place.name}</div>

                  {place.address && (
                    <div style={styles.address}>
                      <PlaceIcon size={14} />{" "}
                      {place.address.length > 30
                        ? `${place.address.substring(0, 30)}...`
                        : place.address}
                    </div>
                  )}

                  <div style={styles.golfInfo}>
                    {place.size && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <GolfIcon size={16} /> {place.size}
                      </span>
                    )}
                    {place.holeCount && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <GolfIcon size={16} /> {place.holeCount}
                      </span>
                    )}
                  </div>
                </div>

                <div style={styles.rightSection}>
                  <div style={styles.statsContainer}>
                    <span style={styles.likeStats}>
                      <IconButton
                        icon={<LikeIcon fill={false} />}
                        readonly
                        size="small"
                        variant="ghost"
                      >
                        {place.likeCount}
                      </IconButton>
                    </span>
                    <span style={styles.commentStats}>
                      <CommentIcon size={14} /> {place.comments?.length || 0}
                    </span>
                  </div>
                  <div style={styles.dateText}>
                    {formatDate(place.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyMessage}>
          {selectedArea
            ? `'${selectedArea}' 지역의 인기 파크골프장이 없습니다`
            : "인기 파크골프장이 없습니다"}
        </div>
      )}
    </Card>
  );
};

export default PopularPlaces;
