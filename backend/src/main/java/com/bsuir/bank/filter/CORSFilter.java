package com.bsuir.bank.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CORSFilter implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest,
                       ServletResponse servletResponse,
                       FilterChain chain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    HttpServletResponse response = (HttpServletResponse) servletResponse;

    response.addHeader("Access-Control-Allow-Origin", "*");
    response.addHeader("Access-Control-Allow-Methods","*");
    response.addHeader("Access-Control-Allow-Headers","*");

    chain.doFilter(request, response);
  }
}
