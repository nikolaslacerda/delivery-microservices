FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
ADD ${JAR_FILE} payment-service.jar
ENTRYPOINT ["java", "-jar", "/payment-service.jar"]