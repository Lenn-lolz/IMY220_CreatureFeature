# IMY220-Project
----------------------FRONTEND-----------------------------------

cd frontend
cd CreatureFeature
npm i 

Build image frontend: docker build -t creatur_feature_v4 .

How to run frontend: docker run -p 5173:5173 --name frontend creatur_feature_v4

-----------------------BACKEND----------------------------------

Build image backend: docker build -t creatur_feature_server_v4 .

How to run backend: docker run -p 3000:3000 --name backend creatur_feature_server_v4
docker run -p 3000:3000 --env-file .env --name backend creatur_feature_server_v4

cd backend
npm i

----------------------------GITHUB------------------------
https://github.com/Lenn-lolz/IMY220-Project.git




CLEARING: 

docker rm -f frontend
docker stop frontend

docker rm -f backend
docker stop backend
# IMY220_CreatureFeature
