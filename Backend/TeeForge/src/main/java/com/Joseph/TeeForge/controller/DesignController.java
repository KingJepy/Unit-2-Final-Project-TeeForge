package com.Joseph.TeeForge.controller;


import com.Joseph.TeeForge.model.Design;
import com.Joseph.TeeForge.model.User;
import com.Joseph.TeeForge.repository.DesignRepository;
import com.Joseph.TeeForge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = "https://teeforge-frontend-3cel52jnz-kingjepys-projects.vercel.app/")
public class DesignController {

    @Autowired
    private DesignRepository designRepository;

    @Autowired
    private UserRepository userRepository;

    // get all designs
    @GetMapping
    public List<Design> getAllDesigns() {
        return designRepository.findAll();
    }

    // get design by id
    @GetMapping("/{id}")
    public Optional<Design> getDesignById(@PathVariable int id) {
        return designRepository.findById(id);
    }

    // get disigns by user id
    @GetMapping("/user/{userId}")
    public List<Design> getDesignsByUser(@PathVariable int userId) {
        return designRepository.findByUser_UserId(userId);
    }

    // create a new design
    @PostMapping
    public Design createDesign(@RequestBody Design design) {
        if (design.getUser() != null && design.getUser().getUserId() != 0) {
            Optional<User> existingUser = userRepository.findById(design.getUser().getUserId());
            existingUser.ifPresent(design::setUser);
        }
        design.setCreatedAt(LocalDateTime.now());
        design.setUpdatedAt(LocalDateTime.now());
        return designRepository.save(design);
    }

    // update a design
    @PutMapping("/{id}")
    public Design updateDesign(@PathVariable Integer id, @RequestBody Design updatedDesign) {
        return designRepository.findById(id).map(design -> {
            design.setShirtColor(updatedDesign.getShirtColor());
            design.setUpdatedAt(LocalDateTime.now());
            return designRepository.save(design);
        }).orElseGet(() -> {
            updatedDesign.setDesignId(id);
            updatedDesign.setCreatedAt(LocalDateTime.now());
            updatedDesign.setUpdatedAt(LocalDateTime.now());
            return designRepository.save(updatedDesign);
        });
    }

    // delete a design
    @DeleteMapping("/{id}")
    public void deleteDesign(@PathVariable Integer id) {
        designRepository.deleteById(id);
    }

}
