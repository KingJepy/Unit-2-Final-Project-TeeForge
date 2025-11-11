package com.Joseph.TeeForge.controller;


import com.Joseph.TeeForge.model.User;
import com.Joseph.TeeForge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "https://teeforge-frontend-4fmuui4lh-kingjepys-projects.vercel.app")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // get all users
    @GetMapping
    public List<User> getUserById() {
        return userRepository.findAll();
    }

    //get single user by id
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable int id) {
        return userRepository.findById(id);
    }

    // create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // update a user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    user.setPasswordHash(updatedUser.getPasswordHash());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    updatedUser.setUserId(id);
                    return userRepository.save(updatedUser);
                });
    }

    // delete a user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
    }

}
