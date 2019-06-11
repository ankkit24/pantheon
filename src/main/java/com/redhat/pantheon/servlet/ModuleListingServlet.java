package com.redhat.pantheon.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.pantheon.data.ModuleDataRetriever;
import org.apache.http.HttpStatus;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.jcr.RepositoryException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.Writer;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by ben on 4/18/19.
 */
@Component(
        service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Servlet which provides initial module listing and search functionality",
                Constants.SERVICE_VENDOR + "=Red Hat Content Tooling team"
        })
@SlingServletPaths(value = "/modules.json")
public class ModuleListingServlet extends SlingSafeMethodsServlet {

    private final Logger log = LoggerFactory.getLogger(ModuleListingServlet.class);

    @Override
    protected void doGet(@Nonnull SlingHttpServletRequest request, @Nonnull SlingHttpServletResponse response) throws ServletException, IOException {
        ModuleDataRetriever mdr = new ModuleDataRetriever(request.getResourceResolver());
        String searchParam = getParam(request, "search");
        String keyParam = getParam(request, "key");
        String directionParam = getParam(request, "direction");
        String offset = getParam(request, "offset");
        String limit = getParam(request, "limit");

        try {
            response.setContentType("application/json");
            Writer w = response.getWriter();
            List<Map<String, Object>> results = mdr.getModulesSort(searchParam, keyParam, directionParam, "0", Long.toString(Long.MAX_VALUE));
            
            List<Map<String, Object>> payload = new ArrayList<Map<String, Object>>();
            for (int i = Integer.parseInt(offset) ; i < Integer.parseInt(offset) + Integer.parseInt(limit) && i < results.size() ; i++) {
                payload.add(results.get(i));
            }
            int totalCount = results.size();
            Map<String, Object> returnVal = new HashMap<String, Object>();
            // returnVal.put("count", totalCount);
            returnVal.put("count", mdr.countModules(searchParam));
            returnVal.put("data", payload);
            w.write(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(returnVal));
        } catch (RepositoryException e) {
            log.error("/modules.json error", e);
            response.setStatus(HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private String getParam(SlingHttpServletRequest request, String param) {
        String ret = "";
        if (request.getParameterMap().containsKey(param)) {
            ret = request.getRequestParameter(param).toString();
        }
        log.debug("Search param: {}, value: {}", param, ret);
        return ret;
    }
}
