---
date: '2023-08-01'
title: 'Amazon-linux2 Docker Compose Airflow 설치와 Git Action 배포 자동화'
categories: ['Airflow']
summary: '으어어.. 에러가 났떤 지난날들'
thumbnail: '../images/thumbnail/chocoball.webp'
---
## 들어가기 전에
저는 회사에서 데이터를 배치하는 작업을 많이 했었습니다. 그 중에 처음으로 도전한 것은 바로 예전 학생 때 프로젝트했던 Linux Cron 배치 작업으로 배치 데이터를 프로세싱 중이었는데요.  
이것보다 더 좋은 것이 없을까하는 생각이 매번 들긴 했었습니다. 그 당시에만 해도 모든 서버를 온프레미스로 돌리고 있는 상황이었습니다!  
이렇게 하다보니 컴퓨터가 꺼지거나 배치 작업이 돌아가지 않을 때는 운영팀의 보고를 통해서만 받게 되었습니다.

![기존이미지](../images/content/2023-08-01-14-59-32.webp)
<div class="source"> 온프레미스 당시 인프라</div>

회사에서 AWS 사용해보기로 결정이 됐습니다.  기존에 있던 배치 시스템을 변경할 기회였습니다.  
그래서 AWS에서 배치 작업을 더 좋게 처리하는 방법이 없을까하다가 Lambda + EventBridge로 처리하게 했었습니다.  
이번엔 Severless 서비스인 Lambda를 사용하니깐 컴퓨터가 문제일 경우는 없었습니다만 만약 데이터의 정합성의 문제로 에러가 발생한다면 기존의 배치 작업을 다시 돌려야하는 문제가 생겼습니다.
![](../images/content/2023-08-01-15-56-08.webp)
<div class="source"> AWS 당시 인프라</div>

그러다가 데이터 엔지니어링에 대해 관심을 가지고 있었습니다. 그 중 Airflow라는 기술이 있었는데요. Airflow는 이전에 했던 배치 시스템의 단점들을 보완하고 있었습니다..!  
그래서 이번 글에서는 Airflow를 설치하는 방법과 Git Action으로 AWS EC2에 배포하는 방법을 알아보겠습니다.  
~~왜 AWS EC2냐고 하면 .. 제가 쓰고 있는 환경이라서..~~
## Docker compose로 Airflow 설치하기
저는 Docker compose로 로컬(윈도우)에 설치를 해주었습니다. 로컬 설치과정은 쉽기 때문에 이번 설치 과정은 Amazon linux 환경에서 진행된다는 점을 알고계시면 좋을 것 같습니다. Docker compose로 설치를 진행하도록 하겠습니다!

#### Amazon linux2 환경에서 Docker 설치하기
Amazone-linux2에 도커를 설치합니다.  
sudo는 언제나 필수입니다! (안그러면 권한 없다고 에러를 냅니다! ㅠㅠ)
```sh
sudo amazon-linux-extras install docker
```
그런 다음 도커를 시작합니다.
```sh
sudo service docker start
```
현재 사용자를 docker 그룹에 추가합니다. 이를 통해 sudo를 사용하지 않고도 Docker를 실행할 수 있습니다
```sh
sudo usermod -aG docker $USER
```
#### Amazon linux2에서 Docker Compose 설치
```sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
실행 권한을 부여해줍니다

```sh
sudo chmod +x /usr/local/bin/docker-compose
```
도커 컴포즈가 잘 설치되었는지 확인해봅니다.
```sh
docker-compose --version
```
윈도우에서는 `docker compose`이었는데 리눅스에서는 `docker-compose`입니다!

#### Amazon-linux2에 Docker-compose로 Airflow 설치하기
