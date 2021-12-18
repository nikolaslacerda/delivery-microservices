package com.server.deliveryrestaurantservice.model.entity;

import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantPaymentMethod {

    @EmbeddedId
    private PaymentMethodId id;

    @ManyToOne
    @MapsId("restaurantId")
    private Restaurant restaurant;

    @Column(name = "payment_method_id", insertable = false, updatable = false)
    private Long paymentMethodId;

    @Data
    @Embeddable
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentMethodId implements Serializable {

        private static final long serialVersionUID = 1L;

        @Column(name = "restaurant_id")
        private Long restaurantId;

        @Column(name = "payment_method_id")
        private Long paymentMethodId;
    }
}
