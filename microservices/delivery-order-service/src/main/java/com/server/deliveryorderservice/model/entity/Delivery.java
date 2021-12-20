package com.server.deliveryorderservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Client client;

    @NotBlank
    @Size(max = 9)
    private String cep;

    @NotBlank
    @Size(max = 255)
    private String address;

    @Size(max = 255)
    private String complement;

    @OneToOne(optional = false)
    private Order order;

}
