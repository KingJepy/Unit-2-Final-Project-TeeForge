package com.Joseph.TeeForge.repository;

import com.Joseph.TeeForge.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
