# 백준 알고리즘 문제 추천

- 백엔드 : 이명원, 안상현, 이윤식
- 프론트 : 최윤석, 박주빈
- 풀스택 : 장정훈



## 프로젝트 소개

> 프로젝트 링크 AlgoMorgo : http://j6c204.p.ssafy.io

### 기획

![](README.assets/Planning.png)



### 간트차트

![](README.assets/GanttChart.png)



### ERD

![](README.assets/erd.PNG)



### 개발 도구

![](README.assets/DevTools.png)



### System Architecture

![](README.assets/System Architecture.png)



### 알고리즘 소개

> 저희 문제 추천 알고리즘은 크게 다섯 단계로 구분됩니다.

![](README.assets/RecommendAlgorithm1.png)

    1. solved.ac api를 이용하여 현재 사용자가 푼 문제들을 가져옵니다.
    
    2. 가져온 데이터를 활용해 각 알고리즘 별 푼 문제의 수가 담긴 배열(A)와,  푼 문제 번호가 담긴 배열(B)를 만듭니다.
    
    3. 정의 되어 있던 실버~플래티넘 티어 유저들의 각 알고리즘 별 푼 문제 수가 담긴 KNN 테이블(C)를 불러옵니다.

![](README.assets/RecommendAlgorithm2.png)

    4. 각 사용자와 방향성을 비교하기 위해 배열(A)와 테이블(C의 각 row)의 코사인 유사도를 계산하여 그 값을 배열(D)에 담습니다.
    
    5. 배열 D를 이용하여 최근 3일동안 추천된 문제와 겹치지 않고, 배열 B에 해당하지 않는 문제 중 방향성이 먼 사용자가 푼 일곱 문제, 방향성이 가까운 사용자가 푼 세 문제를 후보군으로 선택합니다.
    
    - 이 다섯 단계가 끝나고 후보로 올라온 문제 중 3문제를 사용자에게 보여줍니다.


### Swagger

- Batch Server : http://j6c204.p.ssafy.io:8081/swagger-ui/index.html
- Recommend Server : http://j6c204.p.ssafy.io:8082/swagger/
- Business Server : http://j6c204.p.ssafy.io:8083/swagger-ui/index.html

