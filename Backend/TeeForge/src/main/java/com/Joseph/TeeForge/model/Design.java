package com.Joseph.TeeForge.model;


import jakarta.persistence.*;

@Entity
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int designId;

    @ManyToOne
    private User user;
}
