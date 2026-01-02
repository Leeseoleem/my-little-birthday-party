export interface CreatorHeaderMeta {
  value: number; // 0 ~ 1
  fallbackTo: string;
}

// 라우트들이 공통으로 가질 수 있는 staticData 스키마
export interface AppStaticData {
  creatorHeader?: CreatorHeaderMeta;
}
