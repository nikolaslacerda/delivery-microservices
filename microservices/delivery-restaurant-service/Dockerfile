FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} restaurant-service.jar
ENTRYPOINT ["java", "-jar", "/restaurant-service.jar"]