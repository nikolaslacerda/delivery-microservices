package com.server.deliveryadminservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuisineTypeDto {

    private Long id;
    private String name;

    public CuisineTypeDto(CuisineType type) {
        this(type.getId(), type.getName());
    }

}
