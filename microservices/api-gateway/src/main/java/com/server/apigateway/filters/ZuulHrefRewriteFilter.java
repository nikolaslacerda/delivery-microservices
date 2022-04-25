package com.server.apigateway.filters;

import com.google.common.io.CharStreams;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.InputStreamReader;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.POST_TYPE;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

//@Component
//public class ZuulHrefRewriteFilter extends ZuulFilter {
//
//    @Override
//    public String filterType() {
//        return POST_TYPE;
//    }
//
//    @Override
//    public int filterOrder() {
//        return 0;
//    }
//
//    @Override
//    public boolean shouldFilter() {
//        return true;
//    }
//
//    @Override
//    public Object run() throws ZuulException {
//        RequestContext context = RequestContext.getCurrentContext();
//        try (final InputStream responseDataStream = context.getResponseDataStream()) {
//            if (responseDataStream == null) {
//                return null;
//            }
//            String responseData = CharStreams.toString(new InputStreamReader(responseDataStream, "UTF-8"));
//            context.setResponseBody(responseData.replace("8081", "9999"));
//        } catch (Exception e) {
//            throw new ZuulException(e, INTERNAL_SERVER_ERROR.value(), e.getMessage());
//        }
//        return null;
//    }
//}
