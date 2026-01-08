package com.schoolForum.api.ressource.subject;

import com.schoolForum.api.model.Rating;
import com.schoolForum.api.model.Subject;
import com.schoolForum.api.repository.RatingRepository;
import com.schoolForum.api.repository.SubjectRepository;
import io.quarkus.security.Authenticated;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Tag(name = "Subject resource")
@Path("subjects")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Authenticated
public class SubjectResource {

    @Inject
    SubjectRepository subjectRepository;

    @GET
    public List<Subject> list() {
        return subjectRepository.listAll();
    }
}
