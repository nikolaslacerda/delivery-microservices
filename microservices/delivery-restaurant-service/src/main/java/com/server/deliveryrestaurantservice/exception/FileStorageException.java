package com.server.deliveryrestaurantservice.exception;

public class FileStorageException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public FileStorageException() {
        super("Unable to store file");
    }

}