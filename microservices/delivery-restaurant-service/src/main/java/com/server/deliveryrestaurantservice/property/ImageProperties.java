package com.server.deliveryrestaurantservice.property;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class ImageProperties {

    @Value("${image.restaurant.folder}")
    private String restaurantFolder;

    @Value("${image.food.folder}")
    private String foodFolder;

    private final String homeFolder = System.getProperty("user.home");

}
