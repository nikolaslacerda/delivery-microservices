FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} user-service.jar
ENTRYPOINT ["java", "-jar", "/user-service.jar"]