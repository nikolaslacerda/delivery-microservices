package com.server.deliveryrestaurantservice.model.entity;

import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 150)
    private String name;

    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    @Positive
    private BigDecimal promotionalPrice;

    @ManyToOne(optional = false)
    private MenuCategory category;

}

