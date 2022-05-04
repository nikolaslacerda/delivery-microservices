package com.server.deliveryuserservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class DeliveryUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliveryUserServiceApplication.class, args);
	}

}
