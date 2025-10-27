package com.Joseph.TeeForge.controller;


import com.Joseph.TeeForge.model.Image;
import com.Joseph.TeeForge.repository.DesignRepository;
import com.Joseph.TeeForge.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private DesignRepository designRepository;

    // get all images
    @GetMapping
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }


    // get image by ID
    @GetMapping("/{id}")
    public Optional<Image> getImageById(@PathVariable Integer id) {
        return imageRepository.findById(id);
    }

    // create new image
    @PostMapping
    public Image createImage(@RequestBody Image image) {
        return imageRepository.save(image);
    }

    // update image\
    @PutMapping("/{id}")
    public Image updateImage(@PathVariable Integer id, @RequestBody Image updatedImage) {
        return imageRepository.findById(id)
                .map(image -> {
                    image.setImageUrl(updatedImage.getImageUrl());
                    image.setFileName(updatedImage.getFileName());
                    image.setPlacementX(updatedImage.getPlacementX());
                    image.setPlacementY(updatedImage.getPlacementY());
                    return imageRepository.save(updatedImage);
                })
                .orElseGet(() -> {
                    updatedImage.setImageId(id);
                    return imageRepository.save(updatedImage);
                });
    }

    // delete image
    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Integer id) {
        imageRepository.deleteById(id);
    }
}
