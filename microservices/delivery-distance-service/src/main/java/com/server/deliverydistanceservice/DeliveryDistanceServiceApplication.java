package com.server.deliverydistanceservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class DeliveryDistanceServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliveryDistanceServiceApplication.class, args);
	}

}
