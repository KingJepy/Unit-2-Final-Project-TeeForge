#!/bin/bash
# Set JAVA_HOME for Maven
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH

# Run Maven build
./mvnw clean package