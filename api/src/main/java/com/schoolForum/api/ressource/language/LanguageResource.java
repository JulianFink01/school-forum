package com.schoolForum.api.ressource.language;

import com.schoolForum.api.model.Image;
import com.schoolForum.api.model.Language;
import com.schoolForum.api.repository.ImageRepository;
import com.schoolForum.api.repository.LanguageRepository;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Tag(name = "Language resource")
@Path("languages")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class LanguageResource {

    @Inject
    LanguageRepository languageRepository;

    @GET
    public List<Language> list() {
        return languageRepository.listAll();
    }
}
