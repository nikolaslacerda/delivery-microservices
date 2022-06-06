package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.FileStorageException;
import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.model.entity.MenuItem;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.property.ImageProperties;
import com.server.deliveryrestaurantservice.repository.MenuItemRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageProperties imageProperties;
    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    public void createRestaurantImage(Long restaurantId, MultipartFile image) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        createFile(restaurantId, imageProperties.getRestaurantFolder(), image);
        restaurant.setImageUrl(restaurantId + ".png");
        restaurantRepository.save(restaurant);
    }

    public ResponseEntity<byte[]> getRestaurantImage(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        String imagePath = imageProperties.getHomeFolder() + imageProperties.getRestaurantFolder() + restaurant.getImageUrl();
        try (InputStream initialFile = new FileInputStream(imagePath)) {
            byte[] bytes = StreamUtils.copyToByteArray(initialFile);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(bytes);
        } catch (Exception ex) {
            throw new FileStorageException();
        }
    }

    public void createMenuItemImage(Long menuItemId, MultipartFile image) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(ResourceNotFoundException::new);
        createFile(menuItemId, imageProperties.getFoodFolder(), image);
        menuItem.setImageUrl(menuItemId + ".png");
        menuItemRepository.save(menuItem);
    }

    public ResponseEntity<byte[]> getMenuItemImage(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(ResourceNotFoundException::new);
        String imagePath = imageProperties.getHomeFolder() + imageProperties.getFoodFolder() + menuItem.getImageUrl();
        try (InputStream initialFile = new FileInputStream(imagePath)) {
            byte[] bytes = StreamUtils.copyToByteArray(initialFile);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(bytes);
        } catch (Exception ex) {
            throw new FileStorageException();
        }
    }

    private void createFile(Long filename, String destinationFolder, MultipartFile file) {
        try {
            String folder = imageProperties.getHomeFolder() + destinationFolder;
            String filePath = folder + filename + ".png";
            Files.deleteIfExists(Paths.get(filePath));
            Path path = Paths.get(filePath);
            createIfNotExists(folder);
            Files.write(path, file.getBytes());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    private void createIfNotExists(String pathname) {
        if (!new File(pathname).exists())
            new File(pathname).mkdir();
    }
}
