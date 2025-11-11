# Use Eclipse Temurin (OpenJDK 17) base image
FROM eclipse-temurin:17-jdk-jammy

# Install required packages: Maven, ncurses-bin (for tput), curl
RUN apt-get update && \
    apt-get install -y maven ncurses-bin curl && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME and update PATH
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="$JAVA_HOME/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy backend source into container
COPY . /app

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the Spring Boot project (skip tests for faster builds)
RUN ./mvnw clean package -DskipTests

# Expose Spring Boot default port
EXPOSE 8080

# Use Render environment variables for DB config
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://$DB_HOST:5432/teeforge_db
ENV SPRING_DATASOURCE_USERNAME=$DB_USER
ENV SPRING_DATASOURCE_PASSWORD=$DB_PASS

# Start the Spring Boot app
CMD ["./mvnw", "spring-boot:run"]

