package com.server.deliveryrestaurantservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
public class RestaurantPaymentMethod {

    @EmbeddedId
    private PaymentMethodIdKey id;

    @ManyToOne
    @MapsId("restaurantId")
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @MapsId("paymentMethod")
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    public RestaurantPaymentMethod(Long restaurantId, Long paymentMethodId){
        this.id = new PaymentMethodIdKey(restaurantId, paymentMethodId);
    }

    @Data
    @Embeddable
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentMethodIdKey implements Serializable {

        private static final long serialVersionUID = 1L;

        @Column(name = "restaurant_id")
        private Long restaurantId;

        @Column(name = "payment_method_id")
        private Long paymentMethodId;
    }
}
