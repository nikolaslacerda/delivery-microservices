package com.server.deliveryadminservice.repository;

import com.server.deliveryadminservice.model.CuisineType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CuisineRepository extends JpaRepository<CuisineType, Long> {

    List<CuisineType> findAllByOrderByNameAsc();

}
