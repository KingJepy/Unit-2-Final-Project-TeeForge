package com.Joseph.TeeForge.repository;

import com.Joseph.TeeForge.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByDesign_DesignId(Integer designId);
}
