package com.Joseph.TeeForge.controller;


import com.Joseph.TeeForge.model.Design;
import com.Joseph.TeeForge.model.Image;
import com.Joseph.TeeForge.repository.DesignRepository;
import com.Joseph.TeeForge.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "https://teeforge-frontend.vercel.app")
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

    // get images by design ID
    @GetMapping("/design/{designId}")
    public List<Image> getImagesByDesign(@PathVariable Integer designId) {
        return imageRepository.findByDesign_DesignId(designId);
    }

    // create new image
    @PostMapping
    public Image createImage(@RequestBody Image image) {
        if (image.getDesign() != null && image.getDesign().getDesignId() != 0) {
            Optional<Design> existingDesign = designRepository.findById(image.getDesign().getDesignId());
            existingDesign.ifPresent(image::setDesign);
        }

        image.setWidth(image.getWidth());
        image.setHeight(image.getHeight());

        return imageRepository.save(image);
    }

    // update image
    @PutMapping("/{id}")
    public Image updateImage(@PathVariable Integer id, @RequestBody Image updatedImage) {
        return imageRepository.findById(id)
                .map(image -> {
                    image.setImageUrl(updatedImage.getImageUrl());
                    image.setFileName(updatedImage.getFileName());
                    image.setPlacementX(updatedImage.getPlacementX());
                    image.setPlacementY(updatedImage.getPlacementY());

                    image.setWidth(updatedImage.getWidth());
                    image.setHeight(updatedImage.getHeight());

                    return imageRepository.save(image);
                })
                .orElseGet(() -> {
                    updatedImage.setImageId(id);

                    updatedImage.setWidth(updatedImage.getWidth());
                    updatedImage.setHeight(updatedImage.getHeight());

                    return imageRepository.save(updatedImage);
                });
    }

    // delete image
    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Integer id) {
        imageRepository.deleteById(id);
    }
}
