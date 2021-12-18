package com.server.deliveryrestaurantservice.model.dto;

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
public class BusinessHoursDto {

	private Long id;
	private DayOfWeek dayOfWeek;
	private LocalTime openingTime;
	private LocalTime closingTime;

}
