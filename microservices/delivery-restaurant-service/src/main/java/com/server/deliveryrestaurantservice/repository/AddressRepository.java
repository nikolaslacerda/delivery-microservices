package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
