FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} order-service.jar
ENTRYPOINT ["java", "-jar", "/order-service.jar"]