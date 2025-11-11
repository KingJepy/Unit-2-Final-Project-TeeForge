#!/bin/bash
# start.sh - Launch Spring Boot app on Render

# Exit immediately if a command exits with non-zero status except tput/colors.sh
set -e

# Avoid breaking if tput/colors.sh fails
set +e
source /home/render/colors.sh 2>/dev/null || true
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
