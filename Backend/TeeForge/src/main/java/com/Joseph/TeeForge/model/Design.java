package com.Joseph.TeeForge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "designs")
public class Design {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int designId;

    //add join column sets the foreign key in designs table
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String shirtColor;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "design", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Image> images;

    // Getters and Setters

    public int getDesignId() {
        return designId;
    }

    public void setDesignId(int designId) {
        this.designId = designId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getShirtColor() {
        return shirtColor;
    }

    public void setShirtColor(String shirtColor) {
        this.shirtColor = shirtColor;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
