package com.server.deliveryorderservice.validation;

import com.server.deliveryorderservice.model.dto.request.OrderRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SumOrderPricesValidator implements ConstraintValidator<CorrectOrderPrices, OrderRequest> {

    @Override
    public boolean isValid(OrderRequest order, ConstraintValidatorContext context) {
        double itemsSubTotal = order.getItems().stream().map(x -> x.getPrice() * x.getQuantity()).mapToDouble(x -> x).sum();
        double itemsSubTotalWithDiscount = order.getItems().stream().map(x -> x.getPromotionalPrice() * x.getQuantity()).mapToDouble(x -> x).sum();
        return order.getSubtotal() == itemsSubTotal &&
                order.getSubtotalWithDiscount() == itemsSubTotalWithDiscount &&
                order.getTotalValue() == itemsSubTotal + order.getDeliveryFee() &&
                order.getTotalValueWithDiscount() == itemsSubTotalWithDiscount + order.getDeliveryFee();
    }

}
