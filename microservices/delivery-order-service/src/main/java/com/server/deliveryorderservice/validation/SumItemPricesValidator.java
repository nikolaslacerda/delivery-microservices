package com.server.deliveryorderservice.validation;

import com.server.deliveryorderservice.model.dto.OrderItemDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SumItemPricesValidator implements ConstraintValidator<CorrectItemPrices, OrderItemDto> {

    @Override
    public boolean isValid(OrderItemDto item, ConstraintValidatorContext context) {
        double itemTotal = item.getPrice() * item.getQuantity();
        double itemsTotalWithDiscount = item.getPromotionalPrice() * item.getQuantity();
        return item.getTotalPrice() == itemTotal && item.getTotalPriceWithDiscount() == itemsTotalWithDiscount;
    }

}
