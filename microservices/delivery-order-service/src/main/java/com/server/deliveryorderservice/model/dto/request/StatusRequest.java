package com.server.deliveryorderservice.model.dto.request;

import com.server.deliveryorderservice.model.enumerations.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusRequest {

    @NotNull
    private Status status;

}
