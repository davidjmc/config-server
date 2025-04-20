# Etapa de build com Maven
FROM maven:3.9-eclipse-temurin-17 as build

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# Etapa final de execução
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/config-server-*.jar app.jar

EXPOSE 8888
ENTRYPOINT ["java", "-jar", "app.jar"]
