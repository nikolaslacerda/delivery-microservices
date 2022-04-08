package com.server.deliveryrestaurantservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 255)
    private String streetAddress;

    @NotNull
    @Min(1)
    private Integer streetNumber;

    @NotBlank
    @Size(max = 255)
    private String neighborhood;

    @NotBlank
    @Size(max = 255)
    private String city;

    @NotBlank
    @Size(max = 255)
    private String state;

    @NotBlank
    @Size(max = 8)
    private String postalCode;

    @NotBlank
    @Size(max = 2)
    private String country;

    @Size(max = 255)
    private String complement;

    @Size(max = 255)
    private String reference;

    @OneToOne(mappedBy = "address")
    private Restaurant restaurant;

}
