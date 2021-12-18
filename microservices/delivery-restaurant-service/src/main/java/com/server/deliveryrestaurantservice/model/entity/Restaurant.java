package com.server.deliveryrestaurantservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
import java.math.BigDecimal;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 18)
    private String cnpj;

    @NotBlank
    @Size(max = 255)
    private String name;

    @Size(max = 1000)
    private String description;

    @NotBlank
    @Size(max = 9)
    private String cep;

    @NotBlank
    @Size(max = 300)
    private String address;

    @Positive
    private BigDecimal deliveryPrice;

    @Min(10)
    @Max(180)
    @Positive
    private Integer minDeliveryTime;

    @Min(10)
    @Max(180)
    @Positive
    private Integer maxDeliveryTime;

    private Boolean approved;

    private Long cuisineTypeId;

    private Long userId;

}
