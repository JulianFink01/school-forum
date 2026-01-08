/*package com.schoolForum.api.ressource.image;

import com.schoolForum.api.model.Coaching;
import com.schoolForum.api.model.Image;
import com.schoolForum.api.repository.CoachingRepository;
import com.schoolForum.api.repository.ImageRepository;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Tag(name = "Image resource")
@Path("images")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class ImageResource {

    @Inject
    ImageRepository imageRepository;

    @GET
    public List<Image> list() {
        return imageRepository.listAll();
    }
}
*/