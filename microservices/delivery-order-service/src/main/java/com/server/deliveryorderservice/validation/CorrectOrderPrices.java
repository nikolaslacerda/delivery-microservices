package com.server.deliveryorderservice.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Target(TYPE)
@Retention(RUNTIME)
@Constraint(validatedBy = SumOrderPricesValidator.class)
public @interface CorrectOrderPrices {

    String message() default "Order prices don't match with items prices and quantities!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
