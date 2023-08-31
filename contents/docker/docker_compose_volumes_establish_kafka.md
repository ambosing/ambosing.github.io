---
date: '2023-08-31'
title: 'Docker compose로 띄운 Kafka Log를 docker volume 사용해서 로컬에서 보기'
categories: ['Docker', 'Kafka']
summary: 'Docker!!!!!!!!!!! 너무 편해요..!'
thumbnail: '../images/thumbnail/chocoball.webp'
---
## 하게 된 이유
카프카를 배워보려고 강의를 듣다가 VirtualBox와 Ubuntu로 설치하는 것이 힘들어보여서 Docker로 설치하였습니다.  

그러다 보니 강의 개발 환경과 많이 달라졌었는데요. 강의에서 Kafka Log를 보는 일도 있다고 해서 이 때마다 로그를 확인하러 가기가 너무 시간이 오래 걸릴 것 같아서 로그를 docker volume을 사용해 로컬에서 바로 볼 수 있도록 해보겠습니다.

## 해결 과정
먼저 로컬에 logs라는 디렉터리를 먼저 만들어줬습니다. 

`mkdir logs`

이제 이 디렉토리를 도커 안에 있는 kafka log가 쌓이는 폴더와 연결해주겠습니다. 

그러려면 일단 `confluentinc/cp-kafka` 이 이미지 안에 어디에 로그가 쌓이는지 알아야 하는데요.  

구글링 후에 `/var/lib/kafka/data` 여기에 쌓인다는 걸 알게 되었습니다.
그럼 이제 docker compose 파일을 수정해주도록 하겠습니다!

<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```yaml
version: '2'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
    ports:
      - "22181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.1.2
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
    # 이부분 추가
		volumes:
      - ./logs:/var/lib/kafka/data
```

이렇게 도커 컴포즈를 띄워보면.. 

아래와 같은 에러가 발생합니다..!  
**[Command [/usr/local/bin/dub path /var/lib/kafka/data writable] FAILED ! in Kafka](https://stackoverflow.com/questions/75499821/command-usr-local-bin-dub-path-var-lib-kafka-data-writable-failed-in-kafka)**

해결 방법을 모색한 결과, root 권한을 넣어주면 잘 된다는 얘기가 있어서 

아래와 같이 Root 권한을 추가해주었습니다.

**Root 권한을 추가한 docker compose 파일**
<div class="code-header">
	<span class="red btn"></span>
	<span class="yellow btn"></span>
	<span class="green btn"></span>
</div>

```yaml
version: '2'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
    ports:
      - "22181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.1.2
		# Root 권한 
    user: root
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
    # Docker Volume
		volumes:
      - ./logs:/var/lib/kafka/data
```
이제 잘 되더군요!  
`docker compose up`을 통해 이제 도커 컨테이너를 띄우고 logs 디렉터리를 확인해보겠습니다.
![](../images/content/2023-08-31-22-13-18.png)

잘 들어가 있습니다!!

## 배운 점

- docker compose에 root 권한을 줄 수 있습니다.
- docker compose에 docker volume을 추가하는 방법을 깨달았습니다.