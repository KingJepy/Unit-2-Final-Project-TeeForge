package com.Joseph.TeeForge.model;


import jakarta.persistence.*;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;

    @ManyToOne
    @JoinColumn(name = "design_id", nullable = false)
    private Design design;

    private String imageUrl;

    private String fileName;

    private int placementX;
    private int placementY;

    // Getters and Setters

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public Design getDesign() {
        return design;
    }

    public void setDesign(Design design) {
        this.design = design;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getPlacementX() {
        return placementX;
    }

    public void setPlacementX(int placementX) {
        this.placementX = placementX;
    }

    public int getPlacementY() {
        return placementY;
    }

    public void setPlacementY(int placementY) {
        this.placementY = placementY;
    }
}
