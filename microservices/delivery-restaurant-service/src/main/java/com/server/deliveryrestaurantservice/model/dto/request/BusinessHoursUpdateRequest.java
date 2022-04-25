package com.server.deliveryrestaurantservice.model.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BusinessHoursUpdateRequest extends BusinessHoursRequest {

    private Boolean active;

}


