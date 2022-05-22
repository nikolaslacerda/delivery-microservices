package com.server.deliveryorderservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDto {

    @NotNull
    private Long id;

    @NotBlank
    private String name;

    private String phoneNumber;

    @NotBlank
    private String logo;

    @Valid
    @NotNull
    private AddressDto address;

}
