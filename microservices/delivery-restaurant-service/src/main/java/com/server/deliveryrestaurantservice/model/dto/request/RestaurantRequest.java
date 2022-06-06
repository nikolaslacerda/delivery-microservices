package com.server.deliveryrestaurantservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantRequest {

    @NotEmpty
    private String cnpj;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    private String imageUrl;

    @NotNull
    @Positive
    private BigDecimal deliveryPrice;

    @NotNull
    @Positive
    private Integer minDeliveryTime;

    @NotNull
    @Positive
    private Integer maxDeliveryTime;

    @NotNull
    private Long cuisineTypeId;

    @Valid
    @NotNull
    private AddressRequest address;

    @NotNull
    private UUID partnerId;

}
