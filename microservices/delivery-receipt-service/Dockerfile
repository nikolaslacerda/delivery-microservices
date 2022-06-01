FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} receipt-service.jar
ENTRYPOINT ["java", "-jar", "/receipt-service.jar"]