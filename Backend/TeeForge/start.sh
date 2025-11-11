#!/bin/bash
# Ensure JAVA_HOME is set correctly
export JAVA_HOME=${JAVA_HOME:-/usr/lib/jvm/adoptopenjdk-17-hotspot-amd64}
export PATH=$JAVA_HOME/bin:$PATH

echo "Using JAVA_HOME=$JAVA_HOME"
java -version

# Clean and package the Spring Boot app
./mvnw clean package

# Run the Spring Boot app
java -jar target/TeeForge-0.0.1-SNAPSHOT.jar