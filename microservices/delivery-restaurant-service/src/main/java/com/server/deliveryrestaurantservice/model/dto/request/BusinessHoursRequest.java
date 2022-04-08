package com.server.deliveryrestaurantservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessHoursRequest {

	private DayOfWeek dayOfWeek;
	private LocalTime openingTime;
	private LocalTime closingTime;
	private Boolean active;

}
