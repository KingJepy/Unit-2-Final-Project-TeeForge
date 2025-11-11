#!/bin/bash
# start.sh - Launch Spring Boot app on Render

# Exit immediately if a command exits with non-zero status
set -e

# Install tput for Render's colors.sh
apt-get update
apt-get install -y ncurses-bin

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