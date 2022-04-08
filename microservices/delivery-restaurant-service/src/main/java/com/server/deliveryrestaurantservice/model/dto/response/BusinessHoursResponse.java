package com.server.deliveryrestaurantservice.model.dto.response;

import java.time.DayOfWeek;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessHoursResponse {

	private Long id;
	private DayOfWeek dayOfWeek;
	private LocalTime openingTime;
	private LocalTime closingTime;
	private Boolean active;

}
