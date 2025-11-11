# Use official OpenJDK 17 base image (slim variant)
FROM openjdk:17-jdk-slim-buster

# Install required packages: Maven, tput (via ncurses-bin), curl
RUN apt-get update && \
    apt-get install -y maven ncurses-bin curl && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME for Spring Boot and Maven
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="$JAVA_HOME/bin:$PATH"

# Set working directory inside the container
WORKDIR /app

# Copy all backend files into container
COPY . /app

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the project (skip tests to speed up deploy)
RUN ./mvnw clean package -DskipTests

# Expose Spring Boot default port
EXPOSE 8080

# Set environment variables for Render database
# (Render will inject these at runtime)
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://$DB_HOST:5432/teeforge_db
ENV SPRING_DATASOURCE_USERNAME=$DB_USER
ENV SPRING_DATASOURCE_PASSWORD=$DB_PASS

# Run Spring Boot application
CMD ["./mvnw", "spring-boot:run"]
