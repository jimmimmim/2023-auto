# 자율주행로봇 모니터링 시스템 MVP
> 구현 기간: 22.12.27. ~ 23.02.23.   
> 샘플 데이터: 23.01.02, 23.01.12. 총 2회 서울시립대학교 내부 임의 이동경로 수집   
> React.js, JavaScript, Tailwind.css

## 설치 및 실행
```
npm install
npm start
```
위 명령어 입력 후에도 사이트가 자동으로 열리지 않을 경우 http://localhost:3000/ 로 직접 접속하시어 실행 가능합니다. (Ctrl을 누른 채로 클릭하면 새 탭에서 열림)

## API

|요청 변수명|타입|설명|
|---------|:----:|----|
|/|POST|종료를 알 수 있도록, 리턴값 String으로 반환|
|/robot-location|POST|body 값에 { “id”: String } 으로 id값 전달, 전체 조회 시 { “id”: “all” } 로 호출|
|/robot-id|GET|단순 호출 시 전체 id 값을 모두 가져옴|
|/getGeoData/{meter}|GET|meter의 값에 따라 3m, 5m의 격자json을 반환함|

## 라이브러리
leaflet: https://leafletjs.com/   
react-leaflet: https://react-leaflet.js.org/

## 실행 화면
각 이미지를 클릭하여 새 탭에서 큰 화면으로 확인하실 수 있습니다.

### 초기 화면
* 화면 좌측: 지도 (서울시립대학교), 우측: 경로 데이터 선택 컨테이너
<img src="https://user-images.githubusercontent.com/72171903/220801615-8a4c952a-5c06-47c0-8c75-6279592bbba5.png"  width="800" height="auto"/>


### 경로
* 선택된 경로 표출   
<img src="https://user-images.githubusercontent.com/72171903/220801683-7a652dcb-7a06-4178-8e65-69c99316af4a.png"  width="800" height="auto"/>

* 마우스오버 효과(포커싱) - 선택된 경로 강조   
<img src="https://user-images.githubusercontent.com/72171903/220801696-c122a22a-f401-4ee3-8cf7-08cfdb1aebeb.png"  width="800" height="auto"/>

* 경로 클릭 팝업 - 경로 색상, 로봇 번호, 측정일    
<img src="https://user-images.githubusercontent.com/72171903/220801708-3fb7dd4a-6050-46a3-8aed-8cb4bec83e93.png"  width="800" height="auto"/>


### 격자
* 선택된 경로에 대한 3m 격자 표출   
<img src="https://user-images.githubusercontent.com/72171903/220801735-174d44be-bac7-4288-b831-0e8d87c6256e.png"  width="800" height="auto"/>

* 선택된 경로에 대한 5m 격자 표출   
<img src="https://user-images.githubusercontent.com/72171903/220801752-3efc9a29-b1af-4b84-897e-d34f97ccd456.png"  width="800" height="auto"/>

* 격자 클릭 시 gid (격자아이디) 팝업 표시   
<img src="https://user-images.githubusercontent.com/72171903/220801769-b482b3be-84f5-4a6f-9594-5896b99246d3.png"  width="800" height="auto"/>

### 장애물 데이터
* 사고 발생 지점 표출   
<img src="https://user-images.githubusercontent.com/72171903/220801793-58971bcf-1e89-41ba-8455-bc24ddc88a12.png"  width="800" height="auto"/>

* 사고 발생 지점 클릭 - 아이콘 변경, 장애물 이미지 표출 (우측 이미지 캐러셀)   
<img src="https://user-images.githubusercontent.com/72171903/220801803-b68a52bc-e608-4ec0-a1a4-6f8e6ef97cd6.png"  width="800" height="auto"/>

<img src="https://user-images.githubusercontent.com/72171903/220801817-f2d4c045-3d44-4ec1-9650-5b0e417df4a7.png"  width="800" height="auto"/>

→ 속성 정보 내에 경로 아이디 및 격자 아이디 포함하고 있는 이미지 데이터 표시 (경로 아이디를 통해 가져옴, 이후에는 격자 아이디(gid)를 통해 개별 격자와 연결 예정)   
→ 다른 마커 클릭 혹은 화살표 클릭을 통해 다음 이미지로 이동   
→ 지도 우측 상단 패널에서 ‘사고 발생 지점’ 체크 해제하거나 지도의 빈 곳을 클릭하여 빠져나옴   

---

## 경로 데이터
```
{
        "id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F2023/01/02 11:27:20",
        "id_3m": "3m_70069",
        "id_5m": "5m_25190",
        "idx": 85,
        "lat": 37.5849710159,
        "lon": 127.0605670404,
        "seq": 1,
        "times": "2023/01/02 11:27:20"
}
```

## 장애물 이미지 데이터
```
{
        "idx": 1,
        "id": "F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F2023/01/12 15:12:55",
        "gid": "5m_11679",
        "lat": 37.5850920905,
        "lon": 127.0573567375,
        "times": "2023/01/02 11:27:20",
        "url": "https://gada-bucket.s3.ap-northeast-2.amazonaws.com/9878b61a-948d-46af-bed8-e02c03a45460-KakaoTalk_20221107_143912239_04.png",
        "type": "image",
        "category": 0,
        "seq": 0
}
```
|속성|타입|설명|
|----|---|----|
|id|String|측정 기기 고유 아이디   |
|gid|String|장애물이 발견된 지점의 격자 아이디   (격자 기반으로 표시하게 될 경우 gid_3, gid_5로 변경되어야 함)|
|lat|Number|장애물이 발견된 지점의 위도 (EPSG4326)|
|lon|Number|장애물이 발견된 지점의 경도 (EPSG4326)|
|times|String|장애물 데이터 수집 일시|
|url|String|장애물 데이터 소스 링크|
|type|String|장애물 데이터 타입 (image, video)|
|category|Number|장애물 종류|

---

### 기타 사용 방법

#### 팝업 닫기
* 팝업 내 닫기 버튼이 있는 경우 닫기 버튼 클릭
* 팝업 외부 영역 클릭
* 키보드의 esc 버튼

#### 지도 확대
* 지도 좌측 상단 줌 레벨 컨트롤러
* 마우스 휠
* 더블 클릭
