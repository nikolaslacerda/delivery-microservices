package com.server.deliveryadminservice.controller;

import com.server.deliveryadminservice.model.CuisineType;
import com.server.deliveryadminservice.model.CuisineTypeDto;
import com.server.deliveryadminservice.repository.CuisineRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
class CuisineTypeController {

    private CuisineRepository cuisineRepository;

    @GetMapping("/cuisine-types")
    public List<CuisineTypeDto> getAll() {
        return cuisineRepository.findAllByOrderByNameAsc()
                .stream()
                .map(CuisineTypeDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/admin/cuisine-types")
    public CuisineTypeDto create(@RequestBody CuisineType cuisineType) {
        return new CuisineTypeDto(cuisineRepository.save(cuisineType));
    }

    @PutMapping("/admin/cuisine-types/{id}")
    public CuisineTypeDto update(@RequestBody CuisineType cuisineType) {
        return new CuisineTypeDto(cuisineRepository.save(cuisineType));
    }

    @DeleteMapping("/admin/cuisine-types/{id}")
    public void delete(@PathVariable("id") Long id) {
        cuisineRepository.deleteById(id);
    }

}
