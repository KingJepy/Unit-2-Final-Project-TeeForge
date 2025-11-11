#!/bin/bash
# start.sh - Launch Spring Boot app on Render

# Exit immediately if a command exits with a non-zero status
set -e

# Set JAVA_HOME if not already set
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH

# Move to the directory containing pom.xml
cd TeeForge

# Make sure mvnw is executable
chmod +x mvnw

# Clean and build the project
./mvnw clean package

# Run the Spring Boot application
./mvnw spring-boot:run