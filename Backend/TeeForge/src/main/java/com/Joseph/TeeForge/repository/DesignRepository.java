package com.Joseph.TeeForge.repository;

import com.Joseph.TeeForge.model.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignRepository extends JpaRepository<Design, Integer> {
}
