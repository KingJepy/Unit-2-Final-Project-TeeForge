package com.Joseph.TeeForge;

import com.Joseph.TeeForge.model.User;
import com.Joseph.TeeForge.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TeeForgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeeForgeApplication.class, args);
	}

    //testing database
    @Bean
    CommandLineRunner run(UserRepository userRepository){
        return args -> {
            User user = new User();
            user.setUsername("testuser");
            user.setEmail("test@example.com");
            user.setPasswordHash("hashedpassword");
            userRepository.save(user);

            System.out.println("User saved: " + user.getUsername());
        };
    }

}
