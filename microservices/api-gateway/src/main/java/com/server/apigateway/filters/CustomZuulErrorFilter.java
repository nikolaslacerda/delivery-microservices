package com.server.apigateway.filters;

import com.netflix.client.ClientException;
import com.netflix.hystrix.exception.HystrixRuntimeException;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.net.ConnectException;
import java.time.Instant;

@Slf4j
@Component
public class CustomZuulErrorFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return "error";
    }

    @Override
    public int filterOrder() {
        return -1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext context = RequestContext.getCurrentContext();
        Throwable throwable = context.getThrowable();

        if (throwable instanceof ZuulException) {
            final ZuulException zuulException = (ZuulException) throwable;
            Throwable cause = ExceptionUtils.getRootCause(zuulException);
            log.error("Zuul exception: " + cause.getMessage());
            if (cause instanceof ConnectException || cause instanceof ClientException) {
                context.remove("throwable");
                context.setResponseBody(buildBody(HttpStatus.SERVICE_UNAVAILABLE, cause.getMessage()));
                context.getResponse().setContentType("application/json");
                context.setResponseStatusCode(503);
            } else if (cause instanceof HystrixRuntimeException) {
                context.remove("throwable");
                context.setResponseBody(buildBody(HttpStatus.INTERNAL_SERVER_ERROR, cause.getMessage()));
                context.getResponse().setContentType("application/json");
                context.setResponseStatusCode(503);
            } else {
                context.remove("throwable");
                context.setResponseBody(buildBody(HttpStatus.SERVICE_UNAVAILABLE, cause.getMessage()));
                context.getResponse().setContentType("application/json");
                context.setResponseStatusCode(503);
            }
        }
        return null;
    }

    private String buildBody(HttpStatus httpStatus, String message) {
        return "{\n" +
                "    \"code\": " + httpStatus.value() + ",\n" +
                "    \"status\": \"" + httpStatus.getReasonPhrase() + "\",\n" +
                "    \"message\": \"" + message + "\",\n" +
                "    \"timestamp\": \"" + Instant.now().toString() + "\",\n" +
                "}";
    }
}