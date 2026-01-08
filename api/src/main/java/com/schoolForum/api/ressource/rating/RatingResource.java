/*package com.schoolForum.api.ressource.rating;

import com.schoolForum.api.model.Post;
import com.schoolForum.api.model.Rating;
import com.schoolForum.api.repository.PostRepository;
import com.schoolForum.api.repository.RatingRepository;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Tag(name = "Rating resource")
@Path("ratings")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class RatingResource {

    @Inject
    RatingRepository ratingRepository;

    @GET
    public List<Rating> list() {
        return ratingRepository.listAll();
    }
}
*/