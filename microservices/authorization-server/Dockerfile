FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} authorization-server.jar
ENTRYPOINT ["java", "-jar", "/authorization-server.jar"]