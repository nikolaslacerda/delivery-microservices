package com.server.deliveryorderservice.model.dto;

import com.server.deliveryorderservice.validation.CorrectItemPrices;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@CorrectItemPrices
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {

    @NotNull
    private Long id;

    @NotBlank
    private String name;

    private String description;

    private String notes;

    @Min(1)
    @NotNull
    private Integer quantity;

    @NotNull
    private Double price;

    @NotNull
    private Double promotionalPrice;

    @NotNull
    private Double totalPrice;

    @NotNull
    private Double totalPriceWithDiscount;

}
