FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} admin-server.jar
ENTRYPOINT ["java", "-jar", "/admin-server.jar"]