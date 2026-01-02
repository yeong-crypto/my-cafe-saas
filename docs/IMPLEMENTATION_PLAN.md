# 무인카페 SaaS MVP 구현 계획

Express + MongoDB 백엔드와 React 프론트엔드를 단계별로 완성하기 위한 로드맵입니다. 각 단계는 배포 가능한 단위를 목표로 하며, 나중에 유로머신/VCMS API 연동을 무리 없이 추가할 수 있는 구조를 유지합니다.

## 1단계: 기본 데이터 모델 및 API
- [ ] 비용 모델 분리: `type(fixed|variable)`, `name`, `amount`, `date` 필드를 갖는 MongoDB 스키마 사용
- [ ] 비용 CRUD API 및 월별 비용 합계 계산 엔드포인트
- [ ] 월 매출 입력 및 조회 API (수기로 입력하는 MVP)
- [ ] 재고 목록/부족 알림/발주 요청 API (메모리 저장 -> MongoDB 이전 준비)
- [ ] CORS/환경변수/에러 처리 미들웨어 정비

## 2단계: 프론트엔드 기본 UI
- [ ] 비용 입력/목록, 월 매출 입력 컴포넌트
- [ ] 순이익 계산 카드(매출 - 고정/변동비 합계)
- [ ] 재고 부족 알림 카드와 발주 요청 양식
- [ ] 백엔드 API와의 연결을 `src/services/apiClient`로 모듈화

## 3단계: 데이터 영속화 및 리포트
- [ ] 비용, 매출, 재고, 발주 MongoDB 컬렉션으로 이전
- [ ] 월별 손익 리포트(그래프) 제공
- [ ] 재고 임계치 설정 UI + 재고 조정 이력 기록

## 4단계: 외부 기계 연동 준비
- [ ] VCMS/유로머신용 클라이언트 래퍼(`backend/services/external/*Client.js`) 설계
- [ ] 기기 이벤트 Webhook 수신 엔드포인트와 시뮬레이터
- [ ] 발주/재고 실시간 동기화 플러그인 구조 정의

## 5단계: 운영 편의 기능
- [ ] 매장별/기기별 권한 관리
- [ ] SLA 모니터링 및 알림(슬랙/이메일)
- [ ] 백오피스 설정 화면

## 코드 구조 가이드
- 백엔드: `controllers`(비즈니스 로직), `routes`(라우팅), `services`(계산/외부 연동), `models`(Mongoose)
- 프론트엔드: `components`(UI), `pages`(뷰), `services`(API), `hooks`(상태), `styles`

## 완료 정의(DoD)
- 기능별 API/컴포넌트에 대한 단위 테스트 또는 최소 연동 테스트
- `.env.example` 제공 및 README에 실행 방법 기술
- ESLint/Prettier 규칙 준수
- PR에 단계별 체크리스트 업데이트
